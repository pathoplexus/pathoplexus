#!/usr/bin/env python3
"""
Remove the hostname from file URLs in the given TSV columns, so that
instances serving the same file under different domains compare equal, e.g.
  "url":"https://staging.pathoplexus.org/seq/..."  ->  "url":"/seq/..."

Reads a TSV with a header row from stdin and writes it to stdout.
Usage: strip-url-hosts.py FIELD [FIELD ...]
"""

import re
import sys

URL_HOST = re.compile(r'"url":"https?://[^/"]*/')

fields = sys.argv[1:]

header = sys.stdin.readline()
sys.stdout.write(header)
columns = header.rstrip("\n").split("\t")
indices = [columns.index(field) for field in fields if field in columns]

for line in sys.stdin:
    values = line.rstrip("\n").split("\t")
    for i in indices:
        values[i] = URL_HOST.sub('"url":"/', values[i])
    sys.stdout.write("\t".join(values) + "\n")
