#!/usr/bin/env python3
"""Read FASTA on stdin, write `<header>\t<sha256 of sequence>` per record, so sequences never hit disk."""

import hashlib
import sys


def main() -> None:
    out = sys.stdout
    name = None
    h = None
    for line in sys.stdin.buffer:
        if line.startswith(b">"):
            if name is not None:
                out.write(f"{name}\t{h.hexdigest()}\n")
            name = line[1:].strip().decode()
            h = hashlib.sha256()
        else:
            h.update(line.strip())
    if name is not None:
        out.write(f"{name}\t{h.hexdigest()}\n")


if __name__ == "__main__":
    main()
