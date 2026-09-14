# Layer one: the server logic, with no Shiny anywhere.
#
# These mirror tests/test_genome_tracks.py. Both servers read the same binary
# files, so the pinned numbers below are where the two stop being assumed to
# agree and start being checked.

test_that("the genome lists its chromosomes", {
  expect_equal(genome_names(GENOME), c("chr1", "chr7", "chr17"))
  expect_equal(
    GENOME$biotypes,
    c("protein coding", "lncRNA", "pseudogene", "miRNA")
  )
})

test_that("a chromosome has the gene count it advertises", {
  for (meta in GENOME$chromosomes) {
    chrom <- chromosome(GENOME, meta$name)
    expect_length(chrom$start, as.integer(meta$genes))
    expect_length(chrom$length, as.integer(meta$genes))
    expect_length(chrom$coverage, as.integer(meta$bins))
  }
})

test_that("gene starts are sorted", {
  # The client binary searches them to find what is in view. Unsorted, the
  # search returns the wrong window and the track silently loses genes.
  chrom <- chromosome(GENOME, "chr1")
  expect_false(is.unsorted(chrom$start))
})

test_that("no gene starts past the end of its chromosome", {
  for (meta in GENOME$chromosomes) {
    chrom <- chromosome(GENOME, meta$name)
    expect_lt(max(chrom$start), chrom$span)
  }
})

test_that("large positions survive the read", {
  # R has no unsigned 32 bit integer. chr1 reaches 248 million, so a naive
  # signed read would be fine here but wrap on anything larger. The reader
  # corrects for it, and this is the check that it still does.
  chrom <- chromosome(GENOME, "chr1")
  expect_true(all(chrom$start >= 0))
  expect_gt(max(chrom$start), 2e8)
})

test_that("a truncated chromosome file is refused", {
  tmp <- withr::local_tempdir()
  file.copy(
    file.path(APP_DIR, "data", "genome.json"),
    file.path(tmp, "genome.json")
  )
  writeBin(raw(64), file.path(tmp, "genome-chr1.bin"))
  broken <- load_genome(tmp)

  expect_error(chromosome(broken, "chr1"), "Regenerate it")
})

test_that("the payload carries one entry per gene and bin", {
  payload <- chromosome_payload(GENOME, "chr7")
  genes <- payload$genes

  expect_length(jsonlite::base64_dec(payload$start), genes * 4)
  expect_length(jsonlite::base64_dec(payload$length100), genes * 2)
  expect_length(jsonlite::base64_dec(payload$strand), genes)
  expect_length(jsonlite::base64_dec(payload$biotype), genes)
  expect_length(jsonlite::base64_dec(payload$coverage), payload$bins * 2)
})

test_that("the base64 carries no line breaks", {
  payload <- chromosome_payload(GENOME, "chr17")
  expect_false(grepl("\n", payload$start, fixed = TRUE))
  expect_false(grepl("\n", payload$coverage, fixed = TRUE))
})

test_that("gene names are built from the biotype and the index", {
  expect_equal(gene_name(0, 0), "PCG00000")
  expect_equal(gene_name(1, 42), "LNC00042")
  expect_equal(gene_name(3, 7999), "MIR07999")
})

test_that("an unknown biotype still produces a name", {
  expect_match(gene_name(99, 1), "^GEN")
})

test_that("R agrees with Python on the known gene details", {
  # The numbers on the right came from running tests/test_genome_tracks.py
  # against the same binary files.
  details <- gene_details(GENOME, "chr1", 0)

  expect_equal(details$name, "PCG00000")
  expect_equal(details$start, 14740)
  expect_equal(details$end, 26640)
  expect_equal(details$strand, "-")
  expect_equal(details$meanDepth, 17.5)
  expect_equal(details$neighboursWithinMb, 14L)
})

test_that("gene details answer what the client cannot work out", {
  details <- gene_details(GENOME, "chr1", 123)

  expect_equal(details$name, "PCG00123")
  expect_equal(details$end, details$start + details$length)
  expect_true(details$strand %in% c("+", "-"))
  expect_true(details$biotype %in% GENOME$biotypes)
  # These two are the reason the click goes to the server at all.
  expect_gt(details$meanDepth, 0)
  expect_gte(details$neighboursWithinMb, 0)
})

test_that("a gene index out of range gives nothing rather than an error", {
  expect_null(gene_details(GENOME, "chr1", 999999))
  expect_null(gene_details(GENOME, "chr1", -1))
})

test_that("the last gene on a chromosome still answers", {
  # The coverage window for the final gene runs to the end of the bins, so
  # this is where an off by one shows up.
  meta <- chromosome_meta(GENOME, "chr17")
  details <- gene_details(GENOME, "chr17", as.integer(meta$genes) - 1L)

  expect_false(is.null(details))
  expect_gte(details$meanDepth, 0)
})

test_that("reading a chromosome twice gives the same object", {
  expect_identical(chromosome(GENOME, "chr1"), chromosome(GENOME, "chr1"))
})
