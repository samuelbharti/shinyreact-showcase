#!/usr/bin/env python
"""Generate the synthetic single cell atlas that apps/cell-atlas reads.

    .venv/Scripts/python tools/gen-data/cell-atlas.py

Writes two files next to the app:

    data/atlas.json   metadata: cell count, bounds, clusters, genes
    data/atlas.bin    the cells themselves, little endian

Both servers read the same binary, so the Python and R versions of the app
show the identical point cloud. Generating the cells in each language instead
would need one random number generator that behaves the same in both, which R
cannot do quickly without 32 bit unsigned arithmetic.

Binary layout, for n cells and g genes:

    int16  x[n]          quantized position, dequantize with bounds
    int16  y[n]
    uint8  cluster[n]    index into clusters
    uint8  noise[g][n]   per cell, per gene expression noise

Expression is not stored. It is derived from the cluster profile plus the
noise byte, which costs one byte per cell per gene instead of two and keeps
the file under the large file limit.

The data is synthetic. It looks like a PBMC atlas because that shape is
familiar, but no real cells were involved.
"""

from __future__ import annotations

import json
import struct
from pathlib import Path

import numpy as np

OUT_DIR = Path(__file__).resolve().parents[2] / "apps" / "cell-atlas" / "data"

N_CELLS = 200_000
SEED = 20260913

# Marker genes, and the mean expression each cluster shows for each of them.
GENES = ["CD3D", "MS4A1", "LYZ", "NKG7"]

# name, x, y, spread, share of all cells, mean expression per gene, color
CLUSTERS = [
    ("CD4 T cells", -4.6, 2.9, 1.15, 0.235, [3.6, 0.1, 0.2, 0.3], "#4c78a8"),
    ("CD8 T cells", -2.7, 5.1, 0.95, 0.148, [3.2, 0.1, 0.2, 1.9], "#72b7b2"),
    ("Naive B cells", 3.9, 4.4, 0.90, 0.121, [0.2, 3.4, 0.3, 0.1], "#f58518"),
    ("Memory B cells", 5.4, 2.6, 0.75, 0.068, [0.2, 3.1, 0.4, 0.1], "#ffbf79"),
    ("CD14 monocytes", 1.8, -4.7, 1.25, 0.196, [0.2, 0.2, 4.1, 0.2], "#54a24b"),
    ("FCGR3A monocytes", -1.4, -5.9, 0.85, 0.074, [0.2, 0.2, 3.3, 0.5], "#88d27a"),
    ("NK cells", -5.8, -1.8, 0.95, 0.106, [0.5, 0.1, 0.3, 4.0], "#e45756"),
    ("Dendritic cells", 4.6, -2.4, 0.70, 0.052, [0.3, 0.6, 2.6, 0.3], "#b279a2"),
]

# Expression spread around the cluster mean. One value keeps the sidecar
# simple, and the client never needs it.
SIGMA = 0.75


def main() -> None:
    rng = np.random.default_rng(SEED)

    shares = np.array([c[4] for c in CLUSTERS], dtype=np.float64)
    counts = np.floor(shares / shares.sum() * N_CELLS).astype(np.int64)
    # Rounding leaves a few cells unassigned. Give them to the largest cluster
    # rather than letting the total drift away from N_CELLS.
    counts[int(counts.argmax())] += N_CELLS - counts.sum()

    xs, ys, labels = [], [], []
    for index, (_, cx, cy, spread, _, _, _) in enumerate(CLUSTERS):
        n = int(counts[index])
        # A little anisotropy and rotation per cluster, so the blobs read as
        # cell populations rather than as circles from a textbook.
        angle = rng.uniform(0, np.pi)
        sx, sy = spread, spread * rng.uniform(0.45, 0.8)
        base = rng.normal(0, 1, size=(2, n)) * np.array([[sx], [sy]])
        rot = np.array(
            [[np.cos(angle), -np.sin(angle)], [np.sin(angle), np.cos(angle)]]
        )
        pts = rot @ base
        xs.append(pts[0] + cx)
        ys.append(pts[1] + cy)
        labels.append(np.full(n, index, dtype=np.uint8))

    x = np.concatenate(xs)
    y = np.concatenate(ys)
    cluster = np.concatenate(labels)

    # Shuffle so drawing order does not paint one cluster on top of another.
    order = rng.permutation(x.size)
    x, y, cluster = x[order], y[order], cluster[order]

    bounds = [float(x.min()), float(y.min()), float(x.max()), float(y.max())]

    qx = quantize(x, bounds[0], bounds[2])
    qy = quantize(y, bounds[1], bounds[3])

    # One noise byte per cell per gene. Uniform rather than normal: the
    # dequantized value is fed through a normal quantile on read, so the shape
    # is recovered there and the byte stays a plain 0 to 255.
    noise = rng.integers(0, 256, size=(len(GENES), x.size), dtype=np.uint8)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    blob = qx.tobytes() + qy.tobytes() + cluster.tobytes() + noise.tobytes()
    (OUT_DIR / "atlas.bin").write_bytes(blob)

    meta = {
        "n_cells": int(x.size),
        "seed": SEED,
        "bounds": bounds,
        "sigma": SIGMA,
        "genes": GENES,
        "clusters": [
            {
                "name": name,
                "color": color,
                "count": int(counts[i]),
                "profile": profile,
            }
            for i, (name, _, _, _, _, profile, color) in enumerate(CLUSTERS)
        ],
        "layout": "int16 x[n], int16 y[n], uint8 cluster[n], uint8 noise[g][n]",
    }
    # newline is pinned because the repo is LF everywhere. Without it
    # Python writes CRLF on Windows and the pre-commit hook rewrites this
    # file on every run.
    (OUT_DIR / "atlas.json").write_text(
        json.dumps(meta, indent=2) + "\n",
        encoding="utf-8",
        newline="\n",
    )

    print(f"wrote {OUT_DIR / 'atlas.bin'} ({len(blob) / 1e6:.2f} MB)")
    print(f"wrote {OUT_DIR / 'atlas.json'}")
    print(f"{x.size} cells, {len(CLUSTERS)} clusters, {len(GENES)} genes")
    print("bounds", [round(b, 3) for b in bounds])
    first_x = struct.unpack_from("<h", blob, 0)[0]
    first_y = struct.unpack_from("<h", blob, x.size * 2)[0]
    print(f"first cell, quantized: {first_x} {first_y}")


def quantize(values: np.ndarray, low: float, high: float) -> np.ndarray:
    """Map a float range onto int16, losing about one part in 65,000.

    At these bounds that is well under a screen pixel, so the point cloud is
    identical to the eye and the payload is half the size of float32.
    """
    scaled = (values - low) / (high - low)
    return np.round(scaled * 65534.0 - 32767.0).astype(np.int16)


if __name__ == "__main__":
    main()
