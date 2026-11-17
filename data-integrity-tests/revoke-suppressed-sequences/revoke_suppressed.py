## This script revokes sequences that have been suppressed or replaced on Genbank.
## It assumes the person running the script has curation rights
import logging
from dataclasses import dataclass, field
from time import monotonic, sleep
from typing import Any
import requests
import xml.etree.ElementTree as ET

import click
from requests.auth import HTTPBasicAuth

logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)8s %(filename)s - %(message)s ",
    datefmt="%H:%M:%S",
)

KEYCLOAK_TOKEN_URL = "https://authentication.pathoplexus.org/realms/loculus/protocol/openid-connect/token"  # https://authentication-staging.pathoplexus.org
STAGING_BASICAUTH_USERNAME = "fake"  # add real username here if you want to test against staging, otherwise it will be ignored when running against prod
STAGING_BASICAUTH_PASSWORD = "fake"  # add real password here if you want to test against staging, otherwise it will be ignored when running against prod
BACKEND_URL = (
    "https://backend.pathoplexus.org"  # https://backend-staging.pathoplexus.org
)
LAPIS_URL = "https://lapis.pathoplexus.org"  # https://lapis-staging.pathoplexus.org
KEYCLOAK_CLIENT_ID = "backend-client"
# "Automated Ingest from INSDC/NCBI Virus by Loculus" on prod and staging. Records in other
# groups are direct submissions; brokered ones also carry insdcAccessionBase and must not be revoked.
INSDC_INGEST_GROUP_ID = 1


_jwt_cache: dict[str, tuple[str, float]] = {}  # username -> (token, expiry)


def get_jwt(username: str, password: str) -> str:
    """
    Get a JWT token for the given username and password, reusing it until 10 min before expiry
    """
    cached = _jwt_cache.get(username)
    if cached and monotonic() < cached[1]:
        return cached[0]

    data = {
        "username": username,
        "password": password,
        "grant_type": "password",
        "client_id": KEYCLOAK_CLIENT_ID,
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    response = requests.post(
        KEYCLOAK_TOKEN_URL,
        data=data,
        headers=headers,
        timeout=600,
        auth=(
            HTTPBasicAuth(STAGING_BASICAUTH_USERNAME, STAGING_BASICAUTH_PASSWORD)
            if KEYCLOAK_TOKEN_URL
            == "https://authentication-staging.pathoplexus.org/realms/loculus/protocol/openid-connect/token"
            else None
        ),
    )
    response.raise_for_status()

    jwt_keycloak = response.json()
    _jwt_cache[username] = (
        jwt_keycloak["access_token"],
        monotonic() + jwt_keycloak["expires_in"] - 600,
    )
    return jwt_keycloak["access_token"]


def make_request(  # noqa: PLR0913, PLR0917
    url: str,
    username: str,
    password: str,
    params: dict[str, Any] | None = None,
    json_body: dict[str, Any] | None = None,
) -> requests.Response:
    """
    Generic request function to handle repetitive tasks like fetching JWT and setting headers.
    """
    jwt = get_jwt(username, password)
    headers = {"Authorization": f"Bearer {jwt}", "Content-Type": "application/json"}
    timeout = 600
    response = requests.post(
        url, headers=headers, json=json_body, params=params, timeout=timeout
    )

    if response.status_code == 423:
        logger.warning(f"Got 423 from {url}. Retrying after 30 seconds.")
        sleep(30)
        return make_request(url, username, password, params, json_body)

    if not response.ok:
        error_message = (
            f"Request failed:\n"
            f"URL: {url}\n"
            f"Status Code: {getattr(response, 'status_code', 'N/A')}\n"
            f"Response Content: {getattr(response, 'text', 'N/A')}"
        )
        logger.error(error_message)
        response.raise_for_status()
    return response


def revoke(
    organism: str, username: str, password: str, version_comments: dict[str, str]
) -> set[str]:
    """
    Get the loculus accessions for the given INSDC accessions and revoke them.
    `version_comments` maps each INSDC accession to the revocation version comment.
    Returns the INSDC accessions whose PPX record was revoked and approved.
    """
    if not version_comments:
        logger.info("Nothing to revoke.")
        return set()

    response = make_request(
        f"{LAPIS_URL}/{organism}/sample/details",
        username,
        password,
        json_body={
            "insdcAccessionBase": list(version_comments.keys()),
            "groupId": INSDC_INGEST_GROUP_ID,
            "versionStatus": "LATEST_VERSION",
            "downloadAsFile": False,
            "dataFormat": "JSON",
            "fields": ["accession", "insdcAccessionBase"],
        },
    )
    entries = response.json()["data"]
    logger.info(entries)
    not_on_ppx = set(version_comments) - {e["insdcAccessionBase"] for e in entries}
    if not_on_ppx:
        logger.warning(
            f"{len(not_on_ppx)} INSDC accessions have no current PPX record in the "
            f"INSDC ingest group (already revoked, never ingested, or a direct "
            f"submission): {sorted(not_on_ppx)}"
        )

    url = f"{BACKEND_URL}/{organism}/revoke"
    revoked_accessions = set()
    revoked_insdc_accessions = set()
    failed_accessions = []
    for entry in entries:
        accession = entry["accession"]
        if accession in revoked_accessions:
            logger.info(f"Already revoked {accession}, skipping.")
            continue
        body = {
            "accessions": [accession],
            "versionComment": version_comments[entry["insdcAccessionBase"]],
        }
        logger.info(f"Revoking {accession} with body: {body}")
        try:
            revocations = make_request(url, username, password, json_body=body).json()
        except requests.exceptions.RequestException as e:
            # e.g. 422 if a revocation is pending approval or not yet in LAPIS
            logger.error(f"Failed to revoke {accession}: {e}")
            failed_accessions.append(accession)
            continue
        if not revocations:
            # /revoke only returns revocation versions that are ready for approval
            logger.error(f"Revoked {accession} but got no revocation version back")
            failed_accessions.append(accession)
            continue
        try:
            approve(organism, username, password, revocations)
        except requests.exceptions.RequestException as e:
            logger.error(
                f"Revoked {accession} but could not approve {revocations}, "
                f"approve it in the review UI: {e}"
            )
            failed_accessions.append(accession)
            continue
        revoked_accessions.add(accession)
        revoked_insdc_accessions.add(entry["insdcAccessionBase"])
    if failed_accessions:
        logger.warning(
            f"Failed to revoke or approve {len(failed_accessions)} accessions: "
            f"{failed_accessions}"
        )
    return revoked_insdc_accessions


def find_ppx_accessions(
    organism: str, username: str, password: str, insdc_accessions: list[str]
) -> dict[str, str]:
    """
    Map each INSDC accession (base, without version) to the PPX accession of its latest version.
    """
    if not insdc_accessions:
        return {}
    response = make_request(
        f"{LAPIS_URL}/{organism}/sample/details",
        username,
        password,
        json_body={
            "insdcAccessionBase": insdc_accessions,
            "versionStatus": "LATEST_VERSION",
            "downloadAsFile": False,
            "dataFormat": "JSON",
            "fields": ["accession", "insdcAccessionBase"],
        },
    )
    return {
        entry["insdcAccessionBase"]: entry["accession"]
        for entry in response.json()["data"]
    }


def approve(
    organism: str, username: str, password: str, revocations: list[dict[str, Any]]
) -> dict[str, Any]:
    """
    Approve exactly the given revocation versions, as returned by /revoke
    """
    payload = {
        "accessionVersionsFilter": [
            {"accession": r["accession"], "version": r["version"]} for r in revocations
        ],
        "submitterNamesFilter": [username],
        "groupIdsFilter": [INSDC_INGEST_GROUP_ID],
        "scope": "WITHOUT_WARNINGS",  # revocations are never preprocessed: always NO_ISSUES
    }

    url = f"{BACKEND_URL}/{organism}/approve-processed-data"

    response = make_request(url, username, password, json_body=payload)

    return response.json()


@dataclass
class GenbankStatusResults:
    suppressed: list[str] = field(default_factory=list)
    replaced: dict[str, str] = field(default_factory=dict)  # accession -> replaced by
    failed: list[str] = field(default_factory=list)  # status could not be determined
    unchanged: list[str] = field(default_factory=list)  # not suppressed or replaced


def check_sequence_status(nucleotide_id: str, results: GenbankStatusResults) -> None:
    """
    Query NCBI for the given accession and add it to the matching bucket in `results`.
    Suppressed takes precedence over replaced.
    """
    base_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"
    params = {"db": "nucleotide", "id": nucleotide_id, "retmode": "xml"}

    try:
        response = requests.get(base_url, params=params, timeout=60)
        response.raise_for_status()
        root = ET.fromstring(response.text)
    except requests.exceptions.RequestException as e:
        logger.error(f"Request failed for {nucleotide_id}: {e}")
        results.failed.append(nucleotide_id)
        return
    except ET.ParseError as e:
        logger.error(f"Failed to parse XML for {nucleotide_id}: {e}")
        results.failed.append(nucleotide_id)
        return

    status = None
    replaced_by = None
    for docsum in root.findall("DocSum"):
        for item in docsum.findall("Item"):
            if item.get("Name") == "Status" and item.text:
                status = item.text.strip().lower()
            elif item.get("Name") == "ReplacedBy" and item.text:
                replaced_by = item.text.strip() or None

    if status is None:
        logger.error(f"Status not found in the response for {nucleotide_id}.")
        results.failed.append(nucleotide_id)
    elif status == "suppressed":
        logger.info(f"The sequence {nucleotide_id} is suppressed.")
        results.suppressed.append(nucleotide_id)
    elif status == "replaced" and replaced_by and replaced_by.split(".")[0] != nucleotide_id.split(".")[0]:
        logger.info(f"The sequence {nucleotide_id} has been replaced by {replaced_by}.")
        results.replaced[nucleotide_id] = replaced_by
    elif status == "live":
        logger.info(f"The sequence {nucleotide_id} is not suppressed or replaced.")
        results.unchanged.append(nucleotide_id)
    else:
        logger.warning(
            f"The sequence {nucleotide_id} has unexpected status '{status}' "
            f"(replaced by: {replaced_by}), not revoking. Check manually."
        )
        results.unchanged.append(nucleotide_id)


def check_organism_supported(organism: str) -> None:
    """
    Exit early for organisms without a single insdcAccessionBase field (segmented organisms).
    """
    response = requests.get(f"{LAPIS_URL}/{organism}/sample/databaseConfig", timeout=60)
    response.raise_for_status()
    fields = {m["name"] for m in response.json()["schema"]["metadata"]}
    if "insdcAccessionBase" not in fields:
        raise click.ClickException(
            f"{organism} has no insdcAccessionBase field (segmented organism?); "
            "this script only supports single-segmented organisms."
        )


def parse_comma_separated(ctx, param, value):
    if value:
        return [item.strip() for item in value.split(",")]
    return []


@click.command()
@click.option(
    "--insdc-accession",
    callback=parse_comma_separated,
    help="Comma-separated list of INSDC accessions",
)
@click.option("--organism", required=True, type=str)
@click.option(
    "--username",
    required=True,
    type=str,
)
@click.option(
    "--password",
    required=True,
    type=str,
)
def main(insdc_accession, organism, username, password):
    logger.info(f"Parsed list: {insdc_accession}")
    check_organism_supported(organism)
    results = GenbankStatusResults()
    for sequence_id in insdc_accession:
        logger.info(f"Checking sequence ID: {sequence_id}")
        check_sequence_status(sequence_id, results)

    replacement_ppx_accessions = find_ppx_accessions(
        organism,
        username,
        password,
        [replaced_by.split(".")[0] for replaced_by in results.replaced.values()],
    )

    def replaced_comment(replaced_by: str) -> str:
        ppx_accession = replacement_ppx_accessions.get(replaced_by.split(".")[0])
        if ppx_accession is None:
            logger.warning(f"Replacement {replaced_by} is not on PPX (yet).")
            return f"Record has been replaced by {replaced_by} on Genbank"
        return (
            f"Record has been replaced by {replaced_by} on Genbank "
            f"(PPX accession {ppx_accession})"
        )

    logger.info("Starting revocation process...")
    version_comments = {
        acc: "Record has been suppressed on Genbank" for acc in results.suppressed
    }
    version_comments.update(
        {
            acc: replaced_comment(replaced_by)
            for acc, replaced_by in results.replaced.items()
        }
    )
    revoked = revoke(organism, username, password, version_comments)
    logger.info(
        f"Revoked {len(revoked.intersection(results.suppressed))} of "
        f"{len(results.suppressed)} suppressed sequences and "
        f"{len(revoked.intersection(results.replaced))} of "
        f"{len(results.replaced)} replaced sequences."
    )
    if results.unchanged:
        logger.info(
            f"Did not revoke {len(results.unchanged)} sequences that were not "
            f"suppressed or replaced: {results.unchanged}"
        )
    if results.failed:
        logger.warning(
            f"Could not determine status of {len(results.failed)} sequences: "
            f"{results.failed}"
        )


if __name__ == "__main__":
    main()
