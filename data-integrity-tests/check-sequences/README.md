## Script to Check Sequence Status

### Setup

The script only requires the `requests` library to be installed. If you already have the `pp-integrity` environment configured, this can be used, alternatively you can create a python virtual environment with:

```bash
$ python -m venv .venv
$ source .venv/bin/activate
$ pip install requests
```

### Usage

The script currently only supports viewing biosample status on NCBI. Statuses can be queried for multiple biosamples, either by providing a list of accessions:


```bash
python ./check_sequences.py ncbi biosample --email <your-email> --accessions SAMEA123398430 SAMEA120516123 SAMEA123447583 SAMEA120516106
```

Or providing a `tsv` file, and the name of the column with your accessions:

```bash
python ./check_sequences.py ncbi biosample --email <your-email> --tsv <tsv-file> biosampleAccession
```

It will then output the status of each biosample:

```bash
$ python ./check_sequences.py ncbi biosample --email <your-email> --accessions SAMEA123398430 SAMEA120516123 SAMEA123447583 SAMEA120516106
BioSample: SAMEA123398430 | Status: live
BioSample: SAMEA120516123 | Status: suppressed
BioSample: SAMEA123447583 | Status: live
BioSample: SAMEA120516106 | Status: suppressed
```