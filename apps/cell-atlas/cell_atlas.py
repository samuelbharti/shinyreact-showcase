"""Pure computation for the cell atlas. No Shiny here.

The app splits the work the way the claim says it does:

  The client draws 200,000 cells and answers the lasso instantly, because
  that is a rendering problem and a GPU is good at it.

  The server derives gene expression across all 200,000 cells and summarizes
  whatever the lasso caught, because that is a data problem and it holds the
  data.

Everything below is the server half, and none of it needs Shiny to run.
"""

from __future__ import annotations

import base64
import json
from dataclasses import dataclass
from functools import cached_property
from pathlib import Path

import numpy as np


@dataclass(frozen=True, eq=False)
class Atlas:
    """The bundled atlas, read once per process."""

    n_cells: int
    bounds: list[float]
    genes: list[str]
    clusters: list[dict]
    qx: np.ndarray  # int16, quantized position
    qy: np.ndarray  # int16
    cluster: np.ndarray  # uint8, index into clusters
    noise: np.ndarray  # uint8, shape (n_genes, n_cells)

    @property
    def n_genes(self) -> int:
        return len(self.genes)

    @cached_property
    def expression(self) -> np.ndarray:
        """Expression for every gene in every cell, shape (n_genes, n_cells).

        Derived rather than stored: one uniform noise byte per cell becomes a
        dropout and a spread around the mean for that cell's cluster. Dropout
        is the zero heavy part of single cell counts, and a gene with a low
        mean drops out more often. That is what makes a gene coloring look
        like real data instead of a smooth gradient.

        Computed once per process on first use. It costs about 25 MB for this
        atlas, which buys a lasso that answers without recomputing anything.
        """
        profiles = np.array(
            [c["profile"] for c in self.clusters], dtype=np.float64
        ).T  # (n_genes, n_clusters)
        dropouts = np.minimum(0.95, 0.55 * np.exp(-profiles) + 0.08)

        # Look up each cell's cluster mean and dropout, per gene.
        mean = profiles[:, self.cluster]
        drop = dropouts[:, self.cluster]

        u = (self.noise.astype(np.float64) + 0.5) / 256.0
        kept = u >= drop
        # Rescale the surviving part of the uniform back onto 0 to 1, so a
        # gene with heavy dropout still spans its full range in the cells
        # where it is detected.
        scaled = np.where(kept, (u - drop) / (1.0 - drop), 0.0)
        return np.where(kept, mean * (0.5 + 1.2 * scaled), 0.0)


def load_atlas(data_dir: Path) -> Atlas:
    """Read data/atlas.json and data/atlas.bin.

    tools/gen-data/cell-atlas.py writes both, and records the binary layout
    in the JSON so a reader does not have to guess it.
    """
    meta = json.loads((data_dir / "atlas.json").read_text(encoding="utf-8"))
    blob = (data_dir / "atlas.bin").read_bytes()

    n = int(meta["n_cells"])
    n_genes = len(meta["genes"])
    expected = n * 2 + n * 2 + n + n * n_genes
    if len(blob) != expected:
        raise ValueError(
            f"atlas.bin is {len(blob)} bytes, expected {expected} for "
            f"{n} cells and {n_genes} genes. Regenerate it with "
            "tools/gen-data/cell-atlas.py."
        )

    at = 0
    qx = np.frombuffer(blob, dtype="<i2", count=n, offset=at)
    at += n * 2
    qy = np.frombuffer(blob, dtype="<i2", count=n, offset=at)
    at += n * 2
    cluster = np.frombuffer(blob, dtype=np.uint8, count=n, offset=at)
    at += n
    noise = np.frombuffer(blob, dtype=np.uint8, count=n * n_genes, offset=at)

    return Atlas(
        n_cells=n,
        bounds=list(meta["bounds"]),
        genes=list(meta["genes"]),
        clusters=list(meta["clusters"]),
        qx=qx,
        qy=qy,
        cluster=cluster,
        noise=noise.reshape(n_genes, n),
    )


def points_payload(atlas: Atlas) -> dict:
    """Everything the client needs to draw the atlas, sent once.

    Positions stay quantized. The client dequantizes with `bounds`, which is
    one multiply per coordinate and halves what crosses the wire against
    float32.
    """
    return {
        "n_cells": atlas.n_cells,
        "bounds": atlas.bounds,
        "genes": atlas.genes,
        "clusters": atlas.clusters,
        "x": _b64(atlas.qx),
        "y": _b64(atlas.qy),
        "cluster": _b64(atlas.cluster),
    }


def expression_payload(atlas: Atlas, gene: int) -> dict:
    """One gene's expression, quantized to a byte per cell for the wire.

    The client only maps this onto a color ramp, so 256 levels is finer than
    the eye resolves. `max` carries the real scale for the legend.
    """
    if not 0 <= gene < atlas.n_genes:
        raise IndexError(f"gene {gene} is out of range for {atlas.n_genes} genes")

    values = atlas.expression[gene]
    top = float(values.max())
    if top <= 0:
        packed = np.zeros(atlas.n_cells, dtype=np.uint8)
    else:
        packed = np.clip(np.rint(values * (255.0 / top)), 0, 255).astype(np.uint8)

    return {"gene": atlas.genes[gene], "max": top, "values": _b64(packed)}


def decode_selection(encoded: str, n_cells: int) -> np.ndarray:
    """Turn the client's base64 Uint32Array of cell indices into an array.

    The client sends indices rather than the lasso polygon, because
    regl-scatterplot already knows which points it caught. Sending them as
    bytes rather than a JSON array keeps a 20,000 cell selection near 107 KB
    instead of near 140 KB, and it parses in one step.
    """
    if not encoded:
        return np.empty(0, dtype=np.uint32)

    raw = base64.b64decode(_pad(encoded))
    if len(raw) % 4:
        raise ValueError(
            f"selection is {len(raw)} bytes, which is not a whole number of uint32"
        )

    indices = np.frombuffer(raw, dtype="<u4")
    # A stale selection can outlive a reload. Drop what cannot be a cell
    # rather than failing the whole output.
    return indices[indices < n_cells]


def selection_stats(atlas: Atlas, indices: np.ndarray) -> dict:
    """Summarize a lasso selection across every gene.

    This is the part the server is for. The client knows which cells are
    selected, but only the server holds the expression matrix.
    """
    n = int(indices.size)
    if n == 0:
        return {"n": 0, "composition": [], "markers": []}

    counts = np.bincount(atlas.cluster[indices], minlength=len(atlas.clusters))
    composition = [
        {
            "name": atlas.clusters[c]["name"],
            "color": atlas.clusters[c]["color"],
            "n": int(counts[c]),
            "share": float(counts[c]) / n,
        }
        for c in range(len(atlas.clusters))
        if counts[c] > 0
    ]
    composition.sort(key=lambda row: row["n"], reverse=True)

    expression = atlas.expression
    inside = expression[:, indices].mean(axis=1)
    outside_n = atlas.n_cells - n
    if outside_n > 0:
        outside = (expression.sum(axis=1) - inside * n) / outside_n
    else:
        outside = np.zeros_like(inside)

    # log2 fold change against everything not selected, with a pseudocount so
    # a silent gene does not divide by zero.
    lfc = np.log2((inside + 0.05) / (outside + 0.05))

    markers = [
        {
            "gene": atlas.genes[g],
            "mean": float(inside[g]),
            "rest": float(outside[g]),
            "lfc": float(lfc[g]),
        }
        for g in range(atlas.n_genes)
    ]
    markers.sort(key=lambda row: row["lfc"], reverse=True)

    return {"n": n, "composition": composition, "markers": markers}


def _pad(encoded: str) -> str:
    """Restore base64 padding a client may have trimmed."""
    return encoded + "=" * (-len(encoded) % 4)


def _b64(values: np.ndarray) -> str:
    return base64.b64encode(values.tobytes()).decode("ascii")
