### Data Integrity Tests

This test checks that insertions, unaligned and unaligned sequences have not been incorrectly stored in LAPIS.

This script gets unaligned and aligned sequences from LAPIS. For each accession we get the nucleotide insertions from LAPIS (using the `nucleotideInsertions` endpoint with a filter for accession). We then recreate the unaligned sequences from the aligned sequences and insertions. As insertions, unaligned and aligned sequences are all stored at a different location in LAPIS this is a good way to check for internal consistency. However, this test is very computationally intensive - so if we want to use it for production we should randonly select accessions to check.

This script can be run on pathoplexus production, demo and preview instances using:

```bash
micromamba create -f environment.yml
micromamba activate data-integrity
```

```
snakemake --config instance=prod
```
