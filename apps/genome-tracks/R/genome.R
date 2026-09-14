# Pure computation for the genome browser. No Shiny here.
#
# The R twin of genome_tracks.py. Both read the same binary files, so the two
# servers send the same bytes and answer a gene click with the same numbers.

BIOTYPE_PREFIX <- c("PCG", "LNC", "PSG", "MIR")

# Read the metadata only. Chromosomes are read when asked for.
load_genome <- function(data_dir) {
  meta <- jsonlite::fromJSON(
    file.path(data_dir, "genome.json"),
    simplifyDataFrame = FALSE
  )
  list(
    data_dir = data_dir,
    biotypes = unlist(meta$biotypes),
    chromosomes = meta$chromosomes,
    cache = new.env(parent = emptyenv())
  )
}

genome_names <- function(genome) {
  vapply(genome$chromosomes, function(c) c$name, character(1))
}

chromosome_meta <- function(genome, name) {
  for (chrom in genome$chromosomes) {
    if (identical(chrom$name, name)) {
      return(chrom)
    }
  }
  stop("No chromosome called ", name)
}

# Parse one chromosome file. Cached in the genome's own environment, because
# a reader may come back to a chromosome they already visited.
chromosome <- function(genome, name) {
  hit <- genome$cache[[name]]
  if (!is.null(hit)) {
    return(hit)
  }

  meta <- chromosome_meta(genome, name)
  genes <- as.integer(meta$genes)
  bins <- as.integer(meta$bins)

  path <- file.path(genome$data_dir, paste0("genome-", name, ".bin"))
  expected <- genes * 4 + genes * 2 + genes + genes + bins * 2
  actual <- file.info(path)$size
  if (!isTRUE(actual == expected)) {
    stop(
      "genome-",
      name,
      ".bin is ",
      actual,
      " bytes, expected ",
      expected,
      ". Regenerate it with tools/gen-data/genome-tracks.py."
    )
  }

  blob <- readBin(path, "raw", n = expected)

  at <- 1L
  # R has no unsigned 32 bit integer. These positions reach 249 million, well
  # inside a double, so read them as doubles rather than risk an overflow to
  # NA on a signed integer.
  start <- readBin(
    blob[at:(at + genes * 4L - 1L)],
    "integer",
    n = genes,
    size = 4L,
    signed = TRUE,
    endian = "little"
  )
  start <- as.numeric(start)
  start[start < 0] <- start[start < 0] + 2^32
  at <- at + genes * 4L

  length100 <- readBin(
    blob[at:(at + genes * 2L - 1L)],
    "integer",
    n = genes,
    size = 2L,
    signed = FALSE,
    endian = "little"
  )
  at <- at + genes * 2L

  strand <- as.integer(blob[at:(at + genes - 1L)])
  at <- at + genes
  biotype <- as.integer(blob[at:(at + genes - 1L)])
  at <- at + genes

  coverage <- readBin(
    blob[at:(at + bins * 2L - 1L)],
    "integer",
    n = bins,
    size = 2L,
    signed = FALSE,
    endian = "little"
  )

  chrom <- list(
    name = name,
    span = as.numeric(meta$span),
    genes = genes,
    bins = bins,
    start = start,
    length = as.numeric(length100) * 100,
    strand = strand,
    biotype = biotype,
    coverage = coverage,
    raw = blob
  )
  genome$cache[[name]] <- chrom
  chrom
}

# jsonlite::base64_enc() wraps at 72 characters. atob() would still cope, but
# the newlines inflate every payload and make the R server send different
# bytes than the Python one for the same data.
b64 <- function(raw_bytes) {
  gsub("\n", "", jsonlite::base64_enc(raw_bytes), fixed = TRUE)
}

# One whole chromosome, sent once.
#
# The blocks are sliced straight out of the file rather than rebuilt, so this
# costs only the base64. Everything after it is the client's job.
chromosome_payload <- function(genome, name) {
  chrom <- chromosome(genome, name)
  genes <- chrom$genes
  bins <- chrom$bins

  at <- 1L
  start_block <- chrom$raw[at:(at + genes * 4L - 1L)]
  at <- at + genes * 4L
  length_block <- chrom$raw[at:(at + genes * 2L - 1L)]
  at <- at + genes * 2L
  strand_block <- chrom$raw[at:(at + genes - 1L)]
  at <- at + genes
  biotype_block <- chrom$raw[at:(at + genes - 1L)]
  at <- at + genes
  coverage_block <- chrom$raw[at:(at + bins * 2L - 1L)]

  list(
    name = chrom$name,
    span = chrom$span,
    genes = genes,
    bins = bins,
    biotypes = I(genome$biotypes),
    start = b64(start_block),
    length100 = b64(length_block),
    strand = b64(strand_block),
    biotype = b64(biotype_block),
    coverage = b64(coverage_block)
  )
}

# A stable name for a gene, built rather than stored.
#
# The client builds the same name from the same two numbers, so no table of
# eight thousand strings has to cross the wire. biotype is zero based, as it
# is in the file and in Python.
gene_name <- function(biotype, index) {
  prefix <- if (biotype < length(BIOTYPE_PREFIX)) {
    BIOTYPE_PREFIX[[biotype + 1L]]
  } else {
    "GEN"
  }
  paste0(prefix, formatC(index, width = 5, flag = "0"))
}

# Everything about one gene, which is a question only the server can answer.
#
# Clicking a gene is a request for data. Panning is not, and does not come
# here. index is zero based, matching the client and the Python server.
gene_details <- function(genome, name, index) {
  chrom <- chromosome(genome, name)
  if (index < 0 || index >= chrom$genes) {
    return(NULL)
  }

  at <- index + 1L
  start <- chrom$start[[at]]
  length <- chrom$length[[at]]
  biotype <- chrom$biotype[[at]]

  # Mean read depth across the bins this gene covers.
  per_bin <- chrom$span / chrom$bins
  first_bin <- floor(start / per_bin)
  last_bin <- min(chrom$bins - 1, floor((start + length) / per_bin))
  window <- chrom$coverage[(first_bin + 1L):(last_bin + 1L)]
  depth <- if (length(window)) mean(window) else 0

  # How crowded this neighbourhood is, which is the sort of thing a browser
  # makes you squint at and a server can just count.
  margin <- 1e6
  nearby <- sum(chrom$start > start - margin & chrom$start < start + margin) -
    1L

  list(
    index = index,
    name = gene_name(biotype, index),
    chromosome = chrom$name,
    start = start,
    end = start + length,
    length = length,
    strand = if (chrom$strand[[at]] == 1L) "+" else "-",
    biotype = genome$biotypes[[biotype + 1L]],
    meanDepth = round(depth, 1),
    neighboursWithinMb = nearby
  )
}
