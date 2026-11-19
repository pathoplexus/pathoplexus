## Script to Revoke Suppressed Sequences

Ingest will temporarily send alerts that sequences have not been re-ingested and have most likely been suppressed, e.g. 
```
Organism: mpox; 10 previously ingested INSDC accessions not found in re-ingested metadata - LC871643, LC871631, LC871642, LC871620, LC871633, LC871644, LC871626, LC871614, LC871638, LC871622. This might be due to these sequences being suppressed in the INSDC database. Please check the INSDC database for these accessions. If this is the case, please revoke these accessions in Loculus. If this is not the case, this indicates a potential ingest error.
```
For example: https://loculus.slack.com/archives/C08CLH54PFD/p1748184967120199

Running this script will check if the flagged sequences have indeed been suppressed or replaced on the INSDC and will revoke them on PPX with a note that they have been suppressed or replaced on the INSDC (if replaced, the accession they were replaced by is added to the version comment). We assume that you run this script as a curator. The script will also log an error if it is unable to determine the status of a sequence, this might require manual investigation.

Warning: this script currently only works for single-segmented organisms!

1. Install micromamba if you haven't already.
2. Create and activate the environment:

```bash
micromamba create -f environment.yaml
micromamba activate pp-integrity
```
3. Run the script
```bash
python3 revoke_suppressed.py --insdc-accession <Comma-separated list of accessions from alert> --organism <organism from alert> --username CURATOR_USERNAME --password CURATOR_PASSWORD
```

Note: If you would like to first test this on staging, replace the PPX production URLs with staging URLs in the script.