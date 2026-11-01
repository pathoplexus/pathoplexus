import csv
import argparse
import requests
import itertools
from time import sleep
import xml.etree.ElementTree as ET


BATCH_SIZE = 100


class NCBIEndpoints:
    ESEARCH = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi"
    EFETCH = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi"


def parse_accessions_tsv(tsv_path: str, column_name: str) -> list[str]:
    accessions = []
    with open(tsv_path, mode="r", encoding="utf-8") as tsv_file:
        reader = csv.DictReader(tsv_file, delimiter="\t")

        if not reader.fieldnames or column_name not in reader.fieldnames:
            available = reader.fieldnames if reader.fieldnames else []
            raise KeyError(
                f"Column '{column_name}' not found. Available columns: {available}"
            )

        for row in reader:
            value = row.get(column_name)
            if value and value.strip():
                accessions.append(value.strip())

    return accessions


def check_ncbi_biosamples_status_batch(
    accessions: list[str], email: str | None
) -> dict[str, str]:

    base_params = {"db": "biosample"}
    if email:
        base_params["email"] = email

    # Accessions with no record in the efetch response stay not_found
    statuses = {accession: "not_found" for accession in accessions}

    try:
        # Resolve accessions to UIDs via esearch
        search_params = base_params | {
            "term": " OR ".join(accessions),
            "retmode": "json",
            # By default, esearch returns a maximum of 20 UIDs
            "retmax": len(accessions),
        }
        search_res = requests.post(NCBIEndpoints.ESEARCH, data=search_params)
        search_res.raise_for_status()
        search_result = search_res.json().get("esearchresult", {})
        id_list = search_result.get("idlist", [])
        count = int(search_result.get("count", 0))
        if count > len(id_list):
            print(f"Warning: {count} hits but only fetched {len(id_list)}.")

        if not id_list:
            return statuses

        # Fetch full XML via efetch
        fetch_params = base_params | {"id": ",".join(id_list), "retmode": "xml"}
        fetch_res = requests.post(NCBIEndpoints.EFETCH, data=fetch_params)
        fetch_res.raise_for_status()

        root = ET.fromstring(fetch_res.text)
        for sample_elem in root.iter("BioSample"):
            accession = sample_elem.attrib.get("accession")
            status_elem = sample_elem.find("Status")
            if status_elem is not None and "status" in status_elem.attrib:
                status = status_elem.attrib["status"].lower()
            else:
                status = "unknown"

            if accession in statuses:
                statuses[accession] = status

        return statuses

    except (requests.RequestException, ET.ParseError) as e:
        print(f"Error processing batch of {len(accessions)} accessions: {e}")
        return {accession: "error" for accession in accessions}


def check_ncbi_biosamples_status(
    accessions: list[str], email: str | None
) -> dict[str, str]:
    statuses = {}

    for batch in itertools.batched(accessions, BATCH_SIZE):
        statuses |= check_ncbi_biosamples_status_batch(
            accessions=list(batch), email=email
        )
        sleep(1)

    return statuses


def main():
    parser = argparse.ArgumentParser(description="Check status of NCBI records.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    ncbi_parser = subparsers.add_parser("ncbi", help="NCBI database actions")
    ncbi_subparsers = ncbi_parser.add_subparsers(dest="subcommand", required=True)

    biosample_parser = ncbi_subparsers.add_parser(
        "biosample", help="Check BioSample record status"
    )
    biosample_parser.add_argument(
        "--email", required=True, help="User email address for NCBI Entrez"
    )

    input_group = biosample_parser.add_mutually_exclusive_group(required=True)
    input_group.add_argument(
        "--accessions",
        nargs="+",
        help="Space-separated list of BioSample accessions",
    )
    input_group.add_argument(
        "--tsv",
        nargs=2,
        metavar=("PATH", "COLUMN"),
        help="Path to input TSV file and the name of the accession column",
    )

    args = parser.parse_args()

    # Resolve accessions list based on input flags
    if args.accessions:
        accessions = [acc.strip() for acc in args.accessions if acc.strip()]
    else:
        tsv_path, column = args.tsv
        accessions = parse_accessions_tsv(tsv_path, column)

    if args.command == "ncbi" and args.subcommand == "biosample":
        statuses = check_ncbi_biosamples_status(accessions=accessions, email=args.email)
        for accession in accessions:
            print(f"BioSample: {accession} | Status: {statuses[accession]}")


if __name__ == "__main__":
    main()
