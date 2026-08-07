#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.14"
# dependencies = ["PyYAML>=6.0", "pytest>=8", "pytest-xdist>=3"]
# ///
"""Tests for pipeline_versions.py.

Run with:  uv run scripts/test_pipeline_versions.py

Fixtures come from the repo's own git history, so the tests assert against real
configurations rather than invented ones. The most important case is
``test_check_catches_the_mpox_incident``: commit 9764d15 is the config that was live
in production during the 2026-08-05 mpox incident.
"""

import re
import subprocess
import sys
from pathlib import Path

import pytest
import yaml

sys.path.insert(0, str(Path(__file__).parent))
import pipeline_versions as pv

REPO = Path(__file__).resolve().parents[2]
VALUES = REPO / "loculus_values" / "values.yaml"

INCIDENT_COMMIT = "9764d15"  # segment-less mpox v27 -- what production was serving
PRE_INCIDENT_COMMIT = "1c04032"  # a clean prune, before the two-entry migration

# Behavioural tests run against a pinned commit, not the working tree. Running the tool
# is the normal way to edit values.yaml, so the working copy's version numbers and stubs
# move; tests that assert on them must not depend on that. Version numbers are still
# derived rather than hardcoded wherever it costs nothing, so re-pinning stays cheap.
BASE_COMMIT = "24b71a8"

# The last commit that still carried the commented-out stubs left behind by older prunes.
# `24b71a8` removed them and the tool no longer produces any, but it must keep handling one
# it finds -- in an old branch, or from a hand edit -- so those tests pin to this instead.
LEGACY_STUB_COMMIT = "f9de729"


def _blob(commit: str) -> str:
    return subprocess.run(
        ["git", "-C", str(REPO), "show", f"{commit}:loculus_values/values.yaml"],
        capture_output=True,
        text=True,
        check=True,
    ).stdout


def _at(commit: str, tmp_path: Path) -> Path:
    path = tmp_path / f"{commit}.yaml"
    path.write_text(_blob(commit))
    return path


@pytest.fixture
def work(tmp_path: Path) -> Path:
    path = tmp_path / "values.yaml"
    path.write_text(_blob(BASE_COMMIT))
    return path


@pytest.fixture
def legacy(tmp_path: Path) -> Path:
    """A config that still has the old commented-out stubs. See LEGACY_STUB_COMMIT."""
    path = tmp_path / "legacy.yaml"
    path.write_text(_blob(LEGACY_STUB_COMMIT))
    return path


def _run(path: Path, *args: str) -> int:
    return pv.main(["--values", str(path), *args])


def _versions(path: Path, org: str) -> list[int]:
    return pv.load(path).organisms[org].versions


def _cur(path: Path, org: str) -> int:
    """The organism's highest pipeline version right now."""
    return pv.load(path).organisms[org].max_version


# ------------------------------------------------------------------------- check


def test_check_passes_on_the_working_copy():
    """The one test that deliberately reads the real file rather than a pinned commit.

    Whatever state values.yaml is in right now, it must satisfy the invariants -- this
    is the same assertion CI makes on every PR.
    """
    assert _run(VALUES, "check") == 0


def test_check_catches_the_mpox_incident(tmp_path, capsys):
    """The whole point. A segment-less pipeline entry must not pass."""
    assert _run(_at(INCIDENT_COMMIT, tmp_path), "check", "--organisms", "mpox") == 1
    err = capsys.readouterr().err
    assert "missing configFile key(s) ['segments']" in err
    assert "has no segments" in err


def test_check_passes_on_a_clean_historical_config(tmp_path):
    assert _run(_at(PRE_INCIDENT_COMMIT, tmp_path), "check") == 0


def test_check_catches_a_missing_lineage_version(work, capsys):
    """SILO looks this up at import time; helm renders it happily."""
    text = work.read_text().replace(
        "    28: https://pathoplexus.github.io/silo-lineage-hierarchy-definitions/"
        "definitions/mpox/2026-07-07--14-07-11Z/outbreak-lineages.yaml\n",
        "",
        1,
    )
    work.write_text(text)
    assert _run(work, "check", "--organisms", "mpox") == 1
    assert "lineageSystemDefinitions.mpoxOutbreakLineage has no entry" in capsys.readouterr().err


def test_check_catches_duplicate_versions(work, capsys):
    doc = pv.load(work)
    item = doc.organisms["mpox"].active[-1]
    lines = list(doc.lines)
    lines[max(item.version_value_lines)] = "          - 27"  # collide with entry 0
    work.write_text("\n".join(lines))
    assert _run(work, "check", "--organisms", "mpox") == 1
    assert "version 27 declared by entries" in capsys.readouterr().err


def test_check_warns_about_stale_stubs(legacy, capsys):
    _run(legacy, "check")
    out = capsys.readouterr().out
    assert "dengue: commented-out stub declares version [32], which is already active" in out


# -------------------------------------------------------------------------- bump


def test_bump_ignores_a_leftover_stub_rather_than_reusing_it(legacy):
    """Stubs are a dead idiom: bump appends, and prune is what clears them.

    Reusing one meant inheriting a version that is stale by construction. The entry is
    appended after the current highest instead, which is also the only position that
    keeps existing Deployment indices stable.
    """
    assert _run(legacy, "bump", "--organisms", "dengue") == 0
    org = pv.load(legacy).organisms["dengue"]
    assert org.versions == [32, 33]
    assert org.active[-1].start > org.active[0].end - 1  # appended after the current entry
    assert len(org.stubs) == 1  # untouched; prune removes it


def test_bump_replicas_override_wins(work):
    assert _run(work, "bump", "--organisms", "west-nile", "--replicas", "5") == 0
    new = max(pv.load(work).organisms["west-nile"].active, key=lambda i: i.max_version)
    assert new.replicas == 5


def test_bump_adds_an_anchor_when_the_entry_has_none(work):
    assert _run(work, "bump", "--organisms", "ebola-zaire") == 0
    org = pv.load(work).organisms["ebola-zaire"]
    assert org.active[0].anchor == "ebolaZairePreprocessing"
    assert org.active[1].merge_alias == "ebolaZairePreprocessing"
    assert org.versions == [31, 32]


def test_bump_names_a_new_anchor_after_its_organism(work):
    assert _run(work, "bump", "--organisms", "yellow-fever") == 0
    assert pv.load(work).organisms["yellow-fever"].active[0].anchor == "yellowFeverPreprocessing"


def test_bump_qualifies_an_anchor_name_already_taken_within_the_organism(work):
    """mpox mid-bump: entry 27 already holds `mpoxPreprocessing`, so entry 28 needs
    a distinct name. The suffix is temporary -- prune removes the entry carrying it."""
    assert _run(work, "bump", "--organisms", "mpox") == 0
    anchors = [i.anchor for i in pv.load(work).organisms["mpox"].active]
    assert anchors[:2] == ["mpoxPreprocessing", "mpoxPreprocessingV28"]


def test_bump_adds_the_lineage_version_key(work):
    assert _run(work, "bump", "--organisms", "mpox") == 0
    assert 29 in pv.load(work).lineage["mpoxOutbreakLineage"]


def test_bump_append_mode_extends_the_version_list(work):
    assert _run(work, "bump", "--organisms", "cchf", "--mode", "append") == 0
    org = pv.load(work).organisms["cchf"]
    assert len(org.active) == 1
    assert org.versions == [25, 26]


ALL_ORGANISMS = sorted(yaml.safe_load(_blob(BASE_COMMIT))["organisms"])


@pytest.mark.parametrize("org", ALL_ORGANISMS)
def test_bumped_entry_inherits_the_full_config(work, org):
    """The single most important property of generated output.

    This resolved-config equality is the closest available stand-in for diffing the
    rendered chart, which needs helm. It is precisely what the incident violated.
    """
    before = yaml.safe_load(work.read_text())["organisms"][org]["preprocessing"]
    if pv.main(["--values", str(work), "bump", "--organisms", org]) != 0:
        pytest.skip(f"{org}: bump not applicable")
    entries = yaml.safe_load(work.read_text())["organisms"][org]["preprocessing"]
    assert len(entries) == len(before) + 1
    assert entries[-1]["configFile"] == entries[-2]["configFile"]
    assert entries[-1]["configFile"].get("segments")
    assert _run(work, "check", "--organisms", org) == 0


def test_bump_output_is_valid_yaml_and_only_versions_change(work):
    before = yaml.safe_load(work.read_text())
    assert _run(work, "bump", "--organisms", "measles") == 0
    after = yaml.safe_load(work.read_text())
    for org in before["organisms"]:
        if org != "measles":
            assert before["organisms"][org] == after["organisms"][org], org
    entries = after["organisms"]["measles"]["preprocessing"]
    assert [e["version"] for e in entries] == [[28], [29]]
    # The new entry must inherit the full config, not a shallow-merged fragment.
    assert entries[0]["configFile"] == entries[1]["configFile"]


def _check_configs(work: Path, configs: list[dict]) -> int:
    """Run the real run_check over a synthetic preprocessing list for one organism."""
    doc = pv.load(work)
    doc.resolved["organisms"]["andv"]["preprocessing"] = [
        {"version": [i + 1], "configFile": c} for i, c in enumerate(configs)
    ]
    doc.organisms["andv"].lineage_systems = []
    doc.organisms["andv"].items = []
    return pv.run_check(doc, ["andv"], allow_empty_segments=False)


def test_check_is_directional_newer_may_add_but_not_lose_keys(work, capsys):
    """Hand-editing a generated draft to *add* config is normal and must not fail CI.

    Only the reverse -- a newer entry losing a key an older one declares -- is the
    incident's signature, and that is what must be an error.
    """
    seg = {"segments": [{"name": "main"}]}

    assert _check_configs(work, [seg, {**seg, "batch_size": 5}]) == 0

    assert _check_configs(work, [{**seg, "batch_size": 5}, {"batch_size": 5}]) == 1
    err = capsys.readouterr().err
    assert "missing configFile key(s) ['segments']" in err
    assert "lower-version entry" in err


def test_bump_leaves_untouched_organisms_byte_identical(work):
    original = work.read_text().split("\n")
    doc_before = pv.load(work)
    assert _run(work, "bump", "--organisms", "andv") == 0
    after = work.read_text().split("\n")
    # Every line outside andv's block and the lineage block must be unchanged.
    org = doc_before.organisms["andv"]
    untouched_before = original[: org.prepro_key_line] + original[org.prepro_end :]
    doc_after = pv.load(work)
    o2 = doc_after.organisms["andv"]
    untouched_after = after[: o2.prepro_key_line] + after[o2.prepro_end :]
    assert untouched_before == untouched_after


def test_bump_dry_run_writes_nothing(work):
    before = work.read_text()
    assert _run(work, "bump", "--organisms", "dengue", "--dry-run") == 0
    assert work.read_text() == before


# ------------------------------------------------------------------------- prune


def test_prune_is_a_noop_when_there_is_nothing_to_do(work, capsys):
    """andv has one version and no stub, so prune has nothing to change."""
    assert _run(work, "prune", "--organisms", "andv") == 0
    assert "nothing to do" in capsys.readouterr().out


def test_prune_rebases_a_survivors_merge_key_off_the_doomed_entry(legacy):
    """mpox: entry 28 is `- <<: *mpoxPreprocessing`, an anchor on entry 27.

    Deleting 27 would orphan that merge key, and a merge key cannot be relocated the way
    a value alias can. All it supplies is what the global *preprocessing also supplies,
    so the survivor is re-pointed there and the collapse proceeds.
    """
    before = yaml.safe_load(legacy.read_text())["organisms"]["mpox"]["preprocessing"]
    v28 = next(e for e in before if e["version"] == [28])

    assert _run(legacy, "prune", "--organisms", "mpox") == 0

    doc = pv.load(legacy)
    org = doc.organisms["mpox"]
    assert org.versions == [28]
    assert org.active[0].merge_alias == "preprocessing"
    assert org.active[0].replicas == 1  # back to steady state from 3

    after = yaml.safe_load(legacy.read_text())["organisms"]["mpox"]["preprocessing"]
    assert len(after) == 1
    assert pv._config_signature(after[0]) == pv._config_signature(v28)
    assert len(after[0]["configFile"]["segments"][0]["references"][0]["genes"]) == 175
    assert sorted(doc.lineage["mpoxOutbreakLineage"]) == [28]
    assert "mpoxPreprocessing" not in "\n".join(doc.lines)


SYNTHETIC = """\
lineageSystemDefinitions: {}
defaultOrganismConfig: &defaultOrganismConfig
  preprocessing:
    - &preprocessing
      replicas: 1
      image: ghcr.io/loculus-project/preprocessing-nextclade
      args:
        - "prepro"
      configFile: &preprocessingConfigFile
        log_level: DEBUG
        batch_size: 100
organisms:
  testv:
    schema:
      metadata: []
    preprocessing:
      - &testvPreprocessing
        <<: *preprocessing
        replicas: 1
        version:
          - 30
        configFile:
          <<: *preprocessingConfigFile
          segments:
            - name: main
              references:
              - name: singleReference
                nextclade_dataset_tag: TAG-ONE
                genes: &testvGenes [A, B]
%s"""

NEWER_OVERRIDES_TAG = """\
      - <<: *testvPreprocessing
        replicas: 3
        version:
          - 31
        configFile:
          <<: *preprocessingConfigFile
          segments:
            - name: main
              references:
              - name: singleReference
                nextclade_dataset_tag: TAG-TWO
                genes: *testvGenes
"""

NEWER_INHERITS_CONFIG = """\
      - <<: *testvPreprocessing
        replicas: 3
        version:
          - 31
"""


def _synthetic(tmp_path: Path, tail: str, name: str = "s.yaml") -> Path:
    path = tmp_path / name
    path.write_text(SYNTHETIC % tail)
    return path


def test_prune_keeps_the_newer_tag_when_the_newer_entry_overrides_it(tmp_path):
    """v30 sets one dataset tag, v31 overrides it. The survivor must be v31's."""
    path = _synthetic(tmp_path, NEWER_OVERRIDES_TAG)
    assert _run(path, "prune") == 0
    entries = yaml.safe_load(path.read_text())["organisms"]["testv"]["preprocessing"]
    ref = entries[0]["configFile"]["segments"][0]["references"][0]
    assert [e["version"] for e in entries] == [[31]]
    assert ref["nextclade_dataset_tag"] == "TAG-TWO"
    assert ref["genes"] == ["A", "B"]  # inline flow-list anchor relocated with its value
    assert entries[0]["replicas"] == 1
    assert entries[0]["image"]  # not lost when the merge key was re-pointed


def test_prune_keeps_the_inherited_config_when_the_newer_entry_declares_none(tmp_path):
    """The dangerous direction: v31 inherits configFile wholesale, so segments live only
    on v30. Collapsing must not drop them."""
    path = _synthetic(tmp_path, NEWER_INHERITS_CONFIG)
    assert _run(path, "prune") == 0
    entries = yaml.safe_load(path.read_text())["organisms"]["testv"]["preprocessing"]
    assert [e["version"] for e in entries] == [[31]]
    assert len(entries[0]["configFile"]["segments"]) == 1
    assert entries[0]["configFile"]["segments"][0]["references"][0]["nextclade_dataset_tag"] == "TAG-ONE"
    assert entries[0]["replicas"] == 1


def test_a_refusal_aborts_the_whole_run(tmp_path, capsys):
    """One organism that cannot be handled must not leave the others half-done."""
    path = _synthetic(tmp_path, NEWER_OVERRIDES_TAG).with_name("multi.yaml")
    text = (SYNTHETIC % NEWER_OVERRIDES_TAG).replace(
        "      - &testvPreprocessing\n        <<: *preprocessing\n",
        '      - &testvPreprocessing\n        <<: *preprocessing\n        dockerTag: "pinned"\n',
    )
    path.write_text(text)
    before = path.read_text()
    assert _run(path, "prune") == 1
    err = capsys.readouterr().err
    assert "dockerTag" in err
    assert "nothing was written" in err
    assert path.read_text() == before


# ---------------------------------------------------------------- lineage systems


MULTI_LINEAGE = """\
lineageSystemDefinitions:
  testvL:
    30: https://example.invalid/L.yaml
  testvM:
    30: https://example.invalid/M.yaml
defaultOrganismConfig: &defaultOrganismConfig
  preprocessing:
    - &preprocessing
      replicas: 1
      image: img
      args: ["prepro"]
      configFile: &preprocessingConfigFile
        log_level: DEBUG
organisms:
  testv:
    schema:
      metadata:
        - name: lineageL
          lineageSystem: testvL
      metadataAdd:
        - name: lineageM
          lineageSystem: testvM
    preprocessing:
      - <<: *preprocessing
        version:
          - 30
        configFile:
          <<: *preprocessingConfigFile
          segments:
            - name: main
              references:
                - name: singleReference
                  nextclade_dataset_name: ds
                  nextclade_dataset_tag: TAG
"""


def test_an_organism_may_have_several_lineage_systems(tmp_path):
    """cchf already declares one system for one of three segments, so a second is
    plausible. Every lineage system must be kept in step, not just the first."""
    path = tmp_path / "multi.yaml"
    path.write_text(MULTI_LINEAGE)
    assert pv.load(path).organisms["testv"].lineage_systems == ["testvL", "testvM"]

    assert _run(path, "bump") == 0
    assert {k: sorted(v) for k, v in pv.load(path).lineage.items()} == {
        "testvL": [30, 31],
        "testvM": [30, 31],
    }

    assert _run(path, "prune") == 0
    assert {k: sorted(v) for k, v in pv.load(path).lineage.items()} == {
        "testvL": [31],
        "testvM": [31],
    }
    assert _run(path, "check") == 0


def test_check_covers_every_lineage_system_not_just_the_first(tmp_path, capsys):
    path = tmp_path / "multi.yaml"
    path.write_text(MULTI_LINEAGE.replace("  testvM:\n    30: https://example.invalid/M.yaml\n", ""))
    assert _run(path, "check") == 1
    assert "lineageSystemDefinitions has no 'testvM' key" in capsys.readouterr().err


# ------------------------------------------------------------------------ status


def test_status_reports_dataset_tags_and_lineage_urls(capsys):
    _run(VALUES, "status")
    out = capsys.readouterr().out
    assert "nextcladeDatasetTag" in out
    assert "2026-07-07--14-07-11Z" in out
    # The lineage URL in full: it is what SILO loads, and what you want to open.
    assert "definitions/mpox/2026-07-07--14-07-11Z/outbreak-lineages.yaml" in out
    # An organism naming a dataset but pinning no tag reads as unpinned, not blank.
    assert "unpinned" in out


def test_status_labels_dataset_tags_per_segment_when_they_differ(tmp_path, capsys):
    """Segments pin their datasets independently, so a bare list would not say which is
    which. When they all agree the label is noise, so it is left off."""
    path = tmp_path / "segs.yaml"
    path.write_text(
        MULTI_LINEAGE.replace(
            """            - name: main
              references:
                - name: singleReference
                  nextclade_dataset_name: ds
                  nextclade_dataset_tag: TAG
""",
            """            - name: L
              references:
                - name: singleReference
                  nextclade_dataset_name: ds/L
                  nextclade_dataset_tag: TAG-L
            - name: M
              references:
                - name: singleReference
                  nextclade_dataset_name: ds/M
""",
        )
    )
    _run(path, "status")
    out = capsys.readouterr().out
    assert "L:TAG-L" in out
    assert "M:unpinned" in out


def test_check_warns_about_an_unpinned_dataset(capsys):
    """A version is supposed to identify a config; an unpinned dataset breaks that."""
    _run(VALUES, "check", "--organisms", "cchf")
    assert "no nextclade_dataset_tag" in capsys.readouterr().out


# ----------------------------------------------------------------------- anchors


def test_anchors_come_from_the_yaml_scanner_not_a_regex(work):
    """The linkOut URLs are full of `&dataset-name=` query parameters. A regex reads
    those as anchor definitions; PyYAML's scanner knows they are inside a scalar."""
    doc = pv.load(work)
    assert "dataset" not in doc.anchors.defs
    assert "fastaUrl" not in doc.anchors.defs
    assert "preprocessing" in doc.anchors.defs
    assert doc.anchors.uses["preprocessing"]


def test_a_commented_out_alias_does_not_count_as_a_use(legacy):
    """A stub's `<<: *denguePreprocessing` is a comment, so the anchor is unused."""
    doc = pv.load(legacy)
    assert "denguePreprocessing" in doc.anchors.defs
    assert "denguePreprocessing" in doc.anchors.unused()


def test_prune_drops_anchors_nothing_aliases(legacy):
    """The rule: an anchor exists to be referenced, so prune removes any with no referent.

    Which anchors used to survive a prune was an accident of where the remaining text
    happened to sit; this makes it a decision instead.
    """
    before = yaml.safe_load(legacy.read_text())
    assert "denguePreprocessing" in pv.load(legacy).anchors.unused()

    # dengue has one version, so this prune only clears a stub and an unused anchor.
    assert _run(legacy, "prune", "--organisms", "dengue") == 0

    assert "denguePreprocessing" not in pv.load(legacy).anchors.defs
    # Purely cosmetic: nothing Helm renders may change.
    assert yaml.safe_load(legacy.read_text()) == before


def test_dropping_an_anchor_alone_on_a_dash_line_keeps_the_yaml_valid(legacy):
    """`- &denguePreprocessing` has the mapping on the following lines. Deleting the line
    would orphan it, so the next key is pulled up onto the dash."""
    assert _run(legacy, "prune", "--organisms", "dengue") == 0
    doc = pv.load(legacy)
    item = doc.organisms["dengue"].active[0]
    assert doc.lines[item.start] == "      - <<: *preprocessing"
    assert item.merge_alias == "preprocessing"


def test_an_anchor_may_not_share_the_dash_line_with_a_key(tmp_path, capsys):
    """`- &name key: value` looks like a tidy one-line form, but YAML binds the anchor to
    the key *scalar*: `*name` then resolves to the string "key". It parses without
    complaint, which is exactly why check has to catch it."""
    path = _synthetic(tmp_path, "")
    text = path.read_text().replace(
        "      - &testvPreprocessing\n        <<: *preprocessing\n",
        "      - &testvPreprocessing replicas: 1\n        <<: *preprocessing\n",
    )
    path.write_text(text)
    assert yaml.safe_load(text)  # parses happily -- that is the danger

    assert _run(path, "check") == 1
    assert "it binds the key, not the entry" in capsys.readouterr().err


def test_check_warns_about_an_unused_anchor(legacy, capsys):
    _run(legacy, "check", "--organisms", "dengue")
    assert "anchor &denguePreprocessing is defined but never aliased" in capsys.readouterr().out


def test_prune_refuses_to_rebase_when_the_doomed_entry_supplies_more(legacy, capsys):
    """If the entry being removed provides something *preprocessing does not, the merge
    key cannot be re-pointed and the tool must decline rather than silently drop it."""
    lines = pv.load(legacy).lines
    anchor_line = next(i for i, l in enumerate(lines) if l.strip() == "- &mpoxPreprocessing")
    lines.insert(anchor_line + 2, '        dockerTag: "pinned-for-this-organism"')
    legacy.write_text("\n".join(lines))

    assert _run(legacy, "prune", "--organisms", "mpox") != 0
    err = capsys.readouterr().err
    assert "dockerTag" in err and "global *preprocessing does not supply" in err


def test_bump_then_prune_returns_to_a_single_entry(work):
    assert _run(work, "bump", "--organisms", "measles") == 0
    assert _versions(work, "measles") == [28, 29]
    assert _run(work, "prune", "--organisms", "measles") == 0
    org = pv.load(work).organisms["measles"]
    assert org.versions == [29]
    assert len(org.active) == 1
    assert org.active[0].replicas == 1  # back down from the bump's 3
    assert org.stubs == []  # clean add/remove, no commented-out leftovers
    assert _run(work, "check", "--organisms", "measles") == 0


def test_bump_then_prune_in_append_mode(work):
    assert _run(work, "bump", "--organisms", "andv", "--mode", "append") == 0
    assert _versions(work, "andv") == [8, 9]
    assert _run(work, "prune", "--organisms", "andv") == 0
    assert _versions(work, "andv") == [9]


def _add_lineage_key(path: Path, system: str, version: int) -> None:
    lines = path.read_text().split("\n")
    i = next(i for i, l in enumerate(lines) if l == f"  {system}:")
    lines.insert(i + 1, f"    {version}: https://example.invalid/{system}.yaml")
    path.write_text("\n".join(lines))


def test_prune_clears_a_stale_lineage_key_on_a_single_version_organism(work, capsys):
    """Regression: prune used to bail out before the lineage sweep whenever there was
    only one version, so a stale key could never be removed -- while `check` went on
    reporting it. A key can outlive its entry via a skipped prune or a hand edit."""
    _add_lineage_key(work, "marburg", 25)
    assert pv.load(work).organisms["marburg"].versions == [26]
    assert sorted(pv.load(work).lineage["marburg"]) == [25, 26]

    assert _run(work, "prune", "--organisms", "marburg") == 0
    assert "nothing to do" not in capsys.readouterr().out
    assert sorted(pv.load(work).lineage["marburg"]) == [26]


def test_prune_clears_a_stale_lineage_key_above_the_current_version(work):
    """`< keep_version` missed these; the rule is "not used by a surviving entry"."""
    _add_lineage_key(work, "marburg", 99)
    assert _run(work, "prune", "--organisms", "marburg") == 0
    assert sorted(pv.load(work).lineage["marburg"]) == [26]


def test_prune_keeps_lineage_keys_for_versions_still_deployed(work):
    """ebola-sudan-style multi-version entries: every live version keeps its key."""
    assert _run(work, "bump", "--organisms", "hmpv", "--mode", "append") == 0
    assert pv.load(work).organisms["hmpv"].versions == [25, 26]
    assert sorted(pv.load(work).lineage["hmpv"]) == [25, 26]
    assert _run(work, "check", "--organisms", "hmpv") == 0


def test_prune_drops_stale_lineage_versions(work):
    assert _run(work, "bump", "--organisms", "hmpv") == 0
    assert sorted(pv.load(work).lineage["hmpv"]) == [25, 26]
    assert _run(work, "prune", "--organisms", "hmpv") == 0
    assert sorted(pv.load(work).lineage["hmpv"]) == [26]


def test_prune_removes_stubs_by_default(work):
    assert _run(work, "bump", "--organisms", "rsv-a") == 0
    assert _run(work, "prune", "--organisms", "rsv-a") == 0
    org = pv.load(work).organisms["rsv-a"]
    assert org.versions == [24]
    assert len(org.stubs) == 0


def test_prune_clears_a_preexisting_stale_stub(legacy):
    assert len(pv.load(legacy).organisms["dengue"].stubs) == 1
    assert _run(legacy, "prune", "--organisms", "dengue") == 0
    org = pv.load(legacy).organisms["dengue"]
    assert org.stubs == [] and org.versions == [32]


# ------------------------------------------------------------- expand (flattened)


def test_expand_bump_spells_out_the_config_for_hand_editing(work):
    """The reason to bump is usually a new nextclade dataset tag, which means the new
    entry needs its own full configFile -- a merge key would replace, not deep-merge."""
    assert _run(work, "bump", "--organisms", "measles", "--expand-organisms", "measles") == 0
    entries = yaml.safe_load(work.read_text())["organisms"]["measles"]["preprocessing"]
    assert [e["version"] for e in entries] == [[28], [29]]
    assert entries[0]["configFile"] == entries[1]["configFile"]
    doc = pv.load(work)
    new = doc.organisms["measles"].active[-1]
    body = "\n".join(doc.lines[new.start : new.end])
    assert "nextclade_dataset_tag" in body  # editable in place, not hidden behind a merge
    assert new.merge_alias == "preprocessing"  # independent of its sibling


def test_expand_duplicates_short_lists_but_anchors_long_ones(work):
    assert _run(work, "bump", "--organisms", "measles,mpox", "--expand-organisms", "measles,mpox") == 0
    doc = pv.load(work)
    measles = doc.organisms["measles"].active[-1]
    mpox = doc.organisms["mpox"].active[-1]
    # measles: 8 genes on one line -> duplicated inline.
    assert "genes: [" in "\n".join(doc.lines[measles.start : measles.end])
    # mpox: 175 genes -> aliased rather than copied, so the entry stays small.
    assert "genes: *mpoxGenes" in "\n".join(doc.lines[mpox.start : mpox.end])
    assert mpox.end - mpox.start < 30


def test_expand_then_prune_relocates_the_gene_anchor(work):
    """The case the whole anchor-relocation path exists for.

    mpox's ~175-name gene list is anchored on an entry prune deletes, so the definition
    has to move into the survivor -- and the survivor must resolve identically.
    """
    before = yaml.safe_load(work.read_text())["organisms"]["mpox"]["preprocessing"]
    keep_cfg = next(e for e in before if e["version"] == [28])["configFile"]

    assert _run(work, "bump", "--organisms", "mpox", "--expand-organisms", "mpox") == 0
    assert _run(work, "prune", "--organisms", "mpox") == 0

    entries = yaml.safe_load(work.read_text())["organisms"]["mpox"]["preprocessing"]
    assert len(entries) == 1
    assert entries[0]["version"] == [29]
    assert entries[0]["configFile"] == keep_cfg
    assert len(entries[0]["configFile"]["segments"][0]["references"][0]["genes"]) == 175

    doc = pv.load(work)
    text = "\n".join(doc.lines)
    # The values moved into the survivor; the anchor name went with them and was then
    # dropped, because after the collapse there is nothing left to alias it.
    assert "genes:" in text
    assert "mpoxGenes" not in text
    assert "mpoxPreprocessing" not in text
    assert _run(work, "check", "--organisms", "mpox") == 0


def test_prune_restores_steady_state_replicas_after_an_expand_bump(work):
    assert _run(work, "bump", "--organisms", "rsv-a", "--expand-organisms", "rsv-a", "--replicas", "4") == 0
    assert pv.load(work).organisms["rsv-a"].active[-1].replicas == 4
    assert _run(work, "prune", "--organisms", "rsv-a") == 0
    org = pv.load(work).organisms["rsv-a"]
    assert org.versions == [24]
    assert org.active[0].replicas == 1


def test_anchor_threshold_is_configurable(work):
    """Raising the threshold above a list's length duplicates it instead of aliasing.

    Uses ebola-bdbv, whose highest entry *defines* its gene list rather than inheriting
    an alias, so both branches are reachable.
    """
    assert (
        _run(
            work,
            "bump",
            "--organisms",
            "ebola-bdbv",
            "--expand-organisms",
            "ebola-bdbv",
            "--anchor-threshold",
            "1",
        )
        == 0
    )
    entries = yaml.safe_load(work.read_text())["organisms"]["ebola-bdbv"]["preprocessing"]
    assert entries[-1]["configFile"] == entries[-2]["configFile"]


def test_expand_copy_never_redefines_an_anchor(work):
    """YAML lets an anchor be redefined, and later aliases bind to the newer node.

    A duplicated block must therefore drop the source's `&name`, or an alias sitting
    between the two would silently start pointing somewhere else.
    """
    for org in ALL_ORGANISMS:
        w = work.with_name(f"{org}.yaml")
        w.write_text(_blob(BASE_COMMIT))
        if (
            pv.main(
                [
                    "--values",
                    str(w),
                    "bump",
                    "--organisms",
                    org,
                    "--expand-organisms",
                    org,
                    "--anchor-threshold",
                    "10000",
                ]
            )
            != 0
        ):
            continue
        doc = pv.load(w)
        new = doc.organisms[org].active[-1]
        defined = re.findall(r"(?<![\w*])&(\w+)", "\n".join(doc.lines[new.start : new.end]))
        assert defined == [], f"{org}: generated entry redefines {defined}"


def test_prune_keeps_versions_ascending_so_deployment_indices_are_stable(work):
    """Deployment names embed the flattened index; out-of-order versions renumber them."""
    assert _run(work, "bump", "--organisms", "rsv-b") == 0
    assert _run(work, "prune", "--organisms", "rsv-b") == 0
    entries = yaml.safe_load(work.read_text())["organisms"]["rsv-b"]["preprocessing"]
    flat = [v for e in entries for v in (e["version"] if isinstance(e["version"], list) else [e["version"]])]
    assert flat == sorted(flat)


# -------------------------------------------------------------------------- misc


def test_unknown_organism_is_rejected(work):
    assert _run(work, "bump", "--organisms", "nosuchvirus") == 2


def test_scoping_leaves_other_organisms_alone(work):
    before = yaml.safe_load(work.read_text())
    assert _run(work, "bump", "--organisms", "dengue,rsv-a") == 0
    after = yaml.safe_load(work.read_text())
    changed = {o for o in before["organisms"] if before["organisms"][o] != after["organisms"][o]}
    assert changed == {"dengue", "rsv-a"}


def test_benign_formatting_does_not_trip_the_cross_check(work):
    text = work.read_text().replace(
        "    preprocessing:\n      - &denguePreprocessing",
        "    preprocessing:\n\n      - &denguePreprocessing",
        1,
    )
    work.write_text(text)
    pv.load(work)  # a blank line is fine
    text = work.read_text().replace("      - &denguePreprocessing\n", "      - &denguePreprocessing  \n", 1)
    work.write_text(text)
    pv.load(work)  # trailing whitespace is fine


def test_layout_drift_raises_rather_than_mis_editing(work):
    """The guard that justifies editing this file textually at all.

    If the indentation the line scanner assumes ever changes, every edit below it
    would be unsafe -- so load() cross-checks its textual scan against the parsed
    document and refuses rather than proceeding on a partial view.
    """
    lines = work.read_text().split("\n")
    org = pv.load(work).organisms["dengue"]
    for i in range(org.prepro_key_line + 1, org.prepro_end):
        if lines[i].strip():
            lines[i] = "  " + lines[i]  # re-indent the whole list by 2
    lines[org.prepro_key_line] = "    preprocessing:"
    work.write_text("\n".join(lines))
    with pytest.raises(pv.Problem, match="textual scan"):
        pv.load(work)


def test_version_mismatch_between_scan_and_parser_raises(work, monkeypatch):
    real = pv._parse_item

    def lying(lines, start, end, commented):
        item = real(lines, start, end, commented)
        if item.versions == [32]:
            item.versions = [99]
        return item

    monkeypatch.setattr(pv, "_parse_item", lying)
    with pytest.raises(pv.Problem, match="Refusing to edit"):
        pv.load(work)


if __name__ == "__main__":
    # Each test re-parses a 4000-line file, so this is embarrassingly parallel.
    extra = sys.argv[1:] or ["-n", "auto"]
    sys.exit(pytest.main([__file__, "-q", *extra]))
