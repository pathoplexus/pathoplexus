#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["PyYAML>=6.0", "pytest>=8"]
# ///
"""Tests for pipeline_versions.py.

Run with:  uv run scripts/test_pipeline_versions.py

Fixtures come from the repo's own git history, so the tests assert against real
configurations rather than invented ones. The most important case is
``test_check_catches_the_mpox_incident``: commit 9764d15 is the config that was live
in production during the 2026-08-05 mpox incident.
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

import pytest
import yaml

sys.path.insert(0, str(Path(__file__).parent))
import pipeline_versions as pv  # noqa: E402

REPO = Path(__file__).resolve().parent.parent
VALUES = REPO / "loculus_values" / "values.yaml"

INCIDENT_COMMIT = "9764d15"  # segment-less mpox v27 -- what production was serving
PRE_INCIDENT_COMMIT = "1c04032"  # a clean prune, before the two-entry migration


def _at(commit: str, tmp_path: Path) -> Path:
    blob = subprocess.run(
        ["git", "-C", str(REPO), "show", f"{commit}:loculus_values/values.yaml"],
        capture_output=True, text=True, check=True,
    ).stdout
    path = tmp_path / f"{commit}.yaml"
    path.write_text(blob)
    return path


@pytest.fixture
def work(tmp_path: Path) -> Path:
    path = tmp_path / "values.yaml"
    path.write_text(VALUES.read_text())
    return path


def _run(path: Path, *args: str) -> int:
    return pv.main(["--values", str(path), *args])


def _versions(path: Path, org: str) -> list[int]:
    return pv.load(path).organisms[org].versions


# ------------------------------------------------------------------------- check


def test_check_passes_on_head():
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
        "definitions/mpox/2026-07-07--14-07-11Z/outbreak-lineages.yaml\n", "", 1)
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


def test_check_warns_about_stale_stubs(capsys):
    _run(VALUES, "check")
    out = capsys.readouterr().out
    assert "dengue: commented-out stub declares version [32] which is already active" in out


# -------------------------------------------------------------------------- bump


def test_bump_reuses_the_commented_stub_and_overwrites_its_stale_version(work):
    before = work.read_text()
    assert _run(work, "bump", "--organisms", "dengue") == 0
    assert _versions(work, "dengue") == [32, 33]
    # The stub was replaced in place, not appended alongside.
    assert before.count("# - <<: *denguePreprocessing") == 1
    assert "# - <<: *denguePreprocessing" not in work.read_text()
    assert len(pv.load(work).organisms["dengue"].stubs) == 0


def test_bump_keeps_the_stubs_deliberate_replica_count(work):
    """west-nile and hmpv chose 2, not the default 3."""
    assert _run(work, "bump", "--organisms", "west-nile") == 0
    new = max(pv.load(work).organisms["west-nile"].active, key=lambda i: i.max_version)
    assert new.replicas == 2


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


def test_bump_avoids_an_anchor_name_collision(work):
    """yellow-fever's obvious name is taken by west-nile's misnamed anchor."""
    assert _run(work, "bump", "--organisms", "yellow-fever") == 0
    assert pv.load(work).organisms["yellow-fever"].active[0].anchor == "yellowFeverPreprocessingV31"


def test_bump_adds_the_lineage_version_key(work):
    assert _run(work, "bump", "--organisms", "mpox") == 0
    assert 29 in pv.load(work).lineage.entries["mpoxOutbreakLineage"]


def test_bump_append_mode_extends_the_version_list(work):
    assert _run(work, "bump", "--organisms", "cchf", "--mode", "append") == 0
    org = pv.load(work).organisms["cchf"]
    assert len(org.active) == 1
    assert org.versions == [25, 26]


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


def test_bump_leaves_untouched_organisms_byte_identical(work):
    original = work.read_text().split("\n")
    doc_before = pv.load(work)
    assert _run(work, "bump", "--organisms", "andv") == 0
    after = work.read_text().split("\n")
    # Every line outside andv's block and the lineage block must be unchanged.
    org = doc_before.organisms["andv"]
    untouched_before = original[:org.prepro_key_line] + original[org.prepro_end:]
    doc_after = pv.load(work)
    o2 = doc_after.organisms["andv"]
    untouched_after = after[:o2.prepro_key_line] + after[o2.prepro_end:]
    assert untouched_before == untouched_after


def test_bump_dry_run_writes_nothing(work):
    before = work.read_text()
    assert _run(work, "bump", "--organisms", "dengue", "--dry-run") == 0
    assert work.read_text() == before


# ------------------------------------------------------------------------- prune


def test_prune_is_a_noop_when_nothing_is_outdated(work, capsys):
    assert _run(work, "prune", "--organisms", "dengue") == 0
    assert "nothing to do" in capsys.readouterr().out


def test_prune_refuses_the_mpox_block(work, capsys):
    """Entry 28 aliases *mpoxPreprocessing and inherits gene lists from entry 27.

    Collapsing that automatically is exactly the anchor surgery that caused the
    incident, so the tool must decline and say why.
    """
    assert _run(work, "prune", "--organisms", "mpox") != 0
    assert "do not share the same config" in capsys.readouterr().err


def test_bump_then_prune_returns_to_a_single_entry(work):
    assert _run(work, "bump", "--organisms", "measles") == 0
    assert _versions(work, "measles") == [28, 29]
    assert _run(work, "prune", "--organisms", "measles") == 0
    org = pv.load(work).organisms["measles"]
    assert org.versions == [29]
    assert len(org.active) == 1
    assert org.active[0].replicas == 1  # back down from the bump's 3
    assert len(org.stubs) == 1  # template kept for next time
    assert _run(work, "check", "--organisms", "measles") == 0


def test_bump_then_prune_in_append_mode(work):
    assert _run(work, "bump", "--organisms", "andv", "--mode", "append") == 0
    assert _versions(work, "andv") == [8, 9]
    assert _run(work, "prune", "--organisms", "andv") == 0
    assert _versions(work, "andv") == [9]


def test_prune_drops_stale_lineage_versions(work):
    assert _run(work, "bump", "--organisms", "hmpv") == 0
    assert sorted(pv.load(work).lineage.entries["hmpv"]) == [25, 26]
    assert _run(work, "prune", "--organisms", "hmpv") == 0
    assert sorted(pv.load(work).lineage.entries["hmpv"]) == [26]


def test_prune_delete_mode_removes_the_stub(work):
    assert _run(work, "bump", "--organisms", "rsv-a") == 0
    assert _run(work, "prune", "--organisms", "rsv-a", "--delete") == 0
    org = pv.load(work).organisms["rsv-a"]
    assert org.versions == [24]
    assert len(org.stubs) == 0


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


def test_layout_drift_is_detected_not_silently_mis_edited(work):
    """The textual scan is cross-checked against the parser on every load."""
    text = work.read_text().replace(
        "    preprocessing:\n      - &denguePreprocessing",
        "    preprocessing:\n\n      - &denguePreprocessing", 1)
    work.write_text(text)
    pv.load(work)  # a blank line is fine
    text = work.read_text().replace("      - &denguePreprocessing\n", "      - &denguePreprocessing  \n", 1)
    work.write_text(text)
    pv.load(work)  # trailing whitespace is fine


if __name__ == "__main__":
    sys.exit(pytest.main([__file__, "-q", *sys.argv[1:]]))
