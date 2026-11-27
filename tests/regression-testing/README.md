# Pathoplexus Integrity Test Suite: Data Comparison Workflow

This Snakemake workflow is part of the Pathoplexus integrity test suite. It compares genomic data and metadata between different instances of the LAPIS (Lightweight API for Sequence Information) service to ensure consistency across deployments.

## Purpose

This workflow checks:

1. Data consistency: Ensures that sequence data and metadata are consistent across different LAPIS instances (production, staging, preview).
2. Version integrity: Verifies that updates to the database don't introduce unexpected changes.
3. Deployment validation: Helps validate that new deployments maintain data integrity.

It's crucial for maintaining the reliability and consistency of the Pathoplexus service across different environments and updates.

## Setup

1. Install micromamba if you haven't already.
2. Create and activate the environment:

```bash
micromamba create -f environment.yml
micromamba activate pp-integrity
```

## Running the Workflow

To run the workflow:

```bash
snakemake
```

This will execute the entire workflow, comparing data between production, staging, and preview instances for the specified pathogens.

## Inspecting Results

Results are stored in the `results/` directory. Key files to inspect:

1. Diff files: `results/{organism}.{seq|meta}.{instance1}.{instance2}.diff`
   - These show differences between instances for sequence data and metadata.

2. To view a summary of differences:

    ```bash
    for diff in results/*.diff; do
        echo "Differences in $diff:"
        grep '^[+-]' "$diff" | wc -l
    done
    ```

3. To inspect specific differences:

    ```bash
    less results/cchf.seq.prod.staging.diff
    ```

