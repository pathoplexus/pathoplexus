#!/bin/bash

set -Eeuo pipefail

if command -v s5cmd >/dev/null 2>&1; then
    echo "s5cmd is already installed at $(command -v s5cmd)"
    exit 0
fi

echo "Installing s5cmd (v2.3.0)..." >&2
case "$(uname -m)" in
    x86_64)  arch="64bit" ;;
    aarch64) arch="arm64" ;;
    *) echo "Error: Unsupported architecture $(uname -m)" >&2; exit 1 ;;
esac

tmp_dir=$(mktemp -d)
trap 'rm -rf "$tmp_dir"' EXIT

if ! curl -fsSL "https://github.com/peak/s5cmd/releases/download/v2.3.0/s5cmd_2.3.0_Linux-${arch}.tar.gz" | tar -xz -C "$tmp_dir" s5cmd; then
    echo "Error: Failed to download s5cmd. Check network connectivity." >&2
    exit 1
fi

if [ -w /usr/local/bin ]; then
    mv "$tmp_dir/s5cmd" /usr/local/bin/
elif sudo -n true 2>/dev/null; then
    sudo mv "$tmp_dir/s5cmd" /usr/local/bin/
else
    mkdir -p "$HOME/.local/bin"
    mv "$tmp_dir/s5cmd" "$HOME/.local/bin/"
    export PATH="$HOME/.local/bin:$PATH"
fi

echo "s5cmd installed successfully at $(command -v s5cmd || echo "$HOME/.local/bin/s5cmd")."
