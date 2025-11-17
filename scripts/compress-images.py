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


def process_image(filepath, target_size_kb, max_dimension):
    """Resize image if needed, then compress to target size."""
    import shutil
    import tempfile

    original_size_kb = get_file_size_kb(filepath)

    # If already under target, skip
    if original_size_kb <= target_size_kb:
        return None

    # Create a backup
    with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as tmp:
        backup_path = tmp.name
    shutil.copy2(filepath, backup_path)

    try:
        img = Image.open(filepath)
        original_dimensions = img.size

        # Convert RGBA to RGB if needed
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = background

        # Resize if image is larger than max_dimension
        resized = False
        if max_dimension and max(img.size) > max_dimension:
            img = img.resize((max_dimension, max_dimension), Image.Resampling.LANCZOS)
            resized = True

        # Try quality levels from 100 down to 5
        for quality in range(100, 5, -5):
            img.save(filepath, 'JPEG', quality=quality, optimize=True)
            new_size_kb = get_file_size_kb(filepath)
            if new_size_kb <= target_size_kb:
                os.unlink(backup_path)
                return original_size_kb, new_size_kb, quality, resized

        # If we couldn't get it small enough, keep the smallest version
        os.unlink(backup_path)
        return original_size_kb, get_file_size_kb(filepath), 5, resized

    except Exception as e:
        # Restore backup on error
        shutil.copy2(backup_path, filepath)
        os.unlink(backup_path)
        raise e


def main():
    parser = argparse.ArgumentParser(description='Resize and compress all JPG images in a directory')
    parser.add_argument('directory', type=Path, help='Directory containing images to compress')
    parser.add_argument('--target-size', type=int, default=25, help='Target max size in KB (default: 25)')
    parser.add_argument('--max-dimension', type=int, help='Max width/height in pixels (e.g., 320 for 320x320px)')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be processed without actually doing it')

    args = parser.parse_args()

    if not args.directory.exists():
        print(f"Error: Directory {args.directory} does not exist")
        return 1

    target_kb = args.target_size - 1  # Aim slightly below to ensure we stay under

    print(f"Processing images in {args.directory} (target: <{args.target_size}KB)")
    if args.max_dimension:
        print(f"Max dimension: {args.max_dimension}x{args.max_dimension}px")
    if args.dry_run:
        print("DRY RUN - no files will be modified")

    total_files = 0
    processed_files = 0
    total_saved_kb = 0

    jpg_files = sorted(list(args.directory.glob("*.jpg")) + list(args.directory.glob("*.jpeg")))

    for filepath in jpg_files:
        size_kb = get_file_size_kb(filepath)
        total_files += 1

        if not args.dry_run:
            result = process_image(filepath, target_kb, args.max_dimension)
            if result is None:
                # Skipped - already under target
                continue

            orig_kb, new_kb, quality, resized = result
            saved_kb = orig_kb - new_kb
            total_saved_kb += saved_kb
            resize_str = " resized," if resized else ""
            print(f"{filepath.name}: {orig_kb:.1f}KB → {new_kb:.1f}KB (saved {saved_kb:.1f}KB,{resize_str} quality {quality})")
            processed_files += 1
        else:
            if size_kb > args.target_size:
                print(f"{filepath.name}: {size_kb:.1f}KB (would process)")
                processed_files += 1

    print(f"\nTotal: {total_files} files, {processed_files} {'would be' if args.dry_run else ''} processed", end='')
    if not args.dry_run:
        print(f", {total_saved_kb:.1f}KB saved")
    else:
        print()

    return 0


if __name__ == "__main__":
    exit(main())
