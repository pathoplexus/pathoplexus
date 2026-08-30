import os

import click
from Bio import SeqIO


@click.command()
@click.option("--input-files", required=True, multiple=True)
@click.option("--output-file", required=True)
def merge_fasta_files(input_files, output_file):
    with open(output_file, "w", encoding="utf-8") as outfile:
        for fasta_file in input_files:
            segment = os.path.basename(fasta_file).split("_")[-1].replace(".fasta", "")

            for record in SeqIO.parse(fasta_file, "fasta"):
                if segment != "main":
                    record.id = f"{record.id.split(".")[0]}_{segment}"
                    SeqIO.write(record, outfile, "fasta")
                else:
                    record.id = f"{record.id.split(".")[0]}"
                    SeqIO.write(record, outfile, "fasta")


if __name__ == "__main__":
    merge_fasta_files()
