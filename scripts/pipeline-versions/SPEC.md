# Preprocessing pipeline version tool — specification

Implementation-agnostic. Written so the current implementation can be reviewed against it,
or replaced by a simpler one.

The tool edits `loculus_values/values.yaml` only. It never talks to a cluster or a database.

---

## 1. Background a reimplementation must know

### 1.1 What a pipeline version is

Each organism declares a list of preprocessing pipeline entries. The loculus Helm chart
(`templates/_flattenPreprocessingVersions.tpl`) flattens them: an entry's `version` may be a
scalar **or a list**, and each version becomes one Deployment carrying that entry's config.

```gotemplate
{{- $versions := (kindIs "slice" $pc.version | ternary $pc.version (list $pc.version)) -}}
{{- range $v := $versions -}}
  {{- if hasKey $seen (toString $v) -}}
    {{- fail (printf "Duplicate preprocessing pipeline version %v found in organism configuration" $v) -}}
```

The version integer is a **manual counter**. Nothing derives it. Bumping it is how you ask the
backend to reprocess everything under a new config; the backend promotes the new version only
once it has successfully processed everything the current version processed.

Consequences the tool depends on:

- **Duplicate versions within one organism abort the entire chart render**, not just that
  organism. `$seen` is per-organism, so two organisms may both use version 1.
- Adding a version is additive and invisible to consumers: nothing reads a non-current
  version's rows.
- Removing version N's entry is safe **only once the database's current version is > N**. The
  tool cannot verify this — it is the operator's judgement, and the reason `prune` is a
  separate command run later rather than part of `bump`.

### 1.2 Deployment names embed the flattened index

`loculus-preprocessing-{organism}-v{version}-{index}` where `index` is the position in the
**flattened** list. That index is also in the Deployment's `spec.selector.matchLabels`, which
Kubernetes will not allow to change.

**Requirement:** edits must only ever append to, or remove from, the tail of an organism's
list. Inserting mid-list renumbers every later entry, deleting and recreating Deployments whose
config did not change.

### 1.3 `lineageSystemDefinitions` is keyed by pipeline version

```yaml
lineageSystemDefinitions:
  mpoxOutbreakLineage:
    27: https://…/outbreak-lineages.yaml
    28: https://…/outbreak-lineages.yaml
```

- The key is a **lineage system name, not an organism** (`mpoxOutbreakLineage`, `cchfS`).
  Resolve it from the organism's schema: any metadata field carrying `lineageSystem`, in
  either `schema.metadata` or `schema.metadataAdd`. Only some organisms have one.
- **Helm only fails if the system name is absent**, not if a version key is. A missing version
  key fails later, at SILO import, when the importer looks up
  `definitions[int(pipeline_version)]` for whatever version the backend has promoted.
  **No CI helm render can catch it** — which is why the tool must.

### 1.4 The three entry shapes

All three are live in the repo. A reimplementation that handles only one will be wrong.

**A — one entry, several versions.** Same config deployed under two version numbers.

```yaml
      - <<: *preprocessing
        version:
          - 30
          - 31
```

**B — two entries, the second inheriting the first's config.** Needed when `replicas` must
differ, since a shared version list gives both Deployments the same count.

```yaml
      - &denguePreprocessing
        <<: *preprocessing
        version: [32]
        replicas: 1
        configFile: {…}
      - <<: *denguePreprocessing
        replicas: 3
        version: [33]
```

**C — two entries, the second with its config spelled out.** The usual case: the reason to
bump is a new nextclade dataset, and the old entry must keep serving the old tag. Reference:
`c0db3b4`.

```yaml
      - <<: *mpoxPreprocessing
        replicas: 3
        version: [25]
        configFile:
          <<: *preprocessingConfigFile
          batch_size: 10
          segments:
            - name: main
              references:
              - name: singleReference
                nextclade_dataset_name: nextstrain/mpox/all-clades
                nextclade_dataset_tag: 2026-07-07--14-07-11Z   # the point of the bump
                genes: *mpoxGenes                              # ~175 names, not duplicated
```

### 1.5 The failure this tool exists to prevent

**YAML merge keys are shallow.** Re-declaring `configFile:` *replaces* the inherited value; it
does not deep-merge into it. On 2026-08-05 a hand-written mpox entry (PR #1091) did exactly
that and omitted `segments:`. With no segments the pipeline sets
`alignment_requirement = NONE`: it aligns nothing, annotates nothing, and **cannot emit an
alignment error**. Being maximally permissive it "succeeded" on every entry and was promoted to
current, destroying clade/lineage/mutation data for ~17k mpox records and deadlocking all
future bumps.

The config was valid YAML and rendered cleanly. Only a semantic check catches it.

---

## 2. Commands

```
status [--columns …]                            per organism: versions, replicas, nextclade
                                                dataset tags, and the lineage definition URLs
                                                in full. --columns appends others, or `all`
bump   [--organisms …] [--mode …] [--expand-organisms …] [--update-datasets]
       [--replicas N] [--anchor-threshold N] [--dry-run]
prune  [--organisms …] [--dry-run]
check  [--organisms …] [-q|-v] [--allow-empty-segments]
       [--loculus PATH] [--skip-model-check] [--skip-remote-checks]
```

`--organisms a,b,c` scopes every command; omitted means all. An unknown name is an error.

Exit codes: `0` success, `1` an invariant was violated or an organism could not be handled,
`2` bad usage.

### 2.1 `bump` — add the next version, leaving the current one running

New version is `max(existing versions) + 1`, per organism.

| mode | shape | when |
|---|---|---|
| `inherit` *(default)* | B | only version and replicas change |
| `expand` | C | the config needs editing (new dataset tag) |
| `append` | A | nothing changes but the counter |

`--expand-organisms a,b` forces `expand` for those organisms only, overriding `--mode`. Names
must be within `--organisms` if that is given.

Requirements:

- **`inherit`** emits `- <<: *anchor` + `replicas` + `version`. If the source entry has no
  anchor, add one, named per §3.3; if that name is already taken — an organism mid-bump whose
  earlier entry holds it — qualify with the source version.
- **`expand`** copies the source entry's `configFile` in full so every key is present and
  editable in place.
  - A scalar list longer than `--anchor-threshold` lines (default 5) is replaced by an alias,
    creating the anchor on the source entry if needed. Shorter lists are duplicated, where an
    alias saves nothing and costs a cross-entry dependency.
  - **Only flat sequences of scalars may be aliased.** Never collapse a mapping behind an
    alias — the per-version values (dataset tags) live in mappings, and hiding them defeats
    the purpose.
  - **The copy must not redefine an anchor the source defines.** YAML permits redefinition and
    later aliases bind to the newer node, so a redefinition silently retargets any alias
    between the two.
  - Prefer merging the **global** `*preprocessing` over the organism's own anchor, so the new
    entry does not depend on its sibling and `prune` can simply delete the old one. This is
    only valid if the two agree on every key the new entry does not declare itself — compute
    it, do not assume; a per-entry `image`/`args`/`dockerTag` breaks it. Fall back to the
    sibling anchor when they differ.
- **`append`** adds to the existing entry's version list, converting a scalar or flow list to a
  block list if needed.
- **`--update-datasets`** (expand only) points the new entry's `nextclade_dataset_tag` at the
  newest the server publishes, and pins a reference that had none. Opt-in, because it is a
  behaviour change. Only the new entry: the one being superseded keeps the tag it has been
  processing with, which is why there are two. A reference it cannot rewrite -- a flow mapping,
  say -- is reported rather than silently left alone.
- **All modes** add `lineageSystemDefinitions[system][new] = <URL of the current highest
  version>` for every lineage system the organism references.
- The new entry is **appended after the current highest**, never inserted (§1.2). `--replicas`
  defaults to 3.

### 2.2 `prune` — drop superseded versions

Keeps the highest version, removes the rest, and removes any leftover commented-out stub.

Two collapses, selected by whether the entries' **resolved** configs differ:

- **Uniform** — keep the first entry (it holds the anchors), renumber it to the surviving
  version, delete the rest.
- **Differing** — the highest entry's config is the one that must survive, so the lower entries
  are deleted, and **any anchor they define that a surviving entry still aliases is relocated
  into the survivor**, re-indented to its new position.

Replicas return to the oldest entry's count — the steady-state value from before the bump
raised it.

Lineage keys: remove every key for a version **no surviving entry uses**. Not "below the
highest" — a stale key can sit above the current version, and one can be left behind by a
skipped prune. This sweep must run **even when there are no entry edits to make**, otherwise a
stale key on a single-version organism can never be removed while `check` goes on reporting it.

**Merge keys.** A surviving entry may inherit from a doomed entry via `<<: *anchor`. Unlike a
value alias this cannot be relocated — there is nowhere to move a whole mapping to. Instead
re-point it at the global `*preprocessing`, which makes the survivor self-contained. Valid only
when the two agree on every key the survivor does not declare itself (`image`, `args`);
compute it, and refuse if they differ.

**Refusals.** `prune` must decline, with a message naming the organism, rather than guess when:

- a surviving entry inherits keys from a doomed entry that the global `*preprocessing` does not
  supply, so the merge key cannot be re-pointed;
- an anchor is aliased in a form the relocation cannot express;
- `version:` is not in a form it can edit.

**Unused anchors.** After the collapse, remove any anchor on the organism's entries that
nothing aliases. An anchor exists to be referenced; which ones survived a prune used to be an
accident of where the remaining text happened to sit rather than a decision, and "always keep"
is not achievable — `&<org>Preprocessing` lives on the entry being deleted and there is nowhere
to move it. `bump` re-adds one the moment it is needed, so keeping a spare buys nothing. Costs
about three diff lines per organism on the next bump.

This must run as a second pass over the already-edited text: whether an anchor is still aliased
depends on what the other edits did.

**Verbosity.** `-q` errors only, default adds warnings, `-v` adds info. Severity carries
meaning: an error breaks the pipeline, a warning is something to fix, and info is a fact you may
already have decided about. A tag that is merely no longer newest is info, and only for the
**latest** version -- a superseded entry pinning an older dataset is exactly what it is for.

**Network.** Assertions 8b--8e reach out: 8b fetches the pinned loculus commit (shallow, cached
under the temp dir), 8c reads each dataset server's `index.json`, 8d HEADs each URL. A fetch
that fails is a warning, not an error, so a transient outage is not indistinguishable from a
broken config. `--skip-model-check` and `--skip-remote-checks` disable them; `bump` and `prune`
run neither, since they copy config verbatim and should not need the network to write a file.

**A refusal aborts the whole run.** Every organism's problem is collected and reported, then
nothing is written at all. Applying the rest would leave a half-done state that is easy not to
notice — and a partial run is what made stale lineage keys linger unexplained. Scope with
`--organisms` to proceed with the ones that do work.

### 2.3 `check` — the CI gate

Runs on the file as it stands, whoever wrote it. Errors exit 1; warnings do not. All assertions
operate on the **resolved** (merge-key-expanded) view.

| # | assertion | severity |
|---|---|---|
| 1 | no duplicate version within an organism | error |
| 2 | no entry is missing a `configFile` key that a **lower-version** entry declares | error |
| 3 | every entry has a non-empty `segments` (unless `--allow-empty-segments`) | error |
| 4 | an organism's flattened versions are in ascending order | error |
| 5 | every referenced lineage system exists, and every declared version has a key under it | error |
| 6 | no lineage key for a version no entry uses | warning |
| 7 | no commented-out stub naming an already-active version | warning |
| 8 | every dataset reference pins a `nextclade_dataset_tag` | warning |
| 8b | `configFile` validates against the preprocessing pipeline's own model | warning |
| 8c | every nextclade dataset named exists on its server, and carries the tag pinned | error |
| 8d | every lineage definition URL resolves | error |
| 8e | the latest version's dataset tag is the newest published | info |
| 9 | no anchor on a pipeline entry that nothing aliases | warning |
| 10 | no anchor sharing its line with a key (`- &name key: value`) | error |

**Assertion 2 is the incident check and its asymmetry is deliberate.** A newer entry *adding* a
key is an ordinary config change and is exactly what hand-editing a generated draft looks like;
failing on that would make the check get reverted. A newer entry *losing* a key is the
incident's signature. Assertion 4 guarantees "earlier" means "lower version".

Assertion 5 distinguishes an absent lineage *system* from an absent *version key* — they are
different mistakes.

---

## 3. Repository facts a reimplementation will trip over

### 3.1 Leftover commented-out stubs are booby-trapped

Historically `prune` commented the superseded entry out instead of deleting it, leaving a
template for the next bump:

```yaml
      # - <<: *denguePreprocessing
      #   replicas: 3
      #   version:
      #     - 32
```

**Every such stub in the file names a version that is already active** (dengue's says 32 while
dengue is at 32). Uncommenting one verbatim — the established manual workflow — produces a
duplicate version and aborts the chart render.

This tool abandons the idiom: `prune` deletes, `bump` generates. It still parses stubs, reuses
their position and replicas, and always overwrites their version.

### 3.2 Anchors are necessary, not incidental

`&mpoxGenes` exists so shape C need not duplicate ~175 gene names, and was created in the
commit that first needed it. A reimplementation cannot avoid anchors by always duplicating —
but it can confine them to flat scalar lists, where relocation is mechanical.

### 3.3 Identifying anchors

Take anchors and aliases from **PyYAML's token stream** (`yaml.scan`), not a regex: the scanner
knows an `&` inside a quoted scalar is not an anchor. The linkOut URLs are full of
`&dataset-name=` query parameters, and a naive `&(\w+)` reads seven of them as anchor
definitions. The tokens also carry exact line marks, so the positions come from the parser
rather than a second guess at the text.

### 3.4 An entry's anchor must be alone on its line

```yaml
      - &denguePreprocessing      # correct: binds the mapping
        <<: *preprocessing
```

The tempting one-line form is wrong:

```yaml
      - &denguePreprocessing <<: *preprocessing
```

YAML binds a property in that position to the **key scalar**, not to the mapping, so
`*denguePreprocessing` resolves to the string `"<<"` / `"replicas"` / whatever the first key
is. With a merge key it happens to blow up (`expected a mapping ... but found scalar`); with a
plain alias it resolves to a string and reports nothing at all. Assertion 9 catches it.

This is why adding an anchor costs three diff lines rather than one — a one-line edit is not
available.

### 3.5 Anchor naming

Pipeline-entry anchors are `<camelCase organism>Preprocessing` — `westNilePreprocessing`,
`rsvAPreprocessing`, `ebolaBdbvPreprocessing`. An organism only carries one if something
aliases it, so several have none, and that is fine.

When an organism is mid-bump and its earlier entry already holds the plain name, the generated
one is suffixed with the source version (`mpoxPreprocessingV28`). That suffix is expected and
temporary — `prune` removes the entry carrying it.

**Match organisms structurally, by their key path under `organisms:` — never by anchor name.**
The convention is not enforced by anything, so it can drift again.

> Until 2026-08-07 west-nile's anchor was named `&yellowFeverPreprocessing`, left over from
> when West Nile was split out of the Yellow Fever config. It was renamed, along with
> `rsvaPreprocessing`/`rsvbPreprocessing` → `rsvAPreprocessing`/`rsvBPreprocessing`, in a
> rename-only change verified to leave the resolved document identical. Beyond being
> misleading, it made yellow-fever's own generated anchor collide, producing the meaningless
> name `yellowFeverPreprocessingV31`.

### 3.6 Other

- `values.schema.json` does not require `configFile` or `configFile.segments`.

---

## 4. Editing and safety requirements

### 4.1 Preserve the rest of the file exactly

Everything outside the edited region must be byte-identical, including comments, blank lines,
quoting style and flow-list spacing.

**Do not round-trip the whole document through a YAML dumper.** Verified against ruamel.yaml:
even a no-op load→dump normalises inconsistent sequence indentation, strips `[ "a", "b" ]`
inner spacing, and displaces end-of-line comments. Worse, deleting a node that carries an
anchor makes it **silently relocate the anchor onto a surviving referent and inline the merge
source there**, rewriting a distant part of the document.

The current implementation therefore mutates by line splice, parsing only to locate blocks and
to compute the resolved view. Any approach meeting the byte-identity requirement is acceptable.

### 4.2 Cross-check the locator against the parser

However blocks are located, the result must be validated against a real YAML parse — entry
counts and version numbers per organism must agree — and the tool must **refuse** on mismatch.
This is what makes textual editing safe: a layout change becomes a hard error rather than a
silent mis-edit.

### 4.3 Verify before writing

Nothing is written until the prospective result has been re-parsed and checked:

- **bump:** the new entry must resolve to the same config as the entry it was generated from.
- **prune:** the surviving entry must resolve to exactly what the highest version resolved to
  before.

This is what makes anchor relocation trustworthy — a mis-moved anchor or a dropped nested key
becomes a refusal instead of a commit. After writing, `check` runs over the result.

### 4.4 Output

Print a unified diff plus a plain-language list of what changed, before writing. `--dry-run`
performs every check including verification, and writes nothing.

Error messages state the problem. They do not speculate about its cause.

---

## 5. Testing requirements

- Fixtures come from the repo's own git history, pinned by commit — **not** the working tree,
  which the tool itself edits. `9764d15` is the incident config and **`check` must fail on it**;
  that is the single most important test.
- Derive version numbers from the fixture rather than hardcoding, so re-pinning is cheap.
- Assert resolved-config equality across **every** organism after a bump. With helm unavailable
  locally this is the closest stand-in for diffing the rendered chart.
- Assert that layout drift *raises*, not merely that benign formatting does not.
- Cover both directions of assertion 2 — a newer entry adding a key must pass.
- The full mpox path: `[27,28]` → expand-bump → `[27,28,29]` → prune → `[29]`, with the survivor
  resolving identically to the pre-existing v28 config and all 175 genes intact.

---

## 6. Non-goals

- Talking to the cluster, backend or database. Whether it is *safe* to prune — whether the
  backend has actually promoted the new version — is the operator's call.
- Deciding *when* to bump, or what the new config should say. `bump --mode expand` produces a
  first draft; a human edits the dataset tag.
- Reformatting, reordering or normalising anything not being changed.
- Fixing the pre-existing oddities in §3.3.
