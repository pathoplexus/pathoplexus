#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["PyYAML>=6.0"]
# ///
"""Manage preprocessing pipeline versions in loculus_values/values.yaml.

Three subcommands:

  status  Show each organism's pipeline versions, replicas, anchors and lineage keys.
  bump    Add the next pipeline version for an organism (keeps the current one running).
  prune   Drop superseded pipeline versions, keeping only the highest.
  check   Assert the invariants that a hand edit can silently violate. Meant for CI.

Why this exists
---------------
On 2026-08-05 a hand-written mpox bump re-declared ``configFile:`` under a second
pipeline entry without repeating ``segments:``. YAML merge keys are shallow, so the
segment list was dropped rather than inherited; the pipeline then aligned nothing,
could not emit an alignment error, "successfully" processed every entry, and was
promoted to current -- destroying clade/lineage/mutation data for all 17k mpox
records and deadlocking any future version bump.

``check`` catches that class of bug with no domain knowledge: it compares the
*resolved* configFile key sets across an organism's pipeline entries.

Editing model
-------------
All mutations are line splices against the original text. The file is parsed only to
locate blocks and to compute the resolved (merge-key-expanded) view. Round-tripping
the whole document through a YAML dumper is deliberately avoided: it normalises
sequence indentation, strips ``[ "a", "b" ]`` inner spacing, displaces end-of-line
comments, and -- worst -- silently relocates an anchor definition when the node
carrying it is deleted, rewriting distant parts of the document.
"""

from __future__ import annotations

import argparse
import difflib
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

import yaml

DEFAULT_VALUES = "loculus_values/values.yaml"

# Indentation of the organisms.<org>.preprocessing list items. The file is uniform
# here; _locate() asserts its textual scan against the parsed document, so a layout
# change surfaces as a hard error rather than a silent mis-edit.
ITEM_INDENT = 6
KEY_INDENT = 8


class Problem(Exception):
    """A condition the tool refuses to guess its way through."""


# --------------------------------------------------------------------------- model


@dataclass
class Item:
    """One entry of an organism's ``preprocessing:`` list, located textually."""

    start: int  # 0-based, inclusive: the "- " line
    end: int  # 0-based, exclusive
    commented: bool
    versions: list[int]
    version_key_line: int | None  # line of "version:"
    version_value_lines: list[int]  # lines of the "- N" entries, parallel to versions
    replicas: int | None
    replicas_line: int | None
    anchor: str | None  # "&name" defined on this item
    merge_alias: str | None  # "<<: *name" at the item's top level
    has_own_config_file: bool
    inner_anchors: list[str]  # anchors defined anywhere inside this item

    @property
    def max_version(self) -> int:
        return max(self.versions)


@dataclass
class Organism:
    name: str
    prepro_key_line: int  # line of "preprocessing:"
    prepro_end: int  # exclusive
    items: list[Item]
    lineage_systems: list[str] = field(default_factory=list)

    @property
    def active(self) -> list[Item]:
        return [i for i in self.items if not i.commented]

    @property
    def stubs(self) -> list[Item]:
        return [i for i in self.items if i.commented]

    @property
    def versions(self) -> list[int]:
        return sorted(v for i in self.active for v in i.versions)

    @property
    def max_version(self) -> int:
        return max(self.versions)


@dataclass
class LineageBlock:
    """``lineageSystemDefinitions:`` -- a map of system name -> {version: url}."""

    entries: dict[str, dict[int, tuple[int, str]]]  # system -> version -> (line, url)


@dataclass
class Doc:
    path: Path
    lines: list[str]
    resolved: dict
    organisms: dict[str, Organism]
    lineage: LineageBlock


# ------------------------------------------------------------------------ locating


def _strip_comment(line: str) -> str:
    """Turn a commented-out stub line back into what it would be if uncommented."""
    m = re.match(r"^(\s*)# ?(.*)$", line)
    if not m:
        return line
    return m.group(1) + m.group(2)


def _is_item_start(line: str) -> tuple[bool, bool]:
    """Return (is_item_start, is_commented)."""
    if re.match(rf"^ {{{ITEM_INDENT}}}- \S", line):
        return True, False
    if re.match(rf"^ {{{ITEM_INDENT}}}# ?- \S", line):
        return True, True
    return False, False


def _parse_item(lines: list[str], start: int, end: int, commented: bool) -> Item:
    body = [_strip_comment(l) if commented else l for l in lines[start:end]]

    versions: list[int] = []
    version_key_line: int | None = None
    version_value_lines: list[int] = []
    replicas: int | None = None
    replicas_line: int | None = None
    anchor: str | None = None
    merge_alias: str | None = None
    has_own_config_file = False
    inner_anchors: list[str] = []

    # The anchor and/or merge key may sit on the "- " line itself.
    head = body[0][ITEM_INDENT + 2 :]
    if m := re.match(r"^&(\w+)\s*$", head):
        anchor = m.group(1)
    elif m := re.match(r"^<<:\s*\*(\w+)\s*$", head):
        merge_alias = m.group(1)
    elif m := re.match(r"^&(\w+)\s+<<:\s*\*(\w+)\s*$", head):
        anchor, merge_alias = m.group(1), m.group(2)

    for off, raw in enumerate(body):
        lineno = start + off
        # Normalise the "- " lead-in so the first line's key parses like the rest.
        text = raw
        if off == 0:
            text = " " * (ITEM_INDENT + 2) + head

        for am in re.finditer(r"(?<![\w*])&(\w+)", text):
            inner_anchors.append(am.group(1))

        if re.match(rf"^ {{{KEY_INDENT}}}<<:\s*\*(\w+)", text) and merge_alias is None:
            merge_alias = re.match(rf"^ {{{KEY_INDENT}}}<<:\s*\*(\w+)", text).group(1)
        if re.match(rf"^ {{{KEY_INDENT}}}configFile:", text):
            has_own_config_file = True
        if m := re.match(rf"^ {{{KEY_INDENT}}}replicas:\s*(\d+)\s*$", text):
            replicas, replicas_line = int(m.group(1)), lineno
        if m := re.match(rf"^ {{{KEY_INDENT}}}version:\s*(.*)$", text):
            version_key_line = lineno
            rest = m.group(1).strip()
            if m2 := re.match(r"^\[([^\]]*)\]$", rest):  # flow list
                versions = [int(x) for x in m2.group(1).replace(",", " ").split()]
                version_value_lines = [lineno] * len(versions)
            elif rest and rest.isdigit():  # scalar
                versions = [int(rest)]
                version_value_lines = [lineno]
        elif version_key_line is not None and not versions:
            if m := re.match(rf"^ {{{KEY_INDENT + 2}}}-\s*(\d+)\s*$", text):
                pass  # handled below, keeps the block-list branch in one place

    # Block-list versions: collect the "- N" lines that directly follow "version:".
    if version_key_line is not None and not versions:
        for off in range(version_key_line - start + 1, len(body)):
            text = body[off]
            if m := re.match(rf"^ {{{KEY_INDENT + 2}}}-\s*(\d+)\s*$", text):
                versions.append(int(m.group(1)))
                version_value_lines.append(start + off)
            else:
                break

    return Item(
        start=start,
        end=end,
        commented=commented,
        versions=versions,
        version_key_line=version_key_line,
        version_value_lines=version_value_lines,
        replicas=replicas,
        replicas_line=replicas_line,
        anchor=anchor,
        merge_alias=merge_alias,
        has_own_config_file=has_own_config_file,
        inner_anchors=inner_anchors,
    )


def _locate_organisms(lines: list[str], resolved: dict) -> dict[str, Organism]:
    organisms: dict[str, Organism] = {}
    in_organisms = False
    current: str | None = None

    for i, line in enumerate(lines):
        if re.match(r"^organisms:\s*$", line):
            in_organisms = True
            continue
        if not in_organisms:
            continue
        if line and not line[0].isspace() and not line.startswith("#"):
            break  # left the organisms block
        if m := re.match(r"^  ([a-zA-Z0-9_-]+):\s*$", line):
            current = m.group(1)
            continue
        if current and re.match(r"^    preprocessing:\s*$", line):
            organisms[current] = _locate_prepro(lines, current, i)

    for name, org in organisms.items():
        # Organisms declare their lineage system on a metadata field, and the field may
        # live in either the inherited `metadata` list or the per-organism `metadataAdd`.
        schema = resolved["organisms"][name].get("schema", {})
        systems = set()
        for key in ("metadata", "metadataAdd"):
            for fld in schema.get(key) or []:
                if isinstance(fld, dict) and fld.get("lineageSystem"):
                    systems.add(fld["lineageSystem"])
        org.lineage_systems = sorted(systems)
    return organisms


def _locate_prepro(lines: list[str], org: str, key_line: int) -> Organism:
    # The list runs until a line at indent <= 4 that is not blank and not part of it.
    end = len(lines)
    for j in range(key_line + 1, len(lines)):
        line = lines[j]
        if not line.strip():
            continue
        indent = len(line) - len(line.lstrip())
        if indent <= 4:
            end = j
            break

    starts: list[tuple[int, bool]] = []
    for j in range(key_line + 1, end):
        is_start, commented = _is_item_start(lines[j])
        if is_start:
            starts.append((j, commented))

    items: list[Item] = []
    for idx, (start, commented) in enumerate(starts):
        stop = starts[idx + 1][0] if idx + 1 < len(starts) else end
        # Trim trailing blank lines out of the item's span.
        while stop > start + 1 and not lines[stop - 1].strip():
            stop -= 1
        items.append(_parse_item(lines, start, stop, commented))

    return Organism(name=org, prepro_key_line=key_line, prepro_end=end, items=items)


def _locate_lineage(lines: list[str]) -> LineageBlock:
    entries: dict[str, dict[int, tuple[int, str]]] = {}
    start = None
    for i, line in enumerate(lines):
        if re.match(r"^lineageSystemDefinitions:\s*$", line):
            start = i
            break
    if start is None:
        return LineageBlock(entries={})

    system: str | None = None
    for j in range(start + 1, len(lines)):
        line = lines[j]
        if not line.strip():
            continue
        if not line[0].isspace():
            break
        if m := re.match(r"^  ([a-zA-Z0-9_-]+):\s*$", line):
            system = m.group(1)
            entries[system] = {}
        elif system and (m := re.match(r"^    (\d+):\s*(\S+)\s*$", line)):
            entries[system][int(m.group(1))] = (j, m.group(2))
    return LineageBlock(entries=entries)


def load(path: Path) -> Doc:
    text = path.read_text()
    lines = text.split("\n")
    resolved = yaml.safe_load(text)
    organisms = _locate_organisms(lines, resolved)

    # Cross-check the textual scan against the parsed document. If these disagree the
    # file's layout has drifted from what the line scanner assumes, and every edit
    # below would be unsafe.
    for name, org in organisms.items():
        parsed = resolved["organisms"][name].get("preprocessing", [])
        if len(parsed) != len(org.active):
            raise Problem(
                f"{name}: textual scan found {len(org.active)} active pipeline "
                f"entries but the parser found {len(parsed)}. The values.yaml layout "
                f"has changed; this tool needs updating before it is safe to use."
            )
        for item, pitem in zip(org.active, parsed):
            pv = pitem.get("version")
            pv = pv if isinstance(pv, list) else [pv]
            if sorted(item.versions) != sorted(pv):
                raise Problem(
                    f"{name}: textual scan read versions {item.versions} but the "
                    f"parser read {pv}. Refusing to edit."
                )
    missing = set(resolved.get("organisms", {})) - set(organisms)
    if missing:
        raise Problem(f"organisms with no locatable preprocessing block: {sorted(missing)}")

    return Doc(
        path=path,
        lines=lines,
        resolved=resolved,
        organisms=organisms,
        lineage=_locate_lineage(lines),
    )


# ------------------------------------------------------------------------- editing


@dataclass
class Edit:
    """Replace lines [start, end) with `new`. Applied bottom-up."""

    start: int
    end: int
    new: list[str]
    note: str


def apply_edits(lines: list[str], edits: list[Edit]) -> list[str]:
    out = list(lines)
    for e in sorted(edits, key=lambda e: e.start, reverse=True):
        out[e.start : e.end] = e.new
    return out


def _camel(org: str) -> str:
    head, *rest = org.split("-")
    return head + "".join(p.capitalize() for p in rest)


def _resolved_entries(doc: Doc, org: str) -> list[dict]:
    return doc.resolved["organisms"][org].get("preprocessing", [])


def _config_signature(entry: dict) -> dict:
    """Everything about a pipeline entry that is not version or replicas."""
    return {k: v for k, v in entry.items() if k not in ("version", "replicas")}


# ---------------------------------------------------------------------------- bump


DEFAULT_BUMP_REPLICAS = 3


def plan_bump(doc: Doc, org_name: str, mode: str, replicas: int | None) -> list[Edit]:
    org = doc.organisms[org_name]
    if not org.active:
        raise Problem(f"{org_name}: no active preprocessing entries")

    new_version = org.max_version + 1
    target = max(org.active, key=lambda i: i.max_version)
    edits: list[Edit] = []

    if mode == "append":
        # Same config, same replicas: the chart's flattenPreprocessingVersions expands
        # a version list into one identical Deployment per version.
        if target.version_key_line is None:
            raise Problem(f"{org_name}: no 'version:' key found on the highest entry")
        if len(target.version_value_lines) != len(target.versions):
            raise Problem(f"{org_name}: cannot edit this 'version:' form in append mode")
        if target.version_value_lines and target.version_value_lines[0] != target.version_key_line:
            last = max(target.version_value_lines)
            edits.append(
                Edit(last + 1, last + 1, [f"{' ' * (KEY_INDENT + 2)}- {new_version}"],
                     f"{org_name}: version {new_version} appended to existing entry")
            )
        else:  # scalar or flow form -> rewrite as a block list
            edits.append(
                Edit(
                    target.version_key_line,
                    target.version_key_line + 1,
                    [f"{' ' * KEY_INDENT}version:"]
                    + [f"{' ' * (KEY_INDENT + 2)}- {v}" for v in target.versions + [new_version]],
                    f"{org_name}: version list rewritten as a block list, {new_version} added",
                )
            )
    else:  # mode == "entry"
        anchor = target.anchor
        if anchor is None:
            # The new entry must alias the current one, so the current one needs a name.
            # This is the one unavoidable touch to the entry we are otherwise leaving alone.
            # Names collide in two ways: an earlier entry of this organism already took
            # the obvious name (mpox), or another organism did -- west-nile's anchor is
            # misnamed &yellowFeverPreprocessing. Qualify by version rather than fail.
            taken = _all_anchors(doc.lines)
            anchor = f"{_camel(org_name)}Preprocessing"
            if anchor in taken:
                anchor = f"{anchor}V{target.max_version}"
            if anchor in taken:
                raise Problem(f"{org_name}: cannot derive a free anchor name (tried '{anchor}')")
            head = doc.lines[target.start][ITEM_INDENT + 2 :]
            edits.append(
                Edit(
                    target.start,
                    target.start + 1,
                    [f"{' ' * ITEM_INDENT}- &{anchor}", f"{' ' * KEY_INDENT}{head}"],
                    f"{org_name}: added anchor &{anchor} to the existing entry "
                    f"(needed so the new entry can inherit from it)",
                )
            )

        stub = next((s for s in org.stubs if s.merge_alias == anchor), None)
        if stub is None and org.stubs:
            stub = org.stubs[-1]

        # The stub's *version* is stale by construction and must never be trusted. Its
        # *replicas* is a deliberate past choice about reprocessing capacity for this
        # organism (west-nile and hmpv use 2, not 3), so inherit it unless overridden.
        n_replicas = replicas
        if n_replicas is None:
            n_replicas = stub.replicas if stub and stub.replicas else DEFAULT_BUMP_REPLICAS

        block = [
            f"{' ' * ITEM_INDENT}- <<: *{anchor}",
            f"{' ' * KEY_INDENT}replicas: {n_replicas}",
            f"{' ' * KEY_INDENT}version:",
            f"{' ' * (KEY_INDENT + 2)}- {new_version}",
        ]

        if stub is not None:
            # Reuse the commented-out template the repo leaves behind after a prune.
            # Its version/replicas are stale by construction -- dengue's stub says
            # version 32 while dengue is *at* 32 -- so they are always overwritten,
            # never trusted. A duplicate version makes helm fail outright.
            edits.append(
                Edit(stub.start, stub.end, block,
                     f"{org_name}: uncommented the existing stub as version {new_version} "
                     f"with replicas {n_replicas} (stub said version {stub.versions or '?'}, "
                     f"which is stale and was overwritten)")
            )
        else:
            edits.append(
                Edit(target.end, target.end, block,
                     f"{org_name}: added entry for version {new_version} with replicas {n_replicas}")
            )

    edits += _plan_lineage_bump(doc, org, new_version)
    return edits


def _plan_lineage_bump(doc: Doc, org: Organism, new_version: int) -> list[Edit]:
    """Add the new version key to lineageSystemDefinitions.

    SILO's import looks this up by exact pipeline version with no fallback, so a bump
    that forgets it takes the organism's lineage data down.
    """
    edits: list[Edit] = []
    for system in org.lineage_systems:
        block = doc.lineage.entries.get(system)
        if block is None:
            raise Problem(
                f"{org.name}: schema declares lineageSystem '{system}' but "
                f"lineageSystemDefinitions has no such key"
            )
        if new_version in block:
            continue
        cur = max(block)
        line, url = block[cur]
        edits.append(
            Edit(line + 1, line + 1, [f"    {new_version}: {url}"],
                 f"{org.name}: lineageSystemDefinitions.{system}.{new_version} added "
                 f"(same URL as {cur})")
        )
    return edits


def _all_anchors(lines: list[str]) -> set[str]:
    return {m.group(1) for line in lines for m in re.finditer(r"(?<![\w*])&(\w+)", line)}


# --------------------------------------------------------------------------- prune


def plan_prune(doc: Doc, org_name: str, delete: bool) -> list[Edit]:
    org = doc.organisms[org_name]
    if not org.active:
        raise Problem(f"{org_name}: no active preprocessing entries")

    keep_version = org.max_version
    if len(org.versions) == 1:
        return []  # nothing outdated

    edits: list[Edit] = []
    entries = _resolved_entries(doc, org_name)

    if len(org.active) == 1:
        # One entry serving several versions: drop all but the highest.
        item = org.active[0]
        doomed = [ln for v, ln in zip(item.versions, item.version_value_lines) if v != keep_version]
        if len(set(item.version_value_lines)) != len(item.version_value_lines):
            raise Problem(f"{org_name}: inline version list -- rewrite by hand")
        for ln in sorted(doomed):
            edits.append(Edit(ln, ln + 1, [],
                              f"{org_name}: dropped version {item.versions[item.version_value_lines.index(ln)]}"))
    else:
        # Several entries. Keep the FIRST one physically -- it carries the anchors the
        # later ones alias -- renumber it to the surviving version, and comment out the
        # rest. That is exactly what PR #1096 did by hand.
        base, *rest = org.active
        sigs = [_config_signature(e) for e in entries]
        differing = [
            k
            for k in set().union(*(s.keys() for s in sigs))
            if len({yaml.safe_dump(s.get(k), sort_keys=True) for s in sigs}) > 1
        ]
        if differing:
            raise Problem(
                f"{org_name}: the pipeline entries do not share the same config -- they "
                f"differ in {sorted(differing)}. Collapsing them means choosing which "
                f"config survives, and the entry to keep ({keep_version}) is not the one "
                f"holding the anchors. Resolve this by hand.\n"
                f"  (This is the state today's mpox block is in: entry {keep_version} "
                f"aliases *{base.anchor} and inherits gene lists from it.)"
            )

        for item in rest:
            escaping = _aliases_outside(doc.lines, item)
            if escaping:
                raise Problem(
                    f"{org_name}: entry with version(s) {item.versions} defines anchor(s) "
                    f"{sorted(escaping)} that are aliased elsewhere in the file. Removing "
                    f"it would orphan them. Resolve by hand."
                )

        # Renumber the surviving entry.
        if base.max_version != keep_version:
            if base.version_key_line is None:
                raise Problem(f"{org_name}: no 'version:' key on the entry being kept")
            first = min(base.version_value_lines)
            last = max(base.version_value_lines)
            edits.append(
                Edit(first, last + 1, [f"{' ' * (KEY_INDENT + 2)}- {keep_version}"],
                     f"{org_name}: surviving entry renumbered {base.versions} -> [{keep_version}] "
                     f"(replicas stays {base.replicas})")
            )
        elif len(base.versions) > 1:
            first, last = min(base.version_value_lines), max(base.version_value_lines)
            edits.append(
                Edit(first, last + 1, [f"{' ' * (KEY_INDENT + 2)}- {keep_version}"],
                     f"{org_name}: version list trimmed to [{keep_version}]")
            )

        for item in rest:
            body = doc.lines[item.start : item.end]
            if delete:
                edits.append(Edit(item.start, item.end, [],
                                  f"{org_name}: deleted entry for version(s) {item.versions}"))
            else:
                commented = [
                    (l[:ITEM_INDENT] + "# " + l[ITEM_INDENT:]) if l.strip() else l for l in body
                ]
                edits.append(Edit(item.start, item.end, commented,
                                  f"{org_name}: commented out entry for version(s) {item.versions} "
                                  f"(kept as a template for the next bump)"))

    edits += _plan_lineage_prune(doc, org, keep_version)
    return edits


def _aliases_outside(lines: list[str], item: Item) -> set[str]:
    """Anchors defined inside `item` that something outside `item` still aliases."""
    escaping = set()
    for anchor in set(item.inner_anchors):
        for i, line in enumerate(lines):
            if item.start <= i < item.end:
                continue
            if re.search(rf"(?<!\w)\*{re.escape(anchor)}\b", line) and not line.lstrip().startswith("#"):
                escaping.add(anchor)
                break
    return escaping


def _plan_lineage_prune(doc: Doc, org: Organism, keep_version: int) -> list[Edit]:
    edits: list[Edit] = []
    for system in org.lineage_systems:
        block = doc.lineage.entries.get(system, {})
        for version, (line, _url) in block.items():
            if version < keep_version:
                edits.append(Edit(line, line + 1, [],
                                  f"{org.name}: lineageSystemDefinitions.{system}.{version} removed"))
    return edits


# --------------------------------------------------------------------------- check


def run_check(doc: Doc, organisms: list[str], allow_empty_segments: bool) -> int:
    errors: list[str] = []
    warnings: list[str] = []

    for name in organisms:
        org = doc.organisms[name]
        entries = _resolved_entries(doc, name)

        # 1. Duplicate versions. The chart's flattenPreprocessingVersions calls fail()
        #    on these, so this is a hard render error waiting to happen.
        seen: dict[int, int] = {}
        for idx, entry in enumerate(entries):
            vs = entry["version"] if isinstance(entry["version"], list) else [entry["version"]]
            for v in vs:
                if v in seen:
                    errors.append(f"{name}: version {v} declared by entries {seen[v]} and {idx}")
                seen[v] = idx

        # 2. The incident check. Merge keys are shallow, so re-declaring configFile
        #    under a second entry silently drops any nested key you forget to repeat.
        #    Comparing resolved key sets catches that with no domain knowledge.
        keysets = [frozenset(e.get("configFile", {})) for e in entries]
        if len(set(keysets)) > 1:
            union = frozenset().union(*keysets)
            for idx, (entry, ks) in enumerate(zip(entries, keysets)):
                if missing := sorted(union - ks):
                    errors.append(
                        f"{name}: entry {idx} (version {entry['version']}) is missing "
                        f"configFile key(s) {missing} that sibling entries declare. A "
                        f"shallow merge-key override is the usual cause."
                    )

        # 3. No segments means alignment_requirement=NONE: the pipeline aligns nothing,
        #    annotates nothing, and cannot emit an alignment error.
        if not allow_empty_segments:
            for idx, entry in enumerate(entries):
                if not entry.get("configFile", {}).get("segments"):
                    errors.append(
                        f"{name}: entry {idx} (version {entry['version']}) has no segments. "
                        f"The pipeline would align nothing and could never error."
                    )

        # 4. Deployment and ConfigMap names embed the entry's index in the *flattened*
        #    version list (loculus-preprocessing-<org>-v<version>-<index>), and that
        #    index is also in the Deployment's matchLabels, which are immutable. If
        #    versions are not in ascending order, adding one lands mid-list and
        #    renumbers -- hence recreates -- every Deployment after it, including ones
        #    whose config did not change.
        flat = [v for e in entries for v in (e["version"] if isinstance(e["version"], list) else [e["version"]])]
        if flat != sorted(flat):
            errors.append(
                f"{name}: pipeline versions are declared out of order ({flat}). Adding a "
                f"version would land mid-list and rename later entries' Deployments."
            )

        # 5. SILO looks lineage definitions up by exact pipeline version, no fallback.
        #    This one fails at *import runtime*, not at helm template time -- the chart
        #    only fails if the lineage system name itself is absent, not a version key.
        #    So CI cannot catch it and this check is the only guard.
        for system in org.lineage_systems:
            block = doc.lineage.entries.get(system, {})
            for v in org.versions:
                if v not in block:
                    errors.append(
                        f"{name}: lineageSystemDefinitions.{system} has no entry for "
                        f"pipeline version {v}. SILO import will fail."
                    )
            for v in sorted(block):
                if v not in org.versions:
                    warnings.append(
                        f"{name}: lineageSystemDefinitions.{system}.{v} is stale "
                        f"(no pipeline entry uses version {v})"
                    )

        # 6. Stale commented-out stubs. Uncommenting one verbatim -- the established
        #    workflow -- yields a duplicate version and a failed render. `bump` always
        #    overwrites them, but a hand edit will not.
        for stub in org.stubs:
            clash = sorted(set(stub.versions) & set(org.versions))
            if clash:
                warnings.append(
                    f"{name}: commented-out stub declares version {clash} which is already "
                    f"active. Uncommenting it as-is would make helm fail; use "
                    f"`pipeline_versions.py bump` or edit the version."
                )

    for w in warnings:
        print(f"warning: {w}")
    for e in errors:
        print(f"ERROR: {e}", file=sys.stderr)

    if errors:
        print(f"\n{len(errors)} error(s), {len(warnings)} warning(s)", file=sys.stderr)
        return 1
    print(f"\nOK: {len(organisms)} organism(s) checked, {len(warnings)} warning(s)")
    return 0


# -------------------------------------------------------------------------- status


def run_status(doc: Doc, organisms: list[str]) -> int:
    rows = []
    for name in organisms:
        org = doc.organisms[name]
        shape = "one entry" if len(org.active) == 1 else f"{len(org.active)} entries"
        reps = ",".join(str(i.replicas if i.replicas is not None else 1) for i in org.active)
        anchors = ",".join(i.anchor for i in org.active if i.anchor) or "-"
        stubs = ";".join(f"v{s.versions or '?'}" for s in org.stubs) or "-"
        systems = ",".join(org.lineage_systems) or "-"
        rows.append((name, ",".join(map(str, org.versions)), reps, shape, anchors, stubs, systems))

    headers = ("organism", "versions", "replicas", "shape", "anchor", "stub", "lineageSystem")
    widths = [max(len(str(r[i])) for r in [headers, *rows]) for i in range(len(headers))]
    fmt = "  ".join(f"{{:<{w}}}" for w in widths)
    print(fmt.format(*headers))
    print(fmt.format(*("-" * w for w in widths)))
    for row in rows:
        print(fmt.format(*row))
    return 0


# ----------------------------------------------------------------------------- cli


def _selected(doc: Doc, arg: str | None) -> list[str]:
    if not arg:
        return sorted(doc.organisms)
    wanted = [o.strip() for o in arg.split(",") if o.strip()]
    if unknown := [o for o in wanted if o not in doc.organisms]:
        raise Problem(f"unknown organism(s): {unknown}. Known: {sorted(doc.organisms)}")
    return wanted


def _emit(doc: Doc, new_lines: list[str], notes: list[str], dry_run: bool) -> int:
    if not notes:
        print("nothing to do")
        return 0
    diff = difflib.unified_diff(
        doc.lines, new_lines, fromfile=str(doc.path), tofile=str(doc.path), lineterm="", n=2
    )
    print("\n".join(diff))
    print()
    for n in notes:
        print(f"  * {n}")
    if dry_run:
        print("\n(dry run -- no changes written)")
        return 0

    text = "\n".join(new_lines)
    try:
        yaml.safe_load(text)  # cheap guard against having produced invalid YAML
    except yaml.YAMLError as exc:
        print(f"\nrefusing to write: result does not parse as YAML: {exc}", file=sys.stderr)
        return 1
    doc.path.write_text(text)
    print(f"\nwrote {doc.path}")

    after = load(doc.path)
    rc = run_check(after, sorted(after.organisms), allow_empty_segments=False)
    if rc:
        print("\nthe written file FAILS check -- review the diff above", file=sys.stderr)
    return rc


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    p.add_argument("--values", type=Path, default=Path(DEFAULT_VALUES),
                   help=f"path to values.yaml (default: {DEFAULT_VALUES})")
    sub = p.add_subparsers(dest="cmd", required=True)

    def common(sp):
        sp.add_argument("--organisms", help="comma-separated; default: all")

    sp = sub.add_parser("status", help="show current pipeline versions")
    common(sp)

    sp = sub.add_parser("bump", help="add the next pipeline version, keeping the current one")
    common(sp)
    sp.add_argument("--mode", choices=("entry", "append"), default="entry",
                   help="entry: add a second list entry that inherits from the current one "
                        "(lets you raise replicas or hand-edit the config). "
                        "append: add the version to the existing entry's version list "
                        "(minimal diff; identical config and replicas). Default: entry")
    sp.add_argument("--replicas", type=int, default=None,
                   help="replicas for the new entry in --mode entry. Default: reuse the "
                        f"commented-out stub's value if there is one, else {DEFAULT_BUMP_REPLICAS}. "
                        "More replicas means the reprocessing backlog clears faster.")
    sp.add_argument("--dry-run", action="store_true")

    sp = sub.add_parser("prune", help="remove superseded pipeline versions")
    common(sp)
    sp.add_argument("--delete", action="store_true",
                   help="delete the superseded entry instead of commenting it out")
    sp.add_argument("--dry-run", action="store_true")

    sp = sub.add_parser("check", help="assert config invariants (exit 1 on failure)")
    common(sp)
    sp.add_argument("--allow-empty-segments", action="store_true")

    args = p.parse_args(argv)

    try:
        doc = load(args.values)
        organisms = _selected(doc, getattr(args, "organisms", None))

        if args.cmd == "status":
            return run_status(doc, organisms)
        if args.cmd == "check":
            return run_check(doc, organisms, args.allow_empty_segments)

        edits: list[Edit] = []
        problems: list[str] = []
        for name in organisms:
            try:
                if args.cmd == "bump":
                    edits += plan_bump(doc, name, args.mode, args.replicas)
                else:
                    edits += plan_prune(doc, name, args.delete)
            except Problem as exc:
                problems.append(str(exc))

        for msg in problems:
            print(f"SKIPPED: {msg}\n", file=sys.stderr)

        if not edits:
            print("nothing to do")
            return 1 if problems else 0

        new_lines = apply_edits(doc.lines, edits)
        notes = [e.note for e in sorted(edits, key=lambda e: e.start)]
        rc = _emit(doc, new_lines, notes, args.dry_run)
        return rc or (1 if problems else 0)

    except Problem as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
