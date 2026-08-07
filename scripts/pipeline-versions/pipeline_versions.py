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
    merge_alias_line: int | None  # line carrying it
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
    merge_alias_line: int | None = None
    has_own_config_file = False
    inner_anchors: list[str] = []

    # The anchor and/or merge key may sit on the "- " line itself.
    head = body[0][ITEM_INDENT + 2 :]
    if m := re.match(r"^&(\w+)\s*$", head):
        anchor = m.group(1)
    elif m := re.match(r"^<<:\s*\*(\w+)\s*$", head):
        merge_alias, merge_alias_line = m.group(1), start
    elif m := re.match(r"^&(\w+)\s+<<:\s*\*(\w+)\s*$", head):
        anchor, merge_alias, merge_alias_line = m.group(1), m.group(2), start

    for off, raw in enumerate(body):
        lineno = start + off
        # Normalise the "- " lead-in so the first line's key parses like the rest.
        text = raw
        if off == 0:
            text = " " * (ITEM_INDENT + 2) + head

        for am in re.finditer(r"(?<![\w*])&(\w+)", text):
            inner_anchors.append(am.group(1))

        if (m2 := re.match(rf"^ {{{KEY_INDENT}}}<<:\s*\*(\w+)", text)) and merge_alias is None:
            merge_alias, merge_alias_line = m2.group(1), lineno
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
        merge_alias_line=merge_alias_line,
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


def _indent(line: str) -> int:
    return len(line) - len(line.lstrip())


def _block_end(lines: list[str], key_line: int) -> int:
    """Exclusive end of the block owned by the key at `key_line`."""
    base = _indent(lines[key_line])
    for j in range(key_line + 1, len(lines)):
        if not lines[j].strip():
            continue
        if _indent(lines[j]) <= base:
            return j
    return len(lines)


@dataclass
class ScalarSeq:
    """A key whose value is a block sequence of scalars, e.g. a long `genes:` list."""

    key_line: int
    end: int  # exclusive
    key: str
    anchor: str | None

    @property
    def n_lines(self) -> int:
        return self.end - self.key_line


def _scalar_seqs(lines: list[str], start: int, end: int) -> list[ScalarSeq]:
    """Find every `key:` whose value is a flat block sequence of scalars in [start, end)."""
    found: list[ScalarSeq] = []
    for i in range(start, min(end, len(lines))):
        m = re.match(r"^(\s*)([\w-]+):\s*(?:&(\w+))?\s*$", lines[i])
        if not m:
            continue
        pad, key, anchor = m.group(1), m.group(2), m.group(3)
        stop = min(_block_end(lines, i), end)
        body = [l for l in lines[i + 1 : stop] if l.strip()]
        if not body:
            continue
        # Every line must be a scalar item at exactly one level in. Anything deeper
        # means nested maps, which we must never collapse behind an alias -- that is
        # where the per-version values (dataset tags) live.
        if all(re.match(rf"^{pad}  - \S", l) and not l.rstrip().endswith(":") for l in body):
            found.append(ScalarSeq(key_line=i, end=stop, key=key, anchor=anchor))
    return found


# ---------------------------------------------------------------------------- bump


DEFAULT_BUMP_REPLICAS = 3
# Duplicating a short list is clearer than an alias; only long ones earn an anchor.
DEFAULT_ANCHOR_THRESHOLD = 5


def plan_bump(doc: Doc, org_name: str, mode: str, replicas: int | None, threshold: int) -> list[Edit]:
    org = doc.organisms[org_name]
    if not org.active:
        raise Problem(f"{org_name}: no active preprocessing entries")

    new_version = org.max_version + 1
    target = max(org.active, key=lambda i: i.max_version)

    if mode == "append":
        edits = _bump_append(doc, org_name, target, new_version)
    elif mode == "inherit":
        edits = _bump_inherit(doc, org_name, org, target, new_version, replicas)
    elif mode == "expand":
        edits = _bump_expand(doc, org_name, org, target, new_version, replicas, threshold)
    else:
        raise Problem(f"unknown bump mode {mode!r}")

    return edits + _plan_lineage_bump(doc, org, new_version)


def _bump_append(doc: Doc, org_name: str, target: Item, new_version: int) -> list[Edit]:
    """Add the version to the existing entry's list.

    The chart expands a version list into one identical Deployment per version, so
    this is the right shape when nothing changes but the counter.
    """
    if target.version_key_line is None:
        raise Problem(f"{org_name}: the highest entry has no 'version:' key")
    if len(target.version_value_lines) != len(target.versions):
        raise Problem(f"{org_name}: 'version:' is not a block list")
    if target.version_value_lines and target.version_value_lines[0] != target.version_key_line:
        last = max(target.version_value_lines)
        return [Edit(last + 1, last + 1, [f"{' ' * (KEY_INDENT + 2)}- {new_version}"],
                     f"{org_name}: version {new_version} appended to the existing entry")]
    return [Edit(
        target.version_key_line,
        target.version_key_line + 1,
        [f"{' ' * KEY_INDENT}version:"]
        + [f"{' ' * (KEY_INDENT + 2)}- {v}" for v in target.versions + [new_version]],
        f"{org_name}: 'version:' rewritten as a block list, {new_version} added",
    )]


def _pick_replicas(org: Organism, stub: Item | None, replicas: int | None) -> int:
    """A stub's replicas is a deliberate capacity choice (west-nile and hmpv use 2)."""
    if replicas is not None:
        return replicas
    if stub is not None and stub.replicas:
        return stub.replicas
    return DEFAULT_BUMP_REPLICAS


def _ensure_anchor(doc: Doc, org_name: str, target: Item) -> tuple[str, list[Edit]]:
    """Give `target` an anchor if it has none, so a sibling entry can inherit from it."""
    if target.anchor:
        return target.anchor, []
    # An organism whose earlier entry already took the plain name (mpox mid-bump) needs a
    # distinct one, so qualify by version rather than fail.
    taken = _all_anchors(doc.lines)
    anchor = f"{_camel(org_name)}Preprocessing"
    if anchor in taken:
        anchor = f"{anchor}V{target.max_version}"
    if anchor in taken:
        raise Problem(f"{org_name}: no free anchor name (tried '{anchor}')")
    head = doc.lines[target.start][ITEM_INDENT + 2 :]
    return anchor, [Edit(
        target.start,
        target.start + 1,
        [f"{' ' * ITEM_INDENT}- &{anchor}", f"{' ' * KEY_INDENT}{head}"],
        f"{org_name}: added anchor &{anchor} to the existing entry so the new one can inherit it",
    )]


def _place(org: Organism, target: Item, block: list[str], org_name: str,
           new_version: int, n_replicas: int) -> list[Edit]:
    """Write the new entry, reusing a leftover commented-out stub if one is there.

    A stub's version is stale by construction -- every one in the file today names a
    version that is already active -- so it is always overwritten.
    """
    stub = org.stubs[-1] if org.stubs else None
    if stub is not None:
        return [Edit(stub.start, stub.end, block,
                     f"{org_name}: replaced the leftover commented-out stub with version "
                     f"{new_version}, replicas {n_replicas}")]
    return [Edit(target.end, target.end, block,
                 f"{org_name}: added entry for version {new_version}, replicas {n_replicas}")]


def _bump_inherit(doc: Doc, org_name: str, org: Organism, target: Item,
                  new_version: int, replicas: int | None) -> list[Edit]:
    """Second entry inheriting the current one's config wholesale. Minimal diff."""
    anchor, edits = _ensure_anchor(doc, org_name, target)
    n_replicas = _pick_replicas(org, org.stubs[-1] if org.stubs else None, replicas)
    block = [
        f"{' ' * ITEM_INDENT}- <<: *{anchor}",
        f"{' ' * KEY_INDENT}replicas: {n_replicas}",
        f"{' ' * KEY_INDENT}version:",
        f"{' ' * (KEY_INDENT + 2)}- {new_version}",
    ]
    return edits + _place(org, target, block, org_name, new_version, n_replicas)


def _bump_expand(doc: Doc, org_name: str, org: Organism, target: Item, new_version: int,
                 replicas: int | None, threshold: int) -> list[Edit]:
    """Second entry with a fully spelled-out configFile, ready to hand-edit.

    This is the shape a real bump needs: the reason to bump is usually a new nextclade
    dataset tag, and the old entry must keep the old tag. Re-declaring `configFile:`
    means it must repeat everything -- a merge key would replace, not deep-merge.

    Where possible the entry merges the *global* `*preprocessing` anchor rather than the
    organism's, so it does not depend on its sibling and prune can simply delete the old
    entry. Whether that substitution is safe is *computed*, not assumed -- a per-entry
    `image`, `args` or `dockerTag` would make the two differ -- and the caller separately
    asserts the resolved configs match.
    """
    lines = doc.lines
    merge_base, base_edits = _expand_merge_base(doc, org_name, org, target)
    cfg_line = None
    for item in reversed(org.active[: org.active.index(target) + 1]):
        for i in range(item.start, item.end):
            if re.match(rf"^ {{{KEY_INDENT}}}configFile:", lines[i]):
                cfg_line = i
                break
        if cfg_line is not None:
            break
    if cfg_line is None:
        raise Problem(f"{org_name}: no entry declares a 'configFile:' to copy")
    cfg_end = _block_end(lines, cfg_line)

    edits: list[Edit] = list(base_edits)
    taken = _all_anchors(lines)
    # Splice out long scalar lists (mpox's ~175 gene names) behind an alias. Short ones
    # are duplicated -- an alias saves nothing and costs a cross-entry dependency.
    replacements: list[tuple[int, int, str]] = []
    for seq in _scalar_seqs(lines, cfg_line, cfg_end):
        if seq.n_lines <= threshold:
            continue
        anchor = seq.anchor
        if anchor is None:
            anchor = f"{_camel(org_name)}{seq.key[:1].upper()}{seq.key[1:]}"
            if anchor in taken:
                anchor = f"{anchor}V{target.max_version}"
            if anchor in taken:
                raise Problem(f"{org_name}: no free anchor name (tried '{anchor}')")
            taken.add(anchor)
            pad = " " * _indent(lines[seq.key_line])
            edits.append(Edit(
                seq.key_line, seq.key_line + 1, [f"{pad}{seq.key}: &{anchor}"],
                f"{org_name}: anchored the {seq.n_lines - 1}-item '{seq.key}' list as "
                f"&{anchor} instead of duplicating it",
            ))
        replacements.append((seq.key_line, seq.end, f"{' ' * _indent(lines[seq.key_line])}{seq.key}: *{anchor}"))

    cfg: list[str] = []
    i = cfg_line
    while i < cfg_end:
        hit = next((r for r in replacements if r[0] == i), None)
        if hit:
            cfg.append(hit[2])
            i = hit[1]
        else:
            # The copy must not redefine an anchor the source already defines. YAML
            # permits redefinition -- later aliases silently bind to the newer node --
            # so leaving one in would quietly change what any alias between the two
            # points at. Anything worth sharing was turned into an alias above.
            cfg.append(re.sub(r"\s*(?<![\w*])&\w+(?=\s|$)", "", lines[i]) or lines[i])
            i += 1

    n_replicas = _pick_replicas(org, org.stubs[-1] if org.stubs else None, replicas)
    block = [
        f"{' ' * ITEM_INDENT}- <<: *{merge_base}",
        f"{' ' * KEY_INDENT}replicas: {n_replicas}",
        f"{' ' * KEY_INDENT}version:",
        f"{' ' * (KEY_INDENT + 2)}- {new_version}",
    ] + cfg
    return edits + _place(org, target, block, org_name, new_version, n_replicas)


# Keys a generated entry always declares for itself, so whatever a merge key would have
# supplied for them is irrelevant when comparing two candidate merge bases.
_OVERRIDDEN = ("version", "replicas", "configFile")


def _expand_merge_base(doc: Doc, org_name: str, org: Organism, target: Item) -> tuple[str, list[Edit]]:
    """Choose what a flattened entry should merge from.

    Prefer the global `*preprocessing`: an entry merging that is independent of its
    siblings, so prune is a plain deletion. That is only correct if the two agree on
    every key the new entry does not declare itself (`image`, `args`, ...). They do for
    every organism today, but a per-entry `image`/`args`/`dockerTag` would break it, so
    compare rather than assume and fall back to the sibling anchor when they differ.
    """
    entries = _resolved_entries(doc, org_name)
    resolved_target = entries[org.active.index(target)]
    global_base = doc.resolved.get("defaultOrganismConfig", {}).get("preprocessing", [{}])[0]

    def residual(entry: dict) -> dict:
        return {k: v for k, v in entry.items() if k not in _OVERRIDDEN}

    if residual(resolved_target) == residual(global_base):
        return "preprocessing", []

    differing = sorted(
        set(residual(resolved_target)) | set(residual(global_base))
        if residual(resolved_target) != residual(global_base)
        else []
    )
    anchor, edits = _ensure_anchor(doc, org_name, target)
    for e in edits:
        e.note += f" ({org_name} differs from the global *preprocessing in {differing})"
    return anchor, edits



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


def plan_prune(doc: Doc, org_name: str, keep_stubs: bool) -> list[Edit]:
    """Drop every superseded pipeline version, keeping only the highest.

    Two collapses, chosen by whether the entries actually differ:

    * all entries share a config -- keep the first (it holds the anchors), renumber it
      to the surviving version, delete the rest. Its own `replicas` survives, which is
      the wanted "back down to steady state".
    * they differ -- the highest entry's config is the one that must survive, so the
      lower entries are deleted and any anchor they define that a survivor still
      aliases is relocated into the survivor.

    Either way the caller re-reads the file and asserts the surviving entry resolves to
    exactly what the highest entry resolved to before.
    """
    org = doc.organisms[org_name]
    if not org.active:
        raise Problem(f"{org_name}: no active preprocessing entries")

    keep_version = org.max_version
    edits: list[Edit] = []

    if not keep_stubs:
        for stub in org.stubs:
            edits.append(Edit(stub.start, stub.end, [],
                              f"{org_name}: removed leftover commented-out stub"))

    if len(org.versions) == 1:
        # Still fall through to the lineage sweep: a stale key can outlive the entry
        # that needed it (a prune that was skipped, or a hand edit), and nothing else
        # ever removes it.
        return edits + _plan_lineage_prune(doc, org, [keep_version])

    if len(org.active) == 1:
        item = org.active[0]
        if len(set(item.version_value_lines)) != len(item.version_value_lines):
            raise Problem(f"{org_name}: 'version:' is not a block list")
        for version, ln in zip(item.versions, item.version_value_lines):
            if version != keep_version:
                edits.append(Edit(ln, ln + 1, [], f"{org_name}: dropped version {version}"))
        return edits + _plan_lineage_prune(doc, org, [keep_version])

    entries = _resolved_entries(doc, org_name)
    sigs = [_config_signature(e) for e in entries]
    uniform = all(yaml.safe_dump(s, sort_keys=True) == yaml.safe_dump(sigs[0], sort_keys=True)
                  for s in sigs)

    if uniform:
        keep, doomed = org.active[0], org.active[1:]
        replicas_edit: list[Edit] = []
        note_extra = f", replicas stays {keep.replicas}"
    else:
        keep, doomed = org.active[-1], org.active[:-1]
        # Reprocessing is over, so drop back to the steady-state replica count -- that of
        # the oldest entry, which is the one that was running before the bump raised it.
        # With the usual two entries this is the second-highest version.
        steady = org.active[0]
        replicas_edit = []
        if (keep.replicas_line is not None and steady.replicas is not None
                and keep.replicas != steady.replicas):
            replicas_edit = [Edit(
                keep.replicas_line, keep.replicas_line + 1,
                [f"{' ' * KEY_INDENT}replicas: {steady.replicas}"],
                f"{org_name}: replicas back to {steady.replicas} now reprocessing is done",
            )]
        note_extra = ""
        rebase = _rebase_merge_key(doc, org_name, org, keep, doomed)
        edits += rebase
    edits += replicas_edit

    rewritten = {e.start for e in edits}
    for item in doomed:
        edits += _relocate_anchors(doc, org_name, item, keep, doomed, rewritten)
        edits.append(Edit(item.start, item.end, [],
                          f"{org_name}: removed entry for version(s) {item.versions}"))

    if keep.max_version != keep_version or len(keep.versions) > 1:
        if keep.version_key_line is None:
            raise Problem(f"{org_name}: the surviving entry has no 'version:' key")
        first, last = min(keep.version_value_lines), max(keep.version_value_lines)
        edits.append(Edit(first, last + 1, [f"{' ' * (KEY_INDENT + 2)}- {keep_version}"],
                          f"{org_name}: surviving entry set to version {keep_version}{note_extra}"))

    return edits + _plan_lineage_prune(doc, org, [keep_version])


def _rebase_merge_key(doc: Doc, org_name: str, org: Organism, keep: Item,
                      doomed: list[Item]) -> list[Edit]:
    """Point the surviving entry's merge key at the global anchor instead of a sibling.

    An entry written `- <<: *mpoxPreprocessing` inherits from the *entry* prune is about
    to delete. Unlike a value alias, a merge key cannot be relocated -- there is nowhere
    to move a whole mapping to. But in practice all it is inheriting is what the global
    `*preprocessing` also provides (`image`, `args`), everything else being declared by
    the entry itself, so re-pointing it there makes the survivor self-contained.

    Only done when the two provably agree on every key the survivor does not declare;
    a per-entry `image`/`args`/`dockerTag` on the doomed entry would make them differ.
    """
    if keep.merge_alias is None:
        return []
    if not any(keep.merge_alias in d.inner_anchors for d in doomed):
        return []  # inherits from something that is not going away
    if keep.merge_alias_line is None:
        raise Problem(f"{org_name}: cannot locate the '<<: *{keep.merge_alias}' line")

    entries = _resolved_entries(doc, org_name)
    resolved_keep = entries[org.active.index(keep)]
    global_base = doc.resolved.get("defaultOrganismConfig", {}).get("preprocessing", [{}])[0]
    declared = {"version", "replicas"} | ({"configFile"} if keep.has_own_config_file else set())

    def residual(entry: dict) -> dict:
        return {k: v for k, v in entry.items() if k not in declared}

    if residual(resolved_keep) != residual(global_base):
        differing = sorted(k for k in set(residual(resolved_keep)) | set(residual(global_base))
                           if residual(resolved_keep).get(k) != residual(global_base).get(k))
        raise Problem(
            f"{org_name}: the surviving entry inherits {differing} from the entry being "
            f"removed via '<<: *{keep.merge_alias}', which the global *preprocessing does "
            f"not supply"
        )

    line = doc.lines[keep.merge_alias_line]
    return [Edit(
        keep.merge_alias_line, keep.merge_alias_line + 1,
        [line.replace(f"*{keep.merge_alias}", "*preprocessing")],
        f"{org_name}: surviving entry now inherits *preprocessing instead of "
        f"*{keep.merge_alias}, which is being removed",
    )]


def _relocate_anchors(doc: Doc, org_name: str, doomed: Item, keep: Item,
                      all_doomed: list[Item], rewritten: set[int] | None = None) -> list[Edit]:
    """Move anchor definitions out of a block being deleted into the surviving entry.

    A flattened entry aliases the long lists it did not duplicate (mpox's gene names),
    and those anchors are defined on the entry prune is about to remove. The definition
    is spliced into the first surviving alias site, re-indented to match it.

    Only aliases in text that will still exist afterwards count -- an alias inside
    another entry being removed in the same pass is not a reason to keep anything.
    """
    lines = doc.lines
    edits: list[Edit] = []
    # Lines whose alias another edit is already rewriting -- the merge-key rebase. They
    # are not uses that will survive, so they must not force a relocation.
    rewritten = rewritten or set()

    def doomed_line(i: int) -> bool:
        return any(d.start <= i < d.end for d in all_doomed)

    for anchor in dict.fromkeys(doomed.inner_anchors):
        users = [
            i for i, line in enumerate(lines)
            if re.search(rf"(?<!\w)\*{re.escape(anchor)}\b", line)
            and not doomed_line(i)
            and i not in rewritten
            and not line.lstrip().startswith("#")
        ]
        if not users:
            continue

        src = next((i for i in range(doomed.start, doomed.end)
                    if re.search(rf"(?<!\w)&{re.escape(anchor)}\b", lines[i])), None)
        if src is None:
            raise Problem(f"{org_name}: anchor &{anchor} is used outside the removed entry "
                          f"but its definition could not be located")

        dst = users[0]
        m = re.match(rf"^(\s*)([\w-]+):\s*\*{re.escape(anchor)}\s*$", lines[dst])
        if m is None or not (keep.start <= dst < keep.end):
            raise Problem(
                f"{org_name}: anchor &{anchor} is aliased at line {dst + 1} in a form this "
                f"tool cannot relocate ({lines[dst].strip()!r})"
            )
        # The value may be inline (`genes: &x [A, B]`), a block below, or both. Carry the
        # inline remainder verbatim; dropping it would silently null the key.
        inline = re.search(rf"(?<!\w)&{re.escape(anchor)}\b(.*)$", lines[src]).group(1)
        src_end = _block_end(lines, src)
        shift = len(m.group(1)) - _indent(lines[src])
        body = [(" " * shift + l) if l.strip() else l for l in lines[src + 1 : src_end]]
        edits.append(Edit(
            dst, dst + 1, [f"{m.group(1)}{m.group(2)}: &{anchor}{inline}"] + body,
            f"{org_name}: moved the &{anchor} definition into the surviving entry",
        ))
    return edits



def _plan_lineage_prune(doc: Doc, org: Organism, surviving: list[int]) -> list[Edit]:
    """Drop lineage keys for versions no pipeline entry will use after this prune.

    Keyed on the surviving version set rather than "below the highest": a stale key can
    sit above the current version, or be left behind by a prune that was skipped, and
    `< keep_version` misses both.
    """
    keep = set(surviving)
    edits: list[Edit] = []
    for system in org.lineage_systems:
        block = doc.lineage.entries.get(system, {})
        for version, (line, _url) in block.items():
            if version not in keep:
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
        #    under a newer entry silently drops any nested key you forget to repeat.
        #    Comparing resolved key sets catches that with no domain knowledge.
        #
        #    Deliberately asymmetric: only a *newer* entry missing a key an *older* one
        #    declares is an error. That is the incident's direction -- v27 lost the
        #    `segments` that v26 had. A newer entry *adding* a key is an ordinary config
        #    change (a new alignment_requirement, create_embl_file, ...) and is exactly
        #    what someone hand-editing a generated draft would do, so it must not fail CI.
        #    Entries are in ascending version order; check 4 enforces that.
        keysets = [frozenset(e.get("configFile", {})) for e in entries]
        for idx, (entry, ks) in enumerate(zip(entries, keysets)):
            older = frozenset().union(*keysets[:idx]) if idx else frozenset()
            if lost := sorted(older - ks):
                errors.append(
                    f"{name}: entry {idx} (version {entry['version']}) is missing "
                    f"configFile key(s) {lost} that a lower-version entry declares."
                )

        # 3. No segments means alignment_requirement=NONE: the pipeline aligns nothing,
        #    annotates nothing, and cannot emit an alignment error.
        if not allow_empty_segments:
            for idx, entry in enumerate(entries):
                if not entry.get("configFile", {}).get("segments"):
                    errors.append(
                        f"{name}: entry {idx} (version {entry['version']}) has no segments."
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
                f"{name}: pipeline versions are declared out of order ({flat})."
            )

        # 5. SILO looks lineage definitions up by exact pipeline version, no fallback.
        #    This one fails at *import runtime*, not at helm template time -- the chart
        #    only fails if the lineage system name itself is absent, not a version key.
        #    So CI cannot catch it and this check is the only guard.
        for system in org.lineage_systems:
            if system not in doc.lineage.entries:
                errors.append(
                    f"{name}: schema references lineageSystem '{system}' but "
                    f"lineageSystemDefinitions has no '{system}' key."
                )
                continue
            block = doc.lineage.entries[system]
            for v in org.versions:
                if v not in block:
                    errors.append(
                        f"{name}: lineageSystemDefinitions.{system} has no entry for "
                        f"pipeline version {v}."
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
                    f"{name}: commented-out stub declares version {clash}, which is already "
                    f"active. Run `pipeline_versions.py prune` to remove it."
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


def _verify(before: Doc, after: Doc, organisms: list[str], cmd: str) -> list[str]:
    """Post-condition: the config that survives must be the one that was meant to.

    This is what makes the textual splices (and the anchor relocation in particular)
    trustworthy -- it compares fully resolved configs, so a mis-moved anchor or a
    dropped nested key shows up as a mismatch rather than shipping.
    """
    problems: list[str] = []
    for name in organisms:
        old = _resolved_entries(before, name)
        new_entries = _resolved_entries(after, name)
        if not old or not new_entries:
            continue
        if cmd == "prune":
            want = _config_signature(max(old, key=lambda e: max(_vlist(e))))
            got = _config_signature(new_entries[-1])
            if want != got:
                problems.append(
                    f"{name}: after prune the surviving entry does not resolve to the "
                    f"highest version's config"
                )
        else:
            if len(new_entries) > len(old):
                want = _config_signature(max(old, key=lambda e: max(_vlist(e))))
                got = _config_signature(new_entries[-1])
                if want != got:
                    diff = sorted(k for k in set(want) | set(got) if want.get(k) != got.get(k))
                    problems.append(
                        f"{name}: the new entry does not resolve to the same config as the "
                        f"entry it was generated from (differs in {diff})"
                    )
    return problems


def _vlist(entry: dict) -> list[int]:
    v = entry.get("version")
    return v if isinstance(v, list) else [v]


def _emit(doc: Doc, new_lines: list[str], notes: list[str], dry_run: bool,
          organisms: list[str], cmd: str) -> int:
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

    text = "\n".join(new_lines)
    try:
        yaml.safe_load(text)
    except yaml.YAMLError as exc:
        print(f"\nrefusing to write: the result is not valid YAML: {exc}", file=sys.stderr)
        return 1

    # Verify before writing, so a bad transform never reaches the file.
    scratch = doc.path.with_name(doc.path.name + ".verify.tmp")
    try:
        scratch.write_text(text)
        after = load(scratch)
        problems = _verify(doc, after, organisms, cmd)
    except Problem as exc:
        problems = [str(exc)]
    finally:
        scratch.unlink(missing_ok=True)

    if problems:
        for msg in problems:
            print(f"\nrefusing to write: {msg}", file=sys.stderr)
        return 1

    if dry_run:
        print("\n(dry run -- no changes written; verification passed)")
        return 0

    doc.path.write_text(text)
    print(f"\nwrote {doc.path}")

    rc = run_check(load(doc.path), sorted(doc.organisms), allow_empty_segments=False)
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
    sp.add_argument("--mode", choices=("inherit", "expand", "append"), default="inherit",
                   help="inherit (default): a second entry that inherits the current "
                        "config via a merge key -- minimal diff, for when only the version "
                        "and replicas change. "
                        "expand: a second entry with the configFile spelled out in full, "
                        "ready to hand-edit (a new nextclade dataset tag, say). "
                        "append: add the version to the existing entry's version list.")
    sp.add_argument("--expand-organisms",
                   help="comma-separated organisms to bump with --mode expand, overriding "
                        "--mode for those only. Must be within --organisms if that is given.")
    sp.add_argument("--replicas", type=int, default=None,
                   help="replicas for the new entry. Default: reuse the value from a "
                        f"leftover stub if there is one, else {DEFAULT_BUMP_REPLICAS}.")
    sp.add_argument("--anchor-threshold", type=int, default=DEFAULT_ANCHOR_THRESHOLD,
                   help="in expand mode, alias a scalar list rather than duplicating it "
                        f"once it spans more than this many lines (default: {DEFAULT_ANCHOR_THRESHOLD})")
    sp.add_argument("--dry-run", action="store_true")

    sp = sub.add_parser("prune", help="remove superseded pipeline versions")
    common(sp)
    sp.add_argument("--keep-stubs", action="store_true",
                   help="leave leftover commented-out entries in place instead of removing them")
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

        expand_only: list[str] = []
        if args.cmd == "bump" and args.expand_organisms:
            expand_only = [o.strip() for o in args.expand_organisms.split(",") if o.strip()]
            if outside := [o for o in expand_only if o not in organisms]:
                raise Problem(
                    f"--expand-organisms names {outside}, which --organisms does not include"
                )

        # Collect every organism's problem before reporting, so one run tells you about
        # all of them -- but if there is any, write nothing at all. Applying the rest
        # would leave a half-done state that is easy not to notice, and a partial run is
        # what made stale lineage keys linger unexplained. Scope with --organisms to
        # proceed with the ones that do work.
        edits: list[Edit] = []
        problems: list[str] = []
        for name in organisms:
            try:
                if args.cmd == "bump":
                    mode = "expand" if name in expand_only else args.mode
                    edits += plan_bump(doc, name, mode, args.replicas, args.anchor_threshold)
                else:
                    edits += plan_prune(doc, name, args.keep_stubs)
            except Problem as exc:
                problems.append(str(exc))

        if problems:
            for msg in problems:
                print(f"error: {msg}", file=sys.stderr)
            print(
                f"\nnothing was written. {len(problems)} of {len(organisms)} organism(s) "
                f"could not be handled; re-run with --organisms to exclude them.",
                file=sys.stderr,
            )
            return 1

        if not edits:
            print("nothing to do")
            return 0

        new_lines = apply_edits(doc.lines, edits)
        notes = [e.note for e in sorted(edits, key=lambda e: e.start)]
        return _emit(doc, new_lines, notes, args.dry_run, organisms, args.cmd)

    except Problem as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
