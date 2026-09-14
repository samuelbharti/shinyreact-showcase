#!/usr/bin/env python
"""Generate the synthetic genome that apps/genome-tracks reads.

    .venv/Scripts/python tools/gen-data/genome-tracks.py

Writes, next to the app:

    data/genome.json   metadata: chromosomes, track names, binary layout
    data/genome-<chr>.bin   one file per chromosome

Per chromosome, little endian:

    uint32  start[g]      gene start, in bases
    uint16  length[g]     gene length, in units of 100 bases
    uint8   strand[g]     0 reverse, 1 forward
    uint8   biotype[g]    index into the biotype list
    uint16  coverage[b]   read depth per bin

Gene names are not stored. The client builds them from the index, which is
what a real browser would look up on demand and what keeps this file small.

The data is synthetic. It is shaped like a gene annotation track because that
shape is familiar, but no real genome was involved.
"""

from __future__ import annotations

import json
from pathlib import Path

import numpy as np

OUT_DIR = Path(__file__).resolve().parents[2] / "apps" / "genome-tracks" / "data"

SEED = 20260913
BIOTYPES = ["protein coding", "lncRNA", "pseudogene", "miRNA"]
# Roughly the real proportions, which is what makes a track look plausible.
BIOTYPE_WEIGHTS = [0.62, 0.18, 0.15, 0.05]

# name, length in bases, gene count, coverage bins
CHROMOSOMES = [
    ("chr1", 248_956_422, 8_000, 24_000),
    ("chr7", 159_345_973, 5_200, 16_000),
    ("chr17", 83_257_441, 3_400, 9_000),
]


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    rng = np.random.default_rng(SEED)
    meta_chromosomes = []

    for name, span, gene_count, bins in CHROMOSOMES:
        # Genes cluster rather than spread evenly, so draw from a handful of
        # dense regions plus a uniform background. A uniform track looks
        # wrong to anyone who has seen a real one.
        cluster_count = max(6, gene_count // 400)
        centers = rng.uniform(0, span, size=cluster_count)
        spreads = rng.uniform(span * 0.004, span * 0.02, size=cluster_count)

        from_clusters = int(gene_count * 0.7)
        which = rng.integers(0, cluster_count, size=from_clusters)
        clustered = rng.normal(centers[which], spreads[which])
        scattered = rng.uniform(0, span, size=gene_count - from_clusters)

        starts = np.concatenate([clustered, scattered])
        starts = np.clip(starts, 0, span - 200_000)
        starts = np.sort(starts).astype(np.uint32)

        # Log normal lengths, capped so the uint16 of hundreds does not wrap.
        lengths = rng.lognormal(mean=9.6, sigma=1.0, size=gene_count)
        lengths = np.clip(lengths, 300, 6_500_000)
        length_hundreds = np.clip(np.rint(lengths / 100), 1, 65535).astype(np.uint16)

        strand = rng.integers(0, 2, size=gene_count, dtype=np.uint8)
        biotype = rng.choice(len(BIOTYPES), size=gene_count, p=BIOTYPE_WEIGHTS).astype(
            np.uint8
        )

        # Coverage follows gene density, plus a baseline and some noise.
        bin_edges = np.linspace(0, span, bins + 1)
        density, _ = np.histogram(starts, bins=bin_edges)
        smooth = np.convolve(density.astype(np.float64), np.ones(9) / 9, mode="same")
        depth = 18 + smooth * 6 + rng.normal(0, 3.5, size=bins)
        coverage = np.clip(np.rint(depth), 0, 65535).astype(np.uint16)

        blob = (
            starts.tobytes()
            + length_hundreds.tobytes()
            + strand.tobytes()
            + biotype.tobytes()
            + coverage.tobytes()
        )
        (OUT_DIR / f"genome-{name}.bin").write_bytes(blob)

        meta_chromosomes.append(
            {
                "name": name,
                "span": span,
                "genes": gene_count,
                "bins": bins,
                "bytes": len(blob),
            }
        )
        print(f"{name}: {gene_count} genes, {bins} bins, {len(blob) / 1e3:.0f} KB")

    meta = {
        "seed": SEED,
        "biotypes": BIOTYPES,
        "chromosomes": meta_chromosomes,
        "layout": (
            "uint32 start[g], uint16 length100[g], uint8 strand[g], "
            "uint8 biotype[g], uint16 coverage[b]"
        ),
    }
    (OUT_DIR / "genome.json").write_text(
        json.dumps(meta, indent=2) + "\n",
        encoding="utf-8",
        newline="\n",
    )
    total = sum(c["bytes"] for c in meta_chromosomes)
    print(f"wrote {OUT_DIR / 'genome.json'}")
    print(f"total {total / 1e3:.0f} KB across {len(meta_chromosomes)} chromosomes")


if __name__ == "__main__":
    main()
