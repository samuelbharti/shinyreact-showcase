"""Pure computation for the genome browser. No Shiny here.

The split this app is about:

  The server sends one chromosome and then stops. Panning and zooming are a
  client transform over data the browser already holds, so they cost nothing
  and reach nobody.

  The server answers when you click a gene, because that is a question about
  data rather than a change of view.

Everything below is the server half.
"""

from __future__ import annotations

import base64
import json
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path

import numpy as np

# Short prefixes so a made up gene name still reads like one. The client
# builds the same name from the same two numbers, so nothing has to ship a
# table of eight thousand strings.
BIOTYPE_PREFIX = ["PCG", "LNC", "PSG", "MIR"]


@dataclass(frozen=True, eq=False)
class Chromosome:
    name: str
    span: int
    start: np.ndarray  # uint32, base position
    length: np.ndarray  # uint32, bases (unpacked from hundreds)
    strand: np.ndarray  # uint8
    biotype: np.ndarray  # uint8
    coverage: np.ndarray  # uint16
    # The raw blocks, kept so the payload is a slice rather than a re-encode.
    raw: bytes
    genes: int
    bins: int


@dataclass(frozen=True, eq=False)
class Genome:
    data_dir: Path
    biotypes: list[str]
    chromosomes: list[dict]

    def names(self) -> list[str]:
        return [c["name"] for c in self.chromosomes]

    def meta_for(self, name: str) -> dict:
        for chromosome in self.chromosomes:
            if chromosome["name"] == name:
                return chromosome
        raise KeyError(f"No chromosome called {name}")


def load_genome(data_dir: Path) -> Genome:
    """Read the metadata only. Chromosomes are read when asked for."""
    meta = json.loads((data_dir / "genome.json").read_text(encoding="utf-8"))
    return Genome(
        data_dir=data_dir,
        biotypes=list(meta["biotypes"]),
        chromosomes=list(meta["chromosomes"]),
    )


@lru_cache(maxsize=8)
def _read_chromosome(data_dir: str, name: str, genes: int, bins: int, span: int):
    """Parse one chromosome file. Cached, because a reader may come back."""
    blob = (Path(data_dir) / f"genome-{name}.bin").read_bytes()
    expected = genes * 4 + genes * 2 + genes + genes + bins * 2
    if len(blob) != expected:
        raise ValueError(
            f"genome-{name}.bin is {len(blob)} bytes, expected {expected}. "
            "Regenerate it with tools/gen-data/genome-tracks.py."
        )

    at = 0
    start = np.frombuffer(blob, dtype="<u4", count=genes, offset=at)
    at += genes * 4
    length100 = np.frombuffer(blob, dtype="<u2", count=genes, offset=at)
    at += genes * 2
    strand = np.frombuffer(blob, dtype=np.uint8, count=genes, offset=at)
    at += genes
    biotype = np.frombuffer(blob, dtype=np.uint8, count=genes, offset=at)
    at += genes
    coverage = np.frombuffer(blob, dtype="<u2", count=bins, offset=at)

    return Chromosome(
        name=name,
        span=span,
        start=start,
        length=length100.astype(np.uint32) * 100,
        strand=strand,
        biotype=biotype,
        coverage=coverage,
        raw=blob,
        genes=genes,
        bins=bins,
    )


def chromosome(genome: Genome, name: str) -> Chromosome:
    meta = genome.meta_for(name)
    return _read_chromosome(
        str(genome.data_dir), name, meta["genes"], meta["bins"], meta["span"]
    )


def chromosome_payload(genome: Genome, name: str) -> dict:
    """One whole chromosome, sent once.

    The blocks are sliced straight out of the file rather than rebuilt, so
    this costs only the base64. Everything after it is the client's job.
    """
    chrom = chromosome(genome, name)
    genes, bins = chrom.genes, chrom.bins

    at = 0
    start_block = chrom.raw[at : at + genes * 4]
    at += genes * 4
    length_block = chrom.raw[at : at + genes * 2]
    at += genes * 2
    strand_block = chrom.raw[at : at + genes]
    at += genes
    biotype_block = chrom.raw[at : at + genes]
    at += genes
    coverage_block = chrom.raw[at : at + bins * 2]

    return {
        "name": chrom.name,
        "span": chrom.span,
        "genes": genes,
        "bins": bins,
        "biotypes": genome.biotypes,
        "start": _b64(start_block),
        "length100": _b64(length_block),
        "strand": _b64(strand_block),
        "biotype": _b64(biotype_block),
        "coverage": _b64(coverage_block),
    }


def gene_name(biotype: int, index: int) -> str:
    """A stable name for a gene, built rather than stored.

    The client builds the same name from the same two numbers, so no table
    of eight thousand strings has to cross the wire.
    """
    prefix = BIOTYPE_PREFIX[biotype] if biotype < len(BIOTYPE_PREFIX) else "GEN"
    return f"{prefix}{index:05d}"


def gene_details(genome: Genome, name: str, index: int) -> dict | None:
    """Everything about one gene, which is a question only the server can answer.

    Clicking a gene is a request for data. Panning is not, and does not come
    here.
    """
    chrom = chromosome(genome, name)
    if not 0 <= index < chrom.genes:
        return None

    start = int(chrom.start[index])
    length = int(chrom.length[index])
    biotype = int(chrom.biotype[index])

    # Mean read depth across the bins this gene covers.
    per_bin = chrom.span / chrom.bins
    first_bin = int(start / per_bin)
    last_bin = min(chrom.bins - 1, int((start + length) / per_bin))
    window = chrom.coverage[first_bin : last_bin + 1]
    depth = float(window.mean()) if window.size else 0.0

    # How crowded this neighbourhood is, which is the sort of thing a browser
    # makes you squint at and a server can just count.
    margin = 1_000_000
    nearby = int(
        np.count_nonzero(
            (chrom.start > start - margin) & (chrom.start < start + margin)
        )
        - 1
    )

    return {
        "index": index,
        "name": gene_name(biotype, index),
        "chromosome": chrom.name,
        "start": start,
        "end": start + length,
        "length": length,
        "strand": "+" if chrom.strand[index] else "-",
        "biotype": genome.biotypes[biotype],
        "meanDepth": round(depth, 1),
        "neighboursWithinMb": nearby,
    }


def _b64(raw: bytes) -> str:
    return base64.b64encode(raw).decode("ascii")
