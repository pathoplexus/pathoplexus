#!/usr/bin/env python3
"""
Compress all JPG images larger than a specified size.
"""

import argparse
import os
from pathlib import Path

from PIL import Image


def get_file_size_kb(filepath):
    """Get file size in KB."""
    return os.path.getsize(filepath) / 1024


def compress_image(filepath, target_size_kb, resize_to=None):
    """Compress a JPEG image to be under target_size_kb."""
    original_size_kb = get_file_size_kb(filepath)

    img = Image.open(filepath)

    # Convert RGBA to RGB if needed
    if img.mode in ('RGBA', 'LA', 'P'):
        background = Image.new('RGB', img.size, (255, 255, 255))
        if img.mode == 'P':
            img = img.convert('RGBA')
        background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
        img = background

    # Resize first if requested
    if resize_to:
        img = img.resize((resize_to, resize_to), Image.Resampling.LANCZOS)
        img.save(filepath, 'JPEG', quality=85, optimize=True)
        new_size_kb = get_file_size_kb(filepath)
        if new_size_kb <= target_size_kb:
            return original_size_kb, new_size_kb, 85, True

    # Try different quality settings
    for quality in range(85, 5, -5):
        img.save(filepath, 'JPEG', quality=quality, optimize=True)
        new_size_kb = get_file_size_kb(filepath)

        if new_size_kb <= target_size_kb:
            return original_size_kb, new_size_kb, quality, bool(resize_to)

    # Return the smallest version we got
    return original_size_kb, get_file_size_kb(filepath), 5, bool(resize_to)


def main():
    parser = argparse.ArgumentParser(description='Compress all JPG images in a directory to target size and dimensions')
    parser.add_argument('directory', type=Path, help='Directory containing images to compress')
    parser.add_argument('--target-size', type=int, default=25, help='Target max size in KB (default: 25)')
    parser.add_argument('--resize', type=int, help='Resize images to this dimension (e.g., 160 for 160x160px)')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be compressed without actually doing it')

    args = parser.parse_args()

    if not args.directory.exists():
        print(f"Error: Directory {args.directory} does not exist")
        return 1

    target_kb = args.target_size - 1  # Aim slightly below to ensure we stay under

    print(f"Compressing images in {args.directory} (target: <{args.target_size}KB)")
    if args.resize:
        print(f"Resizing to {args.resize}x{args.resize}px before compression")
    if args.dry_run:
        print("DRY RUN - no files will be modified")

    total_files = 0
    compressed_files = 0
    total_saved_kb = 0

    jpg_files = sorted(list(args.directory.glob("*.jpg")) + list(args.directory.glob("*.jpeg")))

    for filepath in jpg_files:
        size_kb = get_file_size_kb(filepath)
        total_files += 1

        if size_kb > args.target_size:
            print(f"Processing: {filepath.name} ({size_kb:.1f}KB)")

            if not args.dry_run:
                orig_kb, new_kb, quality, resized = compress_image(filepath, target_kb, args.resize)
                saved_kb = orig_kb - new_kb
                total_saved_kb += saved_kb
                resize_str = " resized," if resized else ""
                print(f"  {orig_kb:.1f}KB → {new_kb:.1f}KB (saved {saved_kb:.1f}KB,{resize_str} quality {quality})")

            compressed_files += 1

    print(f"\nTotal: {total_files} files, {compressed_files} {'would be' if args.dry_run else ''} compressed", end='')
    if not args.dry_run:
        print(f", {total_saved_kb:.1f}KB saved")
    else:
        print()

    return 0


if __name__ == "__main__":
    exit(main())
