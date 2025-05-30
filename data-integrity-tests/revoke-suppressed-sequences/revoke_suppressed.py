## This script revokes sequences that have been suppressed on Genbank.
## It assumes the person running the script has curation rights
import logging
from time import sleep
from typing import Any
import requests
import xml.etree.ElementTree as ET

import click
import requests

logger = logging.getLogger(__name__)
logging.basicConfig(
    encoding="utf-8",
    level=logging.INFO,
    format="%(asctime)s %(levelname)8s %(filename)s - %(message)s ",
    datefmt="%H:%M:%S",
)

KEYCLOAK_TOKEN_URL = "https://authentication.pathoplexus.org/realms/loculus/protocol/openid-connect/token"
KEYCLOAK_CLIENT_ID = "backend-client"


def get_jwt(username: str, password: str) -> str:
    """
    Get a JWT token for the given username and password
    """

    data = {
        "username": username,
        "password": password,
        "grant_type": "password",
        "client_id": KEYCLOAK_CLIENT_ID,
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    response = requests.post(
        KEYCLOAK_TOKEN_URL, data=data, headers=headers, timeout=600
    )
    response.raise_for_status()

    jwt_keycloak = response.json()
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


def revoke(organism: str, username: str, password: str, accessions_list: list[str]):
    """
    Get the loculus accession for the given INSDC accessions and revoke them.
    """
    response = make_request(
        f"https://lapis.pathoplexus.org/{organism}/sample/details",
        username,
        password,
        json_body={
            "insdcAccessionBase": accessions_list,
            "downloadAsFile": False,
            "dataFormat": "JSON",
            "fields": ["accession"],
        },
    )
    entries = response.json()["data"]
    logger.info(entries)

    url = f"https://backend.pathoplexus.org/{organism}/revoke"
    for entry in entries:
        accession = entry["accession"]
        logger.debug(f"revoking: {accession}")
        body = {
            "accessions": [accession],
            "versionComment": "Record has been suppressed on Genbank",
        }
        logger.info(f"Revoking {accession} with body: {body}")
        make_request(url, username, password, json_body=body)


def approve(organism: str, username: str, password: str) -> dict[str, Any]:
    """
    Approve all sequences
    """
    payload = {"scope": "ALL", "submitterNamesFilter": [username]}

    url = f"https://backend.pathoplexus.org/{organism}/approve-processed-data"

    response = make_request(url, username, password, json_body=payload)

    return response.json()


def is_sequence_suppressed(nucleotide_id):
    base_url = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi"
    params = {
        "db": "nucleotide",
        "id": nucleotide_id,
        "retmode": "xml"
    }

    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return None

    try:
        root = ET.fromstring(response.text)
        for docsum in root.findall("DocSum"):
            for item in docsum.findall("Item"):
                if item.get("Name") == "Status":
                    status = item.text.strip().lower()
                    return status == "suppressed"
        print("Status not found in the response.")
        return None
    except ET.ParseError as e:
        print(f"Failed to parse XML: {e}")
        return None



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
        # Example usage
    for sequence_id in insdc_accession:
        print(f"Checking sequence ID: {sequence_id}")
        if is_sequence_suppressed(sequence_id):
            logger.info(f"The sequence {sequence_id} is suppressed.")
        else:
            logger.warning(f"The sequence {sequence_id} is not suppressed or could not be determined.")
            raise ValueError(
                f"The sequence {sequence_id} is not suppressed or could not be determined."
            )

    revoke(organism, username, password, accessions_list=insdc_accession)
    approve(organism, username, password)


if __name__ == "__main__":
    main()
