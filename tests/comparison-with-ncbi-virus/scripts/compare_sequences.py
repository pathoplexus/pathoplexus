import logging
from dataclasses import dataclass

import click
import pandas as pd
import yaml
from Bio import SeqIO

logger = logging.getLogger(__name__)
logging.basicConfig(
    encoding="utf-8",
    level=logging.DEBUG,
    format="%(asctime)s %(levelname)8s (%(filename)20s:%(lineno)4d) - %(message)s ",
    datefmt="%H:%M:%S",
)


@dataclass
class Config:
    nucleotide_sequences: list[str]
    segmented: bool


@click.command()
@click.option("--config-file", required=True, type=click.Path(exists=True))
@click.option("--sequences-input", required=True, type=click.Path(exists=True))
@click.option("--metadata-input", required=True, type=click.Path(exists=True))
@click.option("--original-sequences", required=True, type=click.Path(exists=True))
@click.option("--output", required=True)
@click.option(
    "--log-level",
    default="INFO",
    type=click.Choice(["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]),
)
def compare_sequences(
    config_file, sequences_input, metadata_input, original_sequences, log_level, output
):
    logger.setLevel(log_level)

    with open(config_file, encoding="utf-8") as file:
        full_config = yaml.safe_load(file)
        relevant_config = {key: full_config.get(key, False) for key in Config.__annotations__}
        config = Config(**relevant_config)
    if len(config.nucleotide_sequences) > 1:
        config.segmented = True

    df = pd.read_csv(metadata_input, sep="\t", dtype=str, keep_default_na=False)
    metadata: list[dict[str, str]] = df.to_dict(orient="records")

    accession_map: dict[str, str] = {}
    for record in metadata:
        if config.segmented:
            for segment in config.nucleotide_sequences:
                if record.get("insdcAccessionBase" + "_" + segment):
                    accession_map[record["accession"] + "_" + segment] = record[
                        "insdcAccessionBase" + "_" + segment
                    ]
            continue
        accession_map[record["accession"]] = record["insdcAccessionBase"]

    ncbi_sequences: dict[str, str] = {}
    with open(original_sequences, encoding="utf-8") as f_in:
        records = SeqIO.parse(f_in, "fasta")
        for record in records:
            ncbi_sequences[record.id.split(".")[0]] = str(record.seq)

    inaccurate_accessions = []
    with open(sequences_input, encoding="utf-8") as f_in:
        records = SeqIO.parse(f_in, "fasta")
        for record in records:
            if str(record.seq) != ncbi_sequences[accession_map[record.id.split(".")[0]]]:
                inaccurate_accessions.append(record.id)

    with open(output, "w", encoding="utf-8") as f:
        for line in inaccurate_accessions:
            f.write(f"{line}\n")


if __name__ == "__main__":
    compare_sequences()
