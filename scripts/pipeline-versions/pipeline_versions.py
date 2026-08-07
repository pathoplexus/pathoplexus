#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.14"
# dependencies = ["PyYAML>=6.0"]
# ///
"""Manage preprocessing pipeline versions in loculus_values/values.yaml.

Three subcommands:

  status  Show each organism's pipeline versions, replicas, dataset tags and
          lineage keys.
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

import argparse
import difflib
import re
import sys
from collections.abc import Callable
from dataclasses import dataclass, field
from pathlib import Path

import yaml

DEFAULT_VALUES = "loculus_values/values.yaml"

# Indentation of the organisms.<org>.preprocessing list items. The file is uniform
# here; _locate() asserts its textual scan against the parsed document, so a layout
# change surfaces as a hard error rather than a silent mis-edit.
ITEM_INDENT = 6
KEY_INDENT = 8


def _anchor_re(anchor: str) -> str:
    """Matches an anchor *definition* on a line whose position the scanner supplied."""
    return rf"(?<![\w*])&{re.escape(anchor)}(?=\s|$)"


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
class Anchors:
    """Every anchor and alias in the document, from PyYAML's own scanner.

    Taken from the token stream rather than matched with a regex: the scanner knows an
    `&` inside a quoted scalar is not an anchor, which matters here because the linkOut
    URLs are full of `&dataset-name=` query parameters.
    """

    defs: dict[str, int]  # name -> line it is defined on
    uses: dict[str, list[int]]  # name -> lines that alias it

    def unused(self) -> list[str]:
        return sorted(n for n in self.defs if not self.uses.get(n))


@dataclass
class Doc:
    path: Path
    lines: list[str]
    resolved: dict
    organisms: dict[str, Organism]
    # lineageSystemDefinitions: system -> version -> (line number, url)
    lineage: dict[str, dict[int, tuple[int, str]]]
    anchors: Anchors


# ------------------------------------------------------------------------ locating


def _anchors_in(doc: Doc, start: int, end: int) -> list[str]:
    """Anchor names defined between lines [start, end)."""
    return [n for n, line in doc.anchors.defs.items() if start <= line < end]


def _scan_anchors(text: str) -> Anchors:
    """Index anchor definitions and alias uses via PyYAML's scanner."""
    defs: dict[str, int] = {}
    uses: dict[str, list[int]] = {}
    for tok in yaml.scan(text):
        if isinstance(tok, yaml.tokens.AnchorToken):
            defs[tok.value] = tok.start_mark.line
        elif isinstance(tok, yaml.tokens.AliasToken):
            uses.setdefault(tok.value, []).append(tok.start_mark.line)
    return Anchors(defs=defs, uses=uses)


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

    # An entry's anchor has to sit alone on the "- " line. `- &name key: value` is legal
    # YAML but binds the anchor to the *key scalar*, so the alias resolves to the string
    # "key" rather than the mapping -- usually with no error at all. check flags it.
    head = body[0][ITEM_INDENT + 2 :]
    if m := re.match(r"^&(\w+)\s*$", head):
        anchor = m.group(1)
    elif m := re.match(r"^<<:\s*\*(\w+)\s*$", head):
        merge_alias, merge_alias_line = m.group(1), start

    for off, raw in enumerate(body):
        lineno = start + off
        # Normalise the "- " lead-in so the first line's key parses like the rest.
        text = raw
        if off == 0:
            text = " " * (ITEM_INDENT + 2) + head

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


def _locate_lineage(lines: list[str]) -> dict[str, dict[int, tuple[int, str]]]:
    entries: dict[str, dict[int, tuple[int, str]]] = {}
    start = None
    for i, line in enumerate(lines):
        if re.match(r"^lineageSystemDefinitions:\s*$", line):
            start = i
            break
    if start is None:
        return {}

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
    return entries


def load(path: Path) -> Doc:
    return _parse(path, path.read_text())


def _reload(doc: Doc, lines: list[str]) -> Doc:
    """Re-derive a Doc from edited lines, without touching the filesystem."""
    return _parse(doc.path, "\n".join(lines))


def _parse(path: Path, text: str) -> Doc:
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
        for item, pitem in zip(org.active, parsed, strict=False):
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
        anchors=_scan_anchors(text),
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
        edits = _bump_append(org_name, target, new_version)
    elif mode == "inherit":
        edits = _bump_inherit(doc, org_name, target, new_version, replicas)
    elif mode == "expand":
        edits = _bump_expand(doc, org_name, org, target, new_version, replicas, threshold)
    else:
        raise Problem(f"unknown bump mode {mode!r}")

    return edits + _plan_lineage_bump(doc, org, new_version)


def _bump_append(org_name: str, target: Item, new_version: int) -> list[Edit]:
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
        return [
            Edit(
                last + 1,
                last + 1,
                [f"{' ' * (KEY_INDENT + 2)}- {new_version}"],
                f"{org_name}: version {new_version} appended to the existing entry",
            )
        ]
    return [
        Edit(
            target.version_key_line,
            target.version_key_line + 1,
            [f"{' ' * KEY_INDENT}version:"]
            + [f"{' ' * (KEY_INDENT + 2)}- {v}" for v in [*target.versions, new_version]],
            f"{org_name}: 'version:' rewritten as a block list, {new_version} added",
        )
    ]


def _ensure_anchor(doc: Doc, org_name: str, target: Item) -> tuple[str, list[Edit]]:
    """Give `target` an anchor if it has none, so a sibling entry can inherit from it."""
    if target.anchor:
        return target.anchor, []
    # An organism whose earlier entry already took the plain name (mpox mid-bump) needs a
    # distinct one, so qualify by version rather than fail.
    taken = _all_anchors(doc)
    anchor = f"{_camel(org_name)}Preprocessing"
    if anchor in taken:
        anchor = f"{anchor}V{target.max_version}"
    if anchor in taken:
        raise Problem(f"{org_name}: no free anchor name (tried '{anchor}')")
    head = doc.lines[target.start][ITEM_INDENT + 2 :]
    return anchor, [
        Edit(
            target.start,
            target.start + 1,
            [f"{' ' * ITEM_INDENT}- &{anchor}", f"{' ' * KEY_INDENT}{head}"],
            f"{org_name}: added anchor &{anchor} to the existing entry so the new one can inherit it",
        )
    ]


def _place(target: Item, block: list[str], org_name: str, new_version: int, n_replicas: int) -> list[Edit]:
    """Append the new entry after the current highest one.

    Only ever the tail: Deployment names embed the entry's index in the flattened version
    list, and that index is in the immutable matchLabels.
    """
    return [
        Edit(
            target.end,
            target.end,
            block,
            f"{org_name}: added entry for version {new_version}, replicas {n_replicas}",
        )
    ]


def _bump_inherit(
    doc: Doc, org_name: str, target: Item, new_version: int, replicas: int | None
) -> list[Edit]:
    """Second entry inheriting the current one's config wholesale. Minimal diff."""
    anchor, edits = _ensure_anchor(doc, org_name, target)
    n_replicas = replicas if replicas is not None else DEFAULT_BUMP_REPLICAS
    block = [
        f"{' ' * ITEM_INDENT}- <<: *{anchor}",
        f"{' ' * KEY_INDENT}replicas: {n_replicas}",
        f"{' ' * KEY_INDENT}version:",
        f"{' ' * (KEY_INDENT + 2)}- {new_version}",
    ]
    return edits + _place(target, block, org_name, new_version, n_replicas)


def _bump_expand(
    doc: Doc,
    org_name: str,
    org: Organism,
    target: Item,
    new_version: int,
    replicas: int | None,
    threshold: int,
) -> list[Edit]:
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
    taken = _all_anchors(doc)
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
            edits.append(
                Edit(
                    seq.key_line,
                    seq.key_line + 1,
                    [f"{pad}{seq.key}: &{anchor}"],
                    f"{org_name}: anchored the {seq.n_lines - 1}-item '{seq.key}' list as "
                    f"&{anchor} instead of duplicating it",
                )
            )
        pad = " " * _indent(lines[seq.key_line])
        replacements.append((seq.key_line, seq.end, f"{pad}{seq.key}: *{anchor}"))

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

    n_replicas = replicas if replicas is not None else DEFAULT_BUMP_REPLICAS
    block = [
        f"{' ' * ITEM_INDENT}- <<: *{merge_base}",
        f"{' ' * KEY_INDENT}replicas: {n_replicas}",
        f"{' ' * KEY_INDENT}version:",
        f"{' ' * (KEY_INDENT + 2)}- {new_version}",
        *cfg,
    ]
    return edits + _place(target, block, org_name, new_version, n_replicas)


def _global_merge_gap(doc: Doc, org_name: str, org: Organism, item: Item, declared: set[str]) -> list[str]:
    """Keys `item` would lose by merging the global `*preprocessing` instead of a sibling.

    Empty means the two are interchangeable for this entry, so it can merge the global
    one and stop depending on its siblings -- which is what lets prune delete them.
    `declared` names the keys the entry supplies itself, where the merge base is moot.
    """
    resolved_item = _resolved_entries(doc, org_name)[org.active.index(item)]
    global_base = doc.resolved.get("defaultOrganismConfig", {}).get("preprocessing", [{}])[0]

    def residual(entry: dict) -> dict:
        return {k: v for k, v in entry.items() if k not in declared}

    mine, theirs = residual(resolved_item), residual(global_base)
    return sorted(k for k in set(mine) | set(theirs) if mine.get(k) != theirs.get(k))


def _expand_merge_base(doc: Doc, org_name: str, org: Organism, target: Item) -> tuple[str, list[Edit]]:
    """Choose what a flattened entry should merge from.

    Prefer the global `*preprocessing`: an entry merging that is independent of its
    siblings, so prune is a plain deletion. Only correct when the two agree on every key
    the new entry does not declare itself, so compare rather than assume and fall back to
    the sibling anchor when they differ.
    """
    # A flattened entry always writes its own version, replicas and configFile.
    differing = _global_merge_gap(doc, org_name, org, target, {"version", "replicas", "configFile"})
    if not differing:
        return "preprocessing", []

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
        block = doc.lineage.get(system)
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
            Edit(
                line + 1,
                line + 1,
                [f"    {new_version}: {url}"],
                f"{org.name}: lineageSystemDefinitions.{system}.{new_version} added (same URL as {cur})",
            )
        )
    return edits


def _all_anchors(doc: Doc) -> set[str]:
    return set(doc.anchors.defs)


# --------------------------------------------------------------------------- prune


def plan_prune(doc: Doc, org_name: str) -> list[Edit]:
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

    # Older prunes commented the superseded entry out as a template for the next bump.
    # That idiom is gone -- bump generates the entry now -- but clear any that survive.
    for stub in org.stubs:
        edits.append(Edit(stub.start, stub.end, [], f"{org_name}: removed leftover commented-out stub"))

    if len(org.versions) == 1:
        # Still fall through to the lineage sweep: a stale key can outlive the entry
        # that needed it (a prune that was skipped, or a hand edit), and nothing else
        # ever removes it.
        return _finish_prune(doc, org, edits, keep_version)

    if len(org.active) == 1:
        item = org.active[0]
        if len(set(item.version_value_lines)) != len(item.version_value_lines):
            raise Problem(f"{org_name}: 'version:' is not a block list")
        for version, ln in zip(item.versions, item.version_value_lines, strict=False):
            if version != keep_version:
                edits.append(Edit(ln, ln + 1, [], f"{org_name}: dropped version {version}"))
        return _finish_prune(doc, org, edits, keep_version)

    entries = _resolved_entries(doc, org_name)
    sigs = [_config_signature(e) for e in entries]
    uniform = all(yaml.safe_dump(s, sort_keys=True) == yaml.safe_dump(sigs[0], sort_keys=True) for s in sigs)

    if uniform:
        keep, doomed = org.active[0], org.active[1:]
        replicas_edit: list[Edit] = []
        note_extra = f", replicas stays {keep.replicas if keep.replicas is not None else 1}"
    else:
        keep, doomed = org.active[-1], org.active[:-1]
        # Reprocessing is over, so drop back to the steady-state replica count -- that of
        # the oldest entry, which is the one that was running before the bump raised it.
        # With the usual two entries this is the second-highest version.
        steady = org.active[0]
        replicas_edit = []
        if (
            keep.replicas_line is not None
            and steady.replicas is not None
            and keep.replicas != steady.replicas
        ):
            replicas_edit = [
                Edit(
                    keep.replicas_line,
                    keep.replicas_line + 1,
                    [f"{' ' * KEY_INDENT}replicas: {steady.replicas}"],
                    f"{org_name}: replicas back to {steady.replicas} now reprocessing is done",
                )
            ]
        note_extra = ""
        rebase = _rebase_merge_key(doc, org_name, org, keep, doomed)
        edits += rebase
    edits += replicas_edit

    rewritten = {e.start for e in edits}
    for item in doomed:
        edits += _relocate_anchors(doc, org_name, item, keep, doomed, rewritten)
        edits.append(
            Edit(item.start, item.end, [], f"{org_name}: removed entry for version(s) {item.versions}")
        )

    if keep.max_version != keep_version or len(keep.versions) > 1:
        if keep.version_key_line is None:
            raise Problem(f"{org_name}: the surviving entry has no 'version:' key")
        first, last = min(keep.version_value_lines), max(keep.version_value_lines)
        edits.append(
            Edit(
                first,
                last + 1,
                [f"{' ' * (KEY_INDENT + 2)}- {keep_version}"],
                f"{org_name}: surviving entry set to version {keep_version}{note_extra}",
            )
        )

    return _finish_prune(doc, org, edits, keep_version)


def _finish_prune(doc: Doc, org: Organism, edits: list[Edit], keep_version: int) -> list[Edit]:
    """Sweeps every prune path ends with, whichever collapse it took."""
    return edits + _plan_lineage_prune(doc, org, [keep_version])


def plan_strip_unused_anchors(doc: Doc, organisms: list[str]) -> list[Edit]:
    """Remove `&name` from an organism's entries when nothing aliases it.

    An anchor exists to be referenced. Prune removes the entries doing the referencing, so
    without this the file accumulates names with no referent -- and which ones survived was
    an accident of where the remaining text happened to sit, not a decision. `bump` adds an
    anchor back the moment one is needed, so keeping a spare buys nothing.

    Runs as a second pass over the already-edited file rather than alongside the other
    edits: whether an anchor is still aliased depends on what those edits did.
    """
    out: list[Edit] = []
    for name in organisms:
        org = doc.organisms[name]
        for item in org.active:
            for anchor in _anchors_in(doc, item.start, item.end):
                if doc.anchors.uses.get(anchor):
                    continue
                for i in range(item.start, item.end):
                    if not re.search(_anchor_re(anchor), doc.lines[i]):
                        continue
                    stripped = re.sub(_anchor_re(anchor) + r"\s*", "", doc.lines[i]).rstrip()
                    note = f"{name}: dropped unused anchor &{anchor}"
                    if stripped.endswith("-"):
                        # The anchor was alone on a `- ` line (`- &denguePreprocessing`).
                        # Deleting the line would orphan the mapping beneath it, so pull
                        # its first key up onto the dash -- the inverse of _ensure_anchor.
                        pad = stripped[: len(stripped) - len(stripped.lstrip())]
                        out.append(Edit(i, i + 2, [f"{pad}- {doc.lines[i + 1].lstrip()}"], note))
                    else:
                        out.append(Edit(i, i + 1, [stripped] if stripped else [], note))
    return out


def _rebase_merge_key(doc: Doc, org_name: str, org: Organism, keep: Item, doomed: list[Item]) -> list[Edit]:
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
    if not any(keep.merge_alias in _anchors_in(doc, d.start, d.end) for d in doomed):
        return []  # inherits from something that is not going away
    if keep.merge_alias_line is None:
        raise Problem(f"{org_name}: cannot locate the '<<: *{keep.merge_alias}' line")

    declared = {"version", "replicas"} | ({"configFile"} if keep.has_own_config_file else set())
    if differing := _global_merge_gap(doc, org_name, org, keep, declared):
        raise Problem(
            f"{org_name}: the surviving entry inherits {differing} from the entry being "
            f"removed via '<<: *{keep.merge_alias}', which the global *preprocessing does "
            f"not supply"
        )

    line = doc.lines[keep.merge_alias_line]
    return [
        Edit(
            keep.merge_alias_line,
            keep.merge_alias_line + 1,
            [line.replace(f"*{keep.merge_alias}", "*preprocessing")],
            f"{org_name}: surviving entry now inherits *preprocessing instead of "
            f"*{keep.merge_alias}, which is being removed",
        )
    ]


def _relocate_anchors(
    doc: Doc,
    org_name: str,
    doomed: Item,
    keep: Item,
    all_doomed: list[Item],
    rewritten: set[int] | None = None,
) -> list[Edit]:
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

    for anchor in _anchors_in(doc, doomed.start, doomed.end):
        users = [i for i in doc.anchors.uses.get(anchor, []) if not doomed_line(i) and i not in rewritten]
        if not users:
            continue

        src = next(
            (i for i in range(doomed.start, doomed.end) if re.search(_anchor_re(anchor), lines[i])),
            None,
        )
        if src is None:
            raise Problem(
                f"{org_name}: anchor &{anchor} is used outside the removed entry "
                f"but its definition could not be located"
            )

        dst = users[0]
        m = re.match(rf"^(\s*)([\w-]+):\s*\*{re.escape(anchor)}\s*$", lines[dst])
        if m is None or not (keep.start <= dst < keep.end):
            raise Problem(
                f"{org_name}: anchor &{anchor} is aliased at line {dst + 1} in a form this "
                f"tool cannot relocate ({lines[dst].strip()!r})"
            )
        # The value may be inline (`genes: &x [A, B]`), a block below, or both. Carry the
        # inline remainder verbatim; dropping it would silently null the key.
        inline_m = re.search(_anchor_re(anchor) + r"(.*)$", lines[src])
        inline = inline_m.group(1) if inline_m else ""
        src_end = _block_end(lines, src)
        shift = len(m.group(1)) - _indent(lines[src])
        body = [(" " * shift + l) if l.strip() else l for l in lines[src + 1 : src_end]]
        edits.append(
            Edit(
                dst,
                dst + 1,
                [f"{m.group(1)}{m.group(2)}: &{anchor}{inline}", *body],
                f"{org_name}: moved the &{anchor} definition into the surviving entry",
            )
        )
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
        block = doc.lineage.get(system, {})
        for version, (line, _url) in block.items():
            if version not in keep:
                edits.append(
                    Edit(
                        line, line + 1, [], f"{org.name}: lineageSystemDefinitions.{system}.{version} removed"
                    )
                )
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
        for idx, (entry, ks) in enumerate(zip(entries, keysets, strict=False)):
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
                    errors.append(f"{name}: entry {idx} (version {entry['version']}) has no segments.")

        # 4. Deployment and ConfigMap names embed the entry's index in the *flattened*
        #    version list (loculus-preprocessing-<org>-v<version>-<index>), and that
        #    index is also in the Deployment's matchLabels, which are immutable. If
        #    versions are not in ascending order, adding one lands mid-list and
        #    renumbers -- hence recreates -- every Deployment after it, including ones
        #    whose config did not change.
        flat = [v for e in entries for v in _vlist(e)]
        if flat != sorted(flat):
            errors.append(f"{name}: pipeline versions are declared out of order ({flat}).")

        # 5. SILO looks lineage definitions up by exact pipeline version, no fallback.
        #    This one fails at *import runtime*, not at helm template time -- the chart
        #    only fails if the lineage system name itself is absent, not a version key.
        #    So CI cannot catch it and this check is the only guard.
        for system in org.lineage_systems:
            if system not in doc.lineage:
                errors.append(
                    f"{name}: schema references lineageSystem '{system}' but "
                    f"lineageSystemDefinitions has no '{system}' key."
                )
                continue
            block = doc.lineage[system]
            for v in org.versions:
                if v not in block:
                    errors.append(
                        f"{name}: lineageSystemDefinitions.{system} has no entry for pipeline version {v}."
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

        # 7. Anchors with no referent. An anchor exists to be aliased, so one that is not
        #    is either a leftover or a sign that the alias meant to use it went missing.
        # 8. An unpinned nextclade dataset. The pipeline version is meant to identify a
        #    config, but a reference with no `nextclade_dataset_tag` follows whatever
        #    nextclade currently serves, so the effective config can change underneath a
        #    version that never moved.
        for ref in _dataset_refs(entries):
            if not ref.get("nextclade_dataset_tag"):
                warnings.append(
                    f"{name}: version {ref.versions} segment {ref.segment} uses "
                    f"{ref.ref['nextclade_dataset_name']} with no nextclade_dataset_tag, "
                    f"so its dataset is not pinned to this pipeline version."
                )

        # A key that only exists on a reference does nothing at configFile level: the
        # preprocessing Config does not declare it and pydantic drops unknown fields, so
        # it reads as configured while having no effect at all. `nextclade_dataset_tag`
        # was a Config field until loculus d3c43c019 moved it onto the reference, so a
        # config written against the old shape still looks right.
        #
        # A warning rather than an error only because andv is in this state today and
        # fixing it changes which dataset it pins. Once that is resolved this should be
        # an error -- nothing legitimate sets these here.
        for idx, entry in enumerate(entries):
            for key in sorted(REFERENCE_ONLY_KEYS & set(entry.get("configFile") or {})):
                warnings.append(
                    f"{name}: entry {idx} (version {entry['version']}) sets {key} directly "
                    f"on configFile, where the preprocessing pipeline ignores it. It "
                    f"belongs on a segment's reference."
                )

        for item in org.active:
            for anchor in _anchors_in(doc, item.start, item.end):
                if not doc.anchors.uses.get(anchor):
                    warnings.append(
                        f"{name}: anchor &{anchor} is defined but never aliased. "
                        f"Run `pipeline_versions.py prune` to remove it."
                    )
                # 9. `- &name key: value` binds the anchor to the key scalar, not the
                #    mapping, so the alias silently resolves to the string "key". The
                #    anchor has to be alone on the line.
                line = doc.lines[doc.anchors.defs[anchor]]
                if re.match(rf"^\s*- &{re.escape(anchor)}\s+\S", line):
                    errors.append(
                        f"{name}: anchor &{anchor} shares a line with a key "
                        f"({line.strip()!r}); it binds the key, not the entry. Put it on "
                        f"its own line."
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


def _dataset_refs(entry: dict) -> list[dict]:
    return [
        ref
        for seg in entry.get("configFile", {}).get("segments") or []
        for ref in seg.get("references") or []
        if ref.get("nextclade_dataset_name")
    ]


@dataclass
class Ref:
    """One nextclade dataset reference, with the entry and segment it belongs to."""

    versions: list[int]
    segment: str
    name: str
    config_file: dict
    ref: dict

    def get(self, key: str) -> str | None:
        """A reference's effective value, mirroring what the pipeline actually resolves.

        Only `nextclade_dataset_server` falls back to the configFile. The preprocessing
        Config model declares it and applies the fallback explicitly
        (`config.py: if ds.nextclade_dataset_server is None: ... = self.nextclade_dataset_server`),
        whereas the dataset is otherwise built from `reference.model_dump()` alone. Config
        has no `nextclade_dataset_tag` field, so one written at configFile level is
        silently dropped by pydantic -- see CONFIG_ONLY_KEYS.
        """
        if key in CONFIG_FALLBACK_KEYS:
            return self.ref.get(key) or self.config_file.get(key)
        return self.ref.get(key)


# configFile keys the preprocessing Config declares, which a reference inherits when it
# does not set its own.
CONFIG_FALLBACK_KEYS = frozenset({"nextclade_dataset_server"})

# Keys that only mean something on a *reference*. Written at configFile level they are
# silently ignored -- Config does not declare them, and pydantic drops unknown fields.
REFERENCE_ONLY_KEYS = frozenset({"nextclade_dataset_tag", "nextclade_dataset_name", "genes"})


def _dataset_refs(entries: list[dict]) -> list[Ref]:
    """Every reference that names a nextclade dataset, across an organism's entries."""
    out = []
    for entry in entries:
        cf = entry.get("configFile") or {}
        for seg in cf.get("segments") or []:
            for ref in seg.get("references") or []:
                if ref.get("nextclade_dataset_name"):
                    out.append(Ref(_vlist(entry), str(seg.get("name")), str(ref.get("name")), cf, ref))
    return out


def _describe(refs: list[Ref], key: str, missing: str = "-") -> str:
    """One cell's worth of a per-reference value, labelled only by what actually varies.

    An organism can have several entries (versions) and several segments, each pinning its
    own dataset. Listing bare values would not say which is which; labelling everything
    when they all agree is noise. So: collapse when identical, otherwise prefix with
    whichever of version and segment distinguishes them.
    """
    if not refs:
        return missing
    values = [r.get(key) or missing for r in refs]
    if len(set(values)) == 1:
        return values[0]

    # Label by whichever of segment and reference name distinguishes them: cchf has three
    # segments each with one reference, dengue one segment with four references.
    many_segments = len({r.segment for r in refs}) > 1
    grouped: dict[str, list[tuple[Ref, str]]] = {}
    for r, value in zip(refs, values, strict=True):
        grouped.setdefault(r.segment if many_segments else r.name, []).append((r, value))

    cells = []
    for label, members in grouped.items():
        # Add the version only where it is what differs -- a dataset name that is the same
        # in every version does not need one prefix per version.
        if len({v for _, v in members}) == 1:
            cells.append(f"{label}:{members[0][1]}")
        else:
            cells += [f"v{','.join(map(str, r.versions))}/{label}:{v}" for r, v in members]
    return ",".join(cells)


def _lineage_urls(doc: Doc, org: Organism) -> str:
    """What SILO will actually load, which is the point of the entry -- not its key.

    Every version of a system points at the same URL today, so collapse them; if they
    ever diverge, show each. Shown in full: it is the thing you want to open or paste.
    """
    out = []
    for system in org.lineage_systems:
        urls = list(dict.fromkeys(url for _, url in doc.lineage.get(system, {}).values()))
        joined = ",".join(urls) or "MISSING"
        out.append(joined if len(org.lineage_systems) == 1 else f"{system}={joined}")
    return ",".join(out) or "-"


@dataclass
class StatusRow:
    """Everything a status column might need about one organism."""

    doc: Doc
    org: Organism
    entries: list[dict]  # resolved pipeline entries
    refs: list[Ref]  # every nextclade reference across those entries

    def config(self, key: str) -> str:
        """Distinct values of a configFile key across the entries."""
        seen = dict.fromkeys(
            str(e.get("configFile", {}).get(key)) for e in self.entries if e.get("configFile", {}).get(key)
        )
        return ",".join(seen) or "-"


# `entries` is the number of items in the organism's `preprocessing:` list -- what
# distinguishes one entry serving several versions (identical config) from several
# entries (possibly differing configs).
STATUS_COLUMNS: dict[str, Callable[[StatusRow], str]] = {
    "organism": lambda c: c.org.name,
    "versions": lambda c: ",".join(map(str, c.org.versions)),
    "replicas": lambda c: ",".join(str(i.replicas if i.replicas is not None else 1) for i in c.org.active),
    "entries": lambda c: str(len(c.org.active)),
    "nextcladeDatasetTag": lambda c: _describe(c.refs, "nextclade_dataset_tag", "unpinned"),
    "lineageDefinitions": lambda c: _lineage_urls(c.doc, c.org),
    # Not shown by default -- useful for spot-checking what a pipeline actually pulls.
    "datasetName": lambda c: _describe(c.refs, "nextclade_dataset_name"),
    "datasetServer": lambda c: _describe(c.refs, "nextclade_dataset_server", "(nextclade default)"),
    "segments": lambda c: ",".join(dict.fromkeys(r.segment for r in c.refs)) or "-",
    "minimizerUrl": lambda c: c.config("minimizer_url"),
    "batchSize": lambda c: c.config("batch_size"),
    "alignmentRequirement": lambda c: c.config("alignment_requirement"),
    "image": lambda c: ",".join(dict.fromkeys(str(e.get("image")) for e in c.entries)),
}

DEFAULT_STATUS_COLUMNS = (
    "organism",
    "versions",
    "replicas",
    "entries",
    "nextcladeDatasetTag",
    "lineageDefinitions",
)


def run_status(doc: Doc, organisms: list[str], extra: str | None = None) -> int:
    headers = list(DEFAULT_STATUS_COLUMNS)
    for col in (c.strip() for c in (extra or "").split(",") if c.strip()):
        if col not in STATUS_COLUMNS:
            raise Problem(f"unknown column {col!r}. Available: {sorted(STATUS_COLUMNS)}")
        if col not in headers:
            headers.append(col)

    rows = []
    for name in organisms:
        entries = _resolved_entries(doc, name)
        ctx = StatusRow(doc, doc.organisms[name], entries, _dataset_refs(entries))
        rows.append(tuple(STATUS_COLUMNS[c](ctx) for c in headers))

    widths = [max(len(str(r[i])) for r in [tuple(headers), *rows]) for i in range(len(headers))]
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
        elif len(new_entries) > len(old):
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
    """`version` may be a scalar or a list; the chart flattens both."""
    v = entry["version"]
    return list(v) if isinstance(v, list) else [v]


def _emit(
    doc: Doc, new_lines: list[str], notes: list[str], dry_run: bool, organisms: list[str], cmd: str
) -> int:
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
    p.add_argument(
        "--values",
        type=Path,
        default=Path(DEFAULT_VALUES),
        help=f"path to values.yaml (default: {DEFAULT_VALUES})",
    )
    sub = p.add_subparsers(dest="cmd", required=True)

    def common(sp):
        sp.add_argument("--organisms", help="comma-separated; default: all")

    sp = sub.add_parser("status", help="show current pipeline versions")
    common(sp)
    sp.add_argument(
        "--columns",
        help="extra columns to append, comma-separated. Available: "
        + ", ".join(c for c in sorted(STATUS_COLUMNS) if c not in DEFAULT_STATUS_COLUMNS),
    )

    sp = sub.add_parser("bump", help="add the next pipeline version, keeping the current one")
    common(sp)
    sp.add_argument(
        "--mode",
        choices=("inherit", "expand", "append"),
        default="inherit",
        help="inherit (default): a second entry that inherits the current "
        "config via a merge key -- minimal diff, for when only the version "
        "and replicas change. "
        "expand: a second entry with the configFile spelled out in full, "
        "ready to hand-edit (a new nextclade dataset tag, say). "
        "append: add the version to the existing entry's version list.",
    )
    sp.add_argument(
        "--expand-organisms",
        help="comma-separated organisms to bump with --mode expand, overriding "
        "--mode for those only. Must be within --organisms if that is given.",
    )
    sp.add_argument(
        "--replicas",
        type=int,
        default=None,
        help="replicas for the new entry. Default: reuse the value from a "
        f"leftover stub if there is one, else {DEFAULT_BUMP_REPLICAS}.",
    )
    sp.add_argument(
        "--anchor-threshold",
        type=int,
        default=DEFAULT_ANCHOR_THRESHOLD,
        help="in expand mode, alias a scalar list rather than duplicating it "
        f"once it spans more than this many lines (default: {DEFAULT_ANCHOR_THRESHOLD})",
    )
    sp.add_argument("--dry-run", action="store_true")

    sp = sub.add_parser("prune", help="remove superseded pipeline versions")
    common(sp)
    sp.add_argument("--dry-run", action="store_true")

    sp = sub.add_parser("check", help="assert config invariants (exit 1 on failure)")
    common(sp)
    sp.add_argument("--allow-empty-segments", action="store_true")

    args = p.parse_args(argv)

    try:
        doc = load(args.values)
        organisms = _selected(doc, getattr(args, "organisms", None))

        if args.cmd == "status":
            return run_status(doc, organisms, args.columns)
        if args.cmd == "check":
            return run_check(doc, organisms, args.allow_empty_segments)

        expand_only: list[str] = []
        if args.cmd == "bump" and args.expand_organisms:
            expand_only = [o.strip() for o in args.expand_organisms.split(",") if o.strip()]
            if outside := [o for o in expand_only if o not in organisms]:
                raise Problem(f"--expand-organisms names {outside}, which --organisms does not include")

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
                    edits += plan_prune(doc, name)
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

        new_lines = apply_edits(doc.lines, edits)
        notes = [e.note for e in sorted(edits, key=lambda e: e.start)]

        if args.cmd == "prune":
            # Whether an anchor is still aliased depends on what the edits above did, so
            # this has to see the result rather than the original. Re-plan against the
            # edited text, then apply on top.
            after, extra_notes = _reload(doc, new_lines), []
            strip = plan_strip_unused_anchors(after, organisms)
            if strip:
                new_lines = apply_edits(after.lines, strip)
                extra_notes = [e.note for e in sorted(strip, key=lambda e: e.start)]
            notes += extra_notes

        if not edits and not notes:
            print("nothing to do")
            return 0

        return _emit(doc, new_lines, notes, args.dry_run, organisms, args.cmd)

    except Problem as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
