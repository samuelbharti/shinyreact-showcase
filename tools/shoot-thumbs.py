"""Turn full size app screenshots into the gallery thumbnails.

    uv run python tools/shoot-thumbs.py <raw-dir> <out-dir> <slug> [<slug> ...]

Driven by tools/shoot-thumbs.mjs. It is a separate file because the capture
needs chromote, which is an R package, and the encoding needs Pillow, which
is a Python one.

Two decisions worth knowing.

The crop is from the top. An app's header and its first plot are what
identify it, and everything below the fold is chrome a thumbnail does not
need. Cropping to the middle would show a reader a slice of a table.

The output is JPEG rather than PNG. These are screenshots of real pages, so
they are photographic enough that JPEG costs almost nothing to look at and a
great deal less to download: the eleven come to about 370 kB, against 1.2 MB
as PNG. WebP would be smaller again, but this bundle is served by two
different stacks and each would have to guess a MIME type for it.
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

# 8:5, which is the shape the cards reserve. Twice the size they are drawn at,
# so the picture still holds up on a dense screen.
WIDTH, HEIGHT = 720, 450
QUALITY = 82


def encode(raw: Path, out: Path) -> int:
    """One screenshot into one thumbnail. Returns the size in bytes."""
    image = Image.open(raw).convert("RGB")

    keep = min(image.height, round(image.width * HEIGHT / WIDTH))
    image = image.crop((0, 0, image.width, keep))
    image = image.resize((WIDTH, HEIGHT), Image.LANCZOS)

    out.parent.mkdir(parents=True, exist_ok=True)
    image.save(out, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    return out.stat().st_size


def main(argv: list[str]) -> int:
    if len(argv) < 3:
        print(__doc__, file=sys.stderr)
        return 2

    raw_dir = Path(argv[0])
    out_dir = Path(argv[1])
    slugs = argv[2:]

    total = 0
    for slug in slugs:
        raw = raw_dir / f"{slug}.png"
        if not raw.exists():
            print(f"  {slug}: no screenshot at {raw}", file=sys.stderr)
            return 1

        size = encode(raw, out_dir / f"{slug}.jpg")
        total += size
        print(f"  {slug:22s} {size // 1024:3d} kB")

    print(f"  {'total':22s} {total // 1024:3d} kB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
