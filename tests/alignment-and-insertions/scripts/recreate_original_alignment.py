import json
import click
import requests
from Bio import SeqIO
import difflib


def get_insertions(accession: str):
    url = f"https://lapis.pathoplexus.org/cchf/sample/nucleotideInsertions?accession={accession}&orderBy=position&limit=100&dataFormat=JSON&downloadAsFile=false"
    headers = {"accept": "application/json"}
    response = requests.get(url, headers=headers)

    try:
        data = response.json()["data"]
    except json.JSONDecodeError as err:
        response_summary = response.text
        if len(response_summary) > 100:
            response_summary = (
                response_summary[:50] + "\n[..]\n" + response_summary[-50:]
            )
        print(
            f"Error decoding JSON from /sample/nucleotideInsertions?accession={accession}: {response_summary}"
        )
        raise ValueError() from err
    return data


def reconstruct_unaligned(insertions: list[dict[str, str]], aligned_seq):
    unaligned_seq_parts = []
    start = 0

    for insertion in insertions:  # should be sorted
        pos = insertion["position"]  # positions are 1-indexed, but python is 0-indexed
        unaligned_seq_parts.append(
            aligned_seq[start:pos].replace("-", "")
        )  # remove gaps
        unaligned_seq_parts.append(insertion["insertedSymbols"])
        start = pos

    unaligned_seq_parts.append(aligned_seq[start:].replace("-", ""))

    return "".join(unaligned_seq_parts)


@click.command()
@click.option("--aligned-seq", required=True, type=click.Path(exists=True))
@click.option("--unaligned-seq", required=True, type=click.Path(exists=True))
@click.option("--output", required=True)
def recreate_original_alignment(aligned_seq, unaligned_seq, output):
    unaligned_seq_dict = {}
    for record in SeqIO.parse(unaligned_seq, "fasta"):
        unaligned_seq_dict[record.id] = str(record.seq)

    inaccurate_accessions = []
    for record in SeqIO.parse(aligned_seq, "fasta"):
        insertions = get_insertions(record.id)
        unaligned = unaligned_seq_dict[record.id]
        reconstructed = reconstruct_unaligned(insertions, unaligned)
        if unaligned != reconstructed:
            print(record.id)
            print(insertions)
            print(len(unaligned))
            print(len(reconstructed))
            ratio = difflib.SequenceMatcher(None, unaligned, reconstructed).ratio()
            print(f"The similarity ratio is: {ratio}")
            inaccurate_accessions.append(record.id)

    with open(output, "w", encoding="utf-8") as f:
        for line in inaccurate_accessions:
            f.write(f"{line}\n")


if __name__ == "__main__":
    recreate_original_alignment()
