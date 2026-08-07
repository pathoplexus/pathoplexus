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
`batchSize`, `alignmentRequirement`, `image` — or `all` for every one of them. Useful for spot-checking what a pipeline
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

`--update-datasets` (expand mode) points the new entry's `nextclade_dataset_tag` at the newest
the server publishes, and pins a reference that had none — usually the whole reason for the
bump. Opt-in, and only ever the new entry; the one being superseded keeps its tag.

```bash
uv run scripts/pipeline-versions/pipeline_versions.py bump --expand-organisms mpox --update-datasets
```

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

`-q` shows errors only, `-v` adds info such as a newer dataset tag being available.
`--skip-remote-checks` and `--skip-model-check` keep it offline.

It also confirms that every nextclade dataset named actually exists on its server and carries
the tag pinned, and that every lineage definition URL resolves — neither is knowable from the
file alone.

And it checks the one thing that spans two artifacts: **the lineage hierarchy SILO loads must
define every lineage the nextclade dataset can assign.** A bump moves the dataset tag and the
hierarchy URL, and nothing makes them move together, so they can drift apart silently until an
import fails.

The names come from the dataset's reference tree — nextclade places a query on it and copies an
attribute from the node it lands on, so nothing outside that set can come out. Which attribute
the metadata field's `preprocessing.inputs.input` says: `nextclade.clade` reads
`clade_membership`, `nextclade.customNodeAttributes.outbreakLineage` reads `outbreakLineage`.
Which dataset the field's `relatesToSegment` says — cchf's `lineage_S` is checked against the S
dataset only, never L or M.

Extra hierarchy entries are fine; a missing one is an error. It is checked for every declared
version, not just the newest, because each version pairs its own tags with its own hierarchy.
Anything it cannot resolve — an input that is not read from a tree, a multi-segment organism
whose lineage field names no segment — is a warning rather than a guess.

This is the expensive part of `check`: a reference tree per dataset per tag, several MB each.
They are all resolved first and then fetched concurrently, so the wait is the slowest single
tree rather than their sum. Extracted value sets are also cached under the temp dir (a tag is
immutable, so they cannot go stale), which helps repeated local runs but not CI.

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

## Validating configFile

PPX runs exactly one preprocessing pipeline, so the authority on what `configFile` may
contain is that pipeline's own pydantic model. `check` fetches the loculus commit that
`pathoplexus_app/values.yaml` pins, imports `Config` from it, forbids extras on it and its
nested models, and runs every organism's `configFile` through it. No setup and no flags:

```bash
uv run scripts/pipeline-versions/pipeline_versions.py check
```

That catches unknown keys, misspellings (including inside `segments:` and `references:`),
wrong types, bad enum values and nested-model errors in one step, with pydantic's own
messages — and it cannot drift, because it *is* the model, at the version being deployed.

The commit is fetched shallow into `~/.cache/pathoplexus-pipeline-versions` and reused, so
only the first run touches the network. `--loculus <path>` uses an existing clone instead;
offline with no cache, the step is skipped with a warning and the rest of `check` still
runs. `--skip-model-check` turns it off outright.

It matters because an unknown key is **silently dropped**: pydantic ignores extras, and
`values.schema.json` sets `additionalProperties: false` on `segments` and `references` but
not on `configFile` itself, so helm renders it happily. andv has two — a
`nextclade_dataset_tag` in the position it occupied before loculus `d3c43c019` moved it
onto the reference, and a stray `taxon_id` belonging to the ingest config.

If a future `loculusVersion` needs a dependency the model imports, the run fails with a
message naming it — add it to the script's PEP 723 header. The preprocessing package
declares its runtime deps only in a conda `environment.yml`, so they cannot be resolved
automatically.

## Tests

```bash
uv run scripts/pipeline-versions/test_pipeline_versions.py   # tests
uv run --with ruff ruff check scripts/pipeline-versions      # lint
```

Config for both is in `pyproject.toml` next to the scripts.

Parallel by default. Fixtures come from pinned commits in this repo's history, not the working
tree — the tool edits the working tree, so tests must not depend on it. If `values.yaml`'s
structure changes enough that tests fail on version numbers, re-pin `BASE_COMMIT`.
