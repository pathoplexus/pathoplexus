## Script to Revoke Suppressed Sequences

Ingest will temporarily send alerts that sequences have not been re-ingested and have most likely been suppressed, e.g. 
```
Organism: mpox; 10 previously ingested INSDC accessions not found in re-ingested metadata - LC871643, LC871631, LC871642, LC871620, LC871633, LC871644, LC871626, LC871614, LC871638, LC871622. This might be due to these sequences being suppressed in the INSDC database. Please check the INSDC database for these accessions. If this is the case, please revoke these accessions in Loculus. If this is not the case, this indicates a potential ingest error.
```
For example: https://loculus.slack.com/archives/C08CLH54PFD/p1748184967120199

Running this script will check if the flagged sequences have indeed been suppressed in the INSDC and will revoke them on PPX with a note that they have been suppressed on the INSDC. We assume that you run this script as a curator. If any of the sequences have not been suppressed the script will error and manual review is required. 

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