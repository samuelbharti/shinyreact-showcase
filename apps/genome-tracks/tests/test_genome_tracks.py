"""Layer one: the server logic, with no Shiny anywhere.

What this app does, in plain English:

  The server reads one chromosome of synthetic gene annotation and sends the
  whole thing to the browser. The browser draws a gene track and a coverage
  track on a canvas, and panning and zooming are arithmetic on two numbers,
  so they never reach the server. Clicking a gene does reach the server,
  which answers with read depth over that gene and how many genes sit within
  a megabase, because both need the whole chromosome.
"""

import base64
import sys
from pathlib import Path

import pytest

APP_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(APP_DIR))

# The app directory goes on sys.path just above.
from genome_tracks import (  # noqa: E402
    chromosome,
    chromosome_payload,
    gene_details,
    gene_name,
    load_genome,
)


@pytest.fixture(scope="module")
def genome():
    return load_genome(APP_DIR / "data")


def test_the_genome_lists_its_chromosomes(genome):
    assert genome.names() == ["chr1", "chr7", "chr17"]
    assert genome.biotypes == ["protein coding", "lncRNA", "pseudogene", "miRNA"]


def test_a_chromosome_has_the_gene_count_it_advertises(genome):
    for meta in genome.chromosomes:
        chrom = chromosome(genome, meta["name"])
        assert chrom.start.size == meta["genes"]
        assert chrom.length.size == meta["genes"]
        assert chrom.coverage.size == meta["bins"]


def test_gene_starts_are_sorted(genome):
    # The client binary searches them to find what is in view. Unsorted, the
    # search returns the wrong window and the track silently loses genes.
    chrom = chromosome(genome, "chr1")
    assert all(chrom.start[i] <= chrom.start[i + 1] for i in range(chrom.genes - 1))


def test_no_gene_starts_past_the_end_of_its_chromosome(genome):
    for meta in genome.chromosomes:
        chrom = chromosome(genome, meta["name"])
        assert int(chrom.start.max()) < chrom.span


def test_a_truncated_chromosome_file_is_refused(genome, tmp_path):
    (tmp_path / "genome.json").write_text(
        (APP_DIR / "data" / "genome.json").read_text(encoding="utf-8"), encoding="utf-8"
    )
    (tmp_path / "genome-chr1.bin").write_bytes(b"\x00" * 64)
    broken = load_genome(tmp_path)

    with pytest.raises(ValueError, match="Regenerate it"):
        chromosome(broken, "chr1")


def test_the_payload_carries_one_entry_per_gene_and_bin(genome):
    payload = chromosome_payload(genome, "chr7")
    genes = payload["genes"]

    assert len(base64.b64decode(payload["start"])) == genes * 4
    assert len(base64.b64decode(payload["length100"])) == genes * 2
    assert len(base64.b64decode(payload["strand"])) == genes
    assert len(base64.b64decode(payload["biotype"])) == genes
    assert len(base64.b64decode(payload["coverage"])) == payload["bins"] * 2


def test_gene_names_are_built_from_the_biotype_and_the_index():
    # Built rather than stored, so no table of eight thousand strings crosses
    # the wire. The client builds the same name from the same two numbers.
    assert gene_name(0, 0) == "PCG00000"
    assert gene_name(1, 42) == "LNC00042"
    assert gene_name(3, 7999) == "MIR07999"


def test_an_unknown_biotype_still_produces_a_name():
    assert gene_name(99, 1).startswith("GEN")


def test_gene_details_answer_what_the_client_cannot_work_out(genome):
    details = gene_details(genome, "chr1", 123)

    assert details is not None
    assert details["name"] == "PCG00123"
    assert details["chromosome"] == "chr1"
    assert details["end"] == details["start"] + details["length"]
    assert details["strand"] in {"+", "-"}
    assert details["biotype"] in genome.biotypes
    # These two are the reason the click goes to the server at all.
    assert details["meanDepth"] > 0
    assert details["neighboursWithinMb"] >= 0


def test_the_known_gene_details_have_not_moved(genome):
    # Pinned so a change to the data or the arithmetic is deliberate. The R
    # tests assert the same numbers.
    details = gene_details(genome, "chr1", 0)

    assert details["name"] == "PCG00000"
    assert details["start"] == 14740
    assert details["end"] == 26640
    assert details["strand"] == "-"
    assert details["meanDepth"] == 17.5
    assert details["neighboursWithinMb"] == 14


def test_a_gene_index_out_of_range_gives_nothing_rather_than_an_error(genome):
    # A stale click can outlive a chromosome change.
    assert gene_details(genome, "chr1", 999_999) is None
    assert gene_details(genome, "chr1", -1) is None


def test_the_last_gene_on_a_chromosome_still_answers(genome):
    # The coverage window for the final gene runs to the end of the bins, so
    # this is where an off by one shows up.
    meta = genome.meta_for("chr17")
    details = gene_details(genome, "chr17", meta["genes"] - 1)

    assert details is not None
    assert details["meanDepth"] >= 0


def test_reading_a_chromosome_twice_gives_the_same_object(genome):
    # Cached, because a reader comes back to a chromosome they have visited.
    assert chromosome(genome, "chr1") is chromosome(genome, "chr1")
