# pipeline-versions

Manage preprocessing pipeline versions in `loculus_values/values.yaml`.

`SPEC.md` is the specification — read that to review or reimplement the tool.
This file is how to use it.

No environment setup: the script carries PEP 723 inline metadata, so `uv run` installs its one
dependency on the fly. (`uvx` does **not** work for local scripts.)

Run from the repo root:

```bash
uv run scripts/pipeline-versions/pipeline_versions.py status
```

## Commands

| | |
|---|---|
| `status` | versions, replicas, entry count, nextclade dataset tags, lineage definition URLs |

`status` columns:

| column | meaning |
|---|---|
| `versions` | every pipeline version the organism currently declares |
| `replicas` | pod count per entry |
| `entries` | how many items are in the organism's `preprocessing:` YAML list. Two versions can come from **one** entry (same config deployed twice) or **two** entries (configs that may differ) — that is what this distinguishes, and it decides what `prune` has to do |
| `nextcladeDatasetTag` | the pinned dataset tag, labelled per segment when segments differ, or `unpinned` |
| `lineageDefinitions` | the URL SILO loads for the organism's lineage system |

`--columns` appends more: `datasetName`, `datasetServer`, `segments`, `minimizerUrl`,
`batchSize`, `alignmentRequirement`, `image`. Useful for spot-checking what a pipeline
actually pulls:

```bash
uv run scripts/pipeline-versions/pipeline_versions.py status --columns datasetName,datasetServer
```
| `bump`   | add the next version, leaving the current one running |
| `prune`  | drop superseded versions once reprocessing is done |
| `check`  | assert the invariants; exit 1 on failure. Runs in CI |

`--organisms mpox,rsv-a` scopes any command; omitted means all.
`--dry-run` on `bump`/`prune` runs every check and writes nothing.

Every run prints a diff and a summary of what it did before writing, re-parses the result, and
re-runs `check` over it.

## Bumping

Pick the shape by what is actually changing:

```bash
# Only the version and replicas change -- minimal diff.
uv run scripts/pipeline-versions/pipeline_versions.py bump --organisms dengue

# The config needs editing too (a new nextclade dataset tag is the usual reason).
# Writes the new entry with its configFile spelled out, ready to hand-edit.
uv run scripts/pipeline-versions/pipeline_versions.py bump --expand-organisms mpox

# Nothing changes but the counter -- adds to the existing entry's version list.
uv run scripts/pipeline-versions/pipeline_versions.py bump --organisms cchf --mode append
```

`--expand-organisms` overrides the mode for those organisms only, so one run can bump
everything while flattening just the ones you intend to edit.

After an expand bump, **edit the new entry** — that is what it is for. `check` will tell you if
the edit dropped something the old entry had.

Replicas for the new entry default to 3 -- more pods clear the reprocessing backlog faster.
Override with `--replicas N`.

Long scalar lists — mpox's ~175 gene names — are aliased rather than duplicated once they
exceed `--anchor-threshold` lines (default 5). Short lists are duplicated.

## Pruning

Only once the backend has actually promoted the new version. The tool cannot check that for
you; it edits YAML and nothing else.

```bash
uv run scripts/pipeline-versions/pipeline_versions.py prune --organisms dengue
```

Keeps the highest version, deletes the rest, drops stale lineage keys, and returns replicas to
their steady-state value. It also clears any leftover commented-out entry it finds — older
prunes left those behind as templates, and every one named an already-active version, so
uncommenting it verbatim aborted the chart render. They were removed in `24b71a8` and the tool
does not create new ones.

If the surviving entry inherits from the one being deleted via a merge key
(`<<: *mpoxPreprocessing`), prune re-points it at the global `*preprocessing` so it becomes
self-contained — but only after checking the two supply the same thing. If the doomed entry
provides something global does not, it refuses.

It also drops anchors nothing aliases any more. An anchor exists to be referenced, and `bump`
adds one back the moment it is needed — at a cost of about three diff lines on that bump.

**A refusal aborts the whole run and writes nothing**, listing every organism it could not
handle. Exclude them with `--organisms` to proceed with the rest.

## Checking

```bash
uv run scripts/pipeline-versions/pipeline_versions.py check
```

Runs on every PR touching `loculus_values/**` via `helm-template-check.yml`. It catches what
`helm template` cannot: a pipeline entry that silently lost `segments:` to a shallow merge-key
override, and a `lineageSystemDefinitions` version key whose absence only surfaces inside the
SILO importer at runtime.

Against the 2026-08-05 incident config it fails with:

```
ERROR: mpox: entry 1 (version [27]) is missing configFile key(s) ['segments'] that a
       lower-version entry declares.
ERROR: mpox: entry 1 (version [27]) has no segments.
```

## Tests

```bash
uv run scripts/pipeline-versions/test_pipeline_versions.py   # tests
uv run --with ruff ruff check scripts/pipeline-versions      # lint
```

Config for both is in `pyproject.toml` next to the scripts.

Parallel by default. Fixtures come from pinned commits in this repo's history, not the working
tree — the tool edits the working tree, so tests must not depend on it. If `values.yaml`'s
structure changes enough that tests fail on version numbers, re-pin `BASE_COMMIT`.
