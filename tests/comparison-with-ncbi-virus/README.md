### Data Integrity Test

This test checks that metadata and unaligned sequences have not been incorrectly stored in LAPIS.

This script gets unaligned sequences and metadata from NCBI virus for each virus (as we do in ingest) and then checks that for each sequence in LAPIS that corresponding insdcAccessionBase is the correct accession for that sequence in INSDC. As we store the insdcAccessionBase in the metadata and metadata and unaligned sequences are stored separately in LAPIS this is a good test to identify any storage issues.

This script can be run on pathoplexus production, demo and preview instances using:

```bash
micromamba create -f environment.yml
micromamba activate data-integrity
```

```
snakemake --config instance=prod
```
