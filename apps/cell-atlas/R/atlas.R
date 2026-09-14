# Pure computation for the cell atlas. No Shiny here, so testthat can call
# these directly and shiny::testServer() can check the JSON the client gets.
#
# This is the R twin of cell_atlas.py. Both read the same atlas.bin, so the
# two servers show the identical point cloud and return the same numbers.

# jsonlite::base64_enc() wraps its output at 72 characters. atob() in the
# browser strips whitespace so it would still decode, but the newlines add
# about 1.4 percent to every payload and they make the R server send
# different bytes than the Python one for the same data. Strip them.
b64 <- function(raw_bytes) {
  gsub(
    "
",
    "",
    jsonlite::base64_enc(raw_bytes),
    fixed = TRUE
  )
}

# Read data/atlas.json and data/atlas.bin.
load_atlas <- function(data_dir) {
  meta <- jsonlite::fromJSON(
    file.path(data_dir, "atlas.json"),
    simplifyDataFrame = FALSE
  )
  n <- as.integer(meta$n_cells)
  genes <- unlist(meta$genes)
  n_genes <- length(genes)

  path <- file.path(data_dir, "atlas.bin")
  expected <- n * 2 + n * 2 + n + n * n_genes
  actual <- file.info(path)$size
  if (!isTRUE(actual == expected)) {
    stop(
      "atlas.bin is ",
      actual,
      " bytes, expected ",
      expected,
      " for ",
      n,
      " cells and ",
      n_genes,
      " genes. Regenerate it with tools/gen-data/cell-atlas.py."
    )
  }

  blob <- readBin(path, "raw", n = expected)

  # readBin on a raw vector needs the slice, not an offset.
  at <- 1L
  qx <- readBin(
    blob[at:(at + n * 2L - 1L)],
    "integer",
    n = n,
    size = 2L,
    signed = TRUE,
    endian = "little"
  )
  at <- at + n * 2L
  qy <- readBin(
    blob[at:(at + n * 2L - 1L)],
    "integer",
    n = n,
    size = 2L,
    signed = TRUE,
    endian = "little"
  )
  at <- at + n * 2L
  cluster <- as.integer(blob[at:(at + n - 1L)])
  at <- at + n
  noise <- matrix(
    as.integer(blob[at:(at + n * n_genes - 1L)]),
    nrow = n_genes,
    ncol = n,
    byrow = TRUE
  )

  structure(
    list(
      n_cells = n,
      bounds = unlist(meta$bounds),
      genes = genes,
      clusters = meta$clusters,
      raw = blob,
      qx = qx,
      qy = qy,
      cluster = cluster,
      noise = noise
    ),
    class = "atlas"
  )
}

# Expression for every gene in every cell, as a genes by cells matrix.
#
# Derived rather than stored: one uniform noise byte per cell becomes a
# dropout and a spread around the mean for that cell's cluster. Dropout is the
# zero heavy part of single cell counts, and a gene with a low mean drops out
# more often. That is what makes a gene coloring look like real data instead
# of a smooth gradient.
#
# Matches the numpy version in cell_atlas.py element for element.
# app.R computes this once at startup and passes it back in, because R is
# single threaded and the gallery must not block every other session while one
# app builds a matrix.
atlas_expression <- function(atlas) {
  n_genes <- length(atlas$genes)
  # profiles: genes by clusters
  profiles <- vapply(
    atlas$clusters,
    function(cl) as.numeric(unlist(cl$profile)),
    numeric(n_genes)
  )
  # Matrix first: pmin() takes its dimensions from the first argument, and a
  # scalar first would silently return a plain vector.
  dropouts <- pmin(0.55 * exp(-profiles) + 0.08, 0.95)

  # Cluster index is zero based in the file, and R indexes from one.
  pick <- atlas$cluster + 1L
  mean_by_cell <- profiles[, pick, drop = FALSE]
  drop_by_cell <- dropouts[, pick, drop = FALSE]

  u <- (atlas$noise + 0.5) / 256
  kept <- u >= drop_by_cell
  scaled <- ifelse(kept, (u - drop_by_cell) / (1 - drop_by_cell), 0)
  ifelse(kept, mean_by_cell * (0.5 + 1.2 * scaled), 0)
}

# Everything the client needs to draw the atlas, sent once.
#
# Positions stay quantized. The client dequantizes with bounds, which is one
# multiply per coordinate and halves what crosses the wire against float32.
# The bytes are sliced straight out of the file rather than re-encoded, so
# this costs nothing but the base64.
points_payload <- function(atlas) {
  n <- atlas$n_cells
  list(
    n_cells = n,
    bounds = I(atlas$bounds),
    genes = I(atlas$genes),
    clusters = atlas$clusters,
    x = b64(atlas$raw[1:(n * 2L)]),
    y = b64(atlas$raw[(n * 2L + 1L):(n * 4L)]),
    cluster = b64(atlas$raw[(n * 4L + 1L):(n * 5L)])
  )
}

# One gene's expression, quantized to a byte per cell for the wire.
#
# The client only maps this onto a color ramp, so 256 levels is finer than the
# eye resolves. max carries the real scale for the legend.
expression_payload <- function(atlas, gene, expression = NULL) {
  n_genes <- length(atlas$genes)
  if (gene < 0 || gene >= n_genes) {
    stop("gene ", gene, " is out of range for ", n_genes, " genes")
  }

  if (is.null(expression)) {
    expression <- atlas_expression(atlas)
  }
  values <- expression[gene + 1L, ]
  top <- max(values)

  packed <- if (top <= 0) {
    rep(0L, atlas$n_cells)
  } else {
    pmin(255L, pmax(0L, as.integer(round(values * (255 / top)))))
  }

  list(
    gene = atlas$genes[[gene + 1L]],
    max = top,
    values = b64(as.raw(packed))
  )
}

# Turn the client's base64 Uint32Array of cell indices into an integer vector.
#
# The client sends indices rather than the lasso polygon, because
# regl-scatterplot already knows which points it caught. Returns one based
# indices, ready to subset with.
decode_selection <- function(encoded, n_cells) {
  if (is.null(encoded) || !nzchar(encoded)) {
    return(integer(0))
  }

  raw_bytes <- jsonlite::base64_dec(encoded)
  if (length(raw_bytes) %% 4L != 0L) {
    stop(
      "selection is ",
      length(raw_bytes),
      " bytes, which is not a whole number of uint32"
    )
  }

  indices <- readBin(
    raw_bytes,
    "integer",
    n = length(raw_bytes) %/% 4L,
    size = 4L,
    signed = TRUE,
    endian = "little"
  )
  # A stale selection can outlive a reload. Drop what cannot be a cell rather
  # than failing the whole output. Negative values mean an index above 2^31,
  # which no atlas this size can produce.
  indices <- indices[indices >= 0L & indices < n_cells]
  indices + 1L
}

# Summarize a lasso selection across every gene.
#
# This is the part the server is for. The client knows which cells are
# selected, but only the server holds the expression matrix.
selection_stats <- function(atlas, indices, expression = NULL) {
  n <- length(indices)
  if (n == 0L) {
    return(list(n = 0L, composition = I(list()), markers = I(list())))
  }

  n_clusters <- length(atlas$clusters)
  counts <- tabulate(atlas$cluster[indices] + 1L, nbins = n_clusters)

  keep <- which(counts > 0L)
  keep <- keep[order(counts[keep], decreasing = TRUE)]
  composition <- lapply(keep, function(c) {
    list(
      name = atlas$clusters[[c]]$name,
      color = atlas$clusters[[c]]$color,
      n = counts[[c]],
      share = counts[[c]] / n
    )
  })

  if (is.null(expression)) {
    expression <- atlas_expression(atlas)
  }
  inside <- rowMeans(expression[, indices, drop = FALSE])
  outside_n <- atlas$n_cells - n
  outside <- if (outside_n > 0L) {
    (rowSums(expression) - inside * n) / outside_n
  } else {
    rep(0, length(inside))
  }

  # log2 fold change against everything not selected, with a pseudocount so a
  # silent gene does not divide by zero.
  lfc <- log2((inside + 0.05) / (outside + 0.05))

  order_by_lfc <- order(lfc, decreasing = TRUE)
  markers <- lapply(order_by_lfc, function(g) {
    list(
      gene = atlas$genes[[g]],
      mean = inside[[g]],
      rest = outside[[g]],
      lfc = lfc[[g]]
    )
  })

  list(n = n, composition = I(composition), markers = I(markers))
}
