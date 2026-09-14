# Layer one: the server logic, with no Shiny anywhere.
#
# These mirror tests/test_cell_atlas.py on purpose. Both servers read the same
# atlas.bin and must return the same numbers, so a test that passes in one
# language and fails in the other is exactly the bug worth catching.

test_that("the atlas loads the advertised number of cells", {
  expect_equal(ATLAS$n_cells, 200000L)
  expect_length(ATLAS$qx, 200000L)
  expect_length(ATLAS$qy, 200000L)
  expect_length(ATLAS$cluster, 200000L)
  expect_equal(dim(ATLAS$noise), c(4L, 200000L))
})

test_that("every cell belongs to a real cluster", {
  expect_gte(min(ATLAS$cluster), 0L)
  expect_lt(max(ATLAS$cluster), length(ATLAS$clusters))
})

test_that("a truncated binary is refused rather than read as garbage", {
  tmp <- withr::local_tempdir()
  file.copy(
    file.path(APP_DIR, "data", "atlas.json"),
    file.path(tmp, "atlas.json")
  )
  writeBin(raw(100), file.path(tmp, "atlas.bin"))

  expect_error(load_atlas(tmp), "Regenerate it")
})

test_that("the point payload carries one position per cell", {
  payload <- points_payload(ATLAS)

  # int16 per coordinate, so two bytes per cell per axis.
  expect_length(jsonlite::base64_dec(payload$x), ATLAS$n_cells * 2L)
  expect_length(jsonlite::base64_dec(payload$y), ATLAS$n_cells * 2L)
  expect_length(jsonlite::base64_dec(payload$cluster), ATLAS$n_cells)
  expect_length(payload$bounds, 4L)
  expect_equal(as.character(payload$genes), ATLAS$genes)
})

test_that("the base64 carries no line breaks", {
  # jsonlite::base64_enc() wraps at 72 characters by default. atob() in the
  # browser would still cope, but it inflates every payload and makes the two
  # servers send different bytes for the same data.
  payload <- points_payload(ATLAS)
  expect_false(grepl("\n", payload$x, fixed = TRUE))
  expect_false(grepl("\n", payload$cluster, fixed = TRUE))
})

test_that("expression is a byte per cell and uses the full range", {
  payload <- expression_payload(ATLAS, 0L, expression = EXPRESSION)
  values <- as.integer(jsonlite::base64_dec(payload$values))

  expect_length(values, ATLAS$n_cells)
  expect_equal(payload$gene, ATLAS$genes[[1]])
  # The brightest cell anchors the top of the ramp, or the legend lies.
  expect_equal(max(values), 255L)
  expect_gt(payload$max, 0)
})

test_that("a gene outside the panel is refused", {
  expect_error(
    expression_payload(ATLAS, 99L, expression = EXPRESSION),
    "out of range"
  )
})

test_that("dropout leaves a real share of cells at zero", {
  # Without dropout the coloring is a smooth gradient and looks synthetic.
  zero_share <- mean(EXPRESSION[1, ] == 0)
  expect_gt(zero_share, 0.1)
  expect_lt(zero_share, 0.7)
})

test_that("a selection survives the round trip to base64", {
  original <- c(0L, 7L, 199999L)
  encoded <- jsonlite::base64_enc(
    writeBin(original, raw(), size = 4L, endian = "little")
  )

  # decode_selection returns one based indices, ready to subset with.
  expect_equal(decode_selection(encoded, ATLAS$n_cells), original + 1L)
})

test_that("an empty selection is empty, not an error", {
  expect_length(decode_selection("", ATLAS$n_cells), 0L)
  expect_length(decode_selection(NULL, ATLAS$n_cells), 0L)
})

test_that("indices past the end are dropped rather than crashing", {
  stale <- c(5L, .Machine$integer.max)
  encoded <- jsonlite::base64_enc(
    writeBin(stale, raw(), size = 4L, endian = "little")
  )

  expect_equal(decode_selection(encoded, ATLAS$n_cells), 6L)
})

test_that("a selection that is not whole uint32s is refused", {
  encoded <- jsonlite::base64_enc(as.raw(c(1, 2, 3)))
  expect_error(
    decode_selection(encoded, ATLAS$n_cells),
    "whole number of uint32"
  )
})

test_that("selecting one cluster reports that cluster and its marker", {
  # NK cells are cluster 6 and their marker is NKG7. A lasso around them must
  # say so, or the app is telling a lie about data it does hold.
  nk <- which(ATLAS$cluster == 6L)
  stats <- selection_stats(ATLAS, nk, expression = EXPRESSION)

  expect_equal(stats$n, length(nk))
  expect_length(stats$composition, 1L)
  expect_equal(stats$composition[[1]]$name, "NK cells")
  expect_equal(stats$composition[[1]]$share, 1)

  expect_equal(stats$markers[[1]]$gene, "NKG7")
  expect_gt(stats$markers[[1]]$lfc, 1.5)
  expect_gt(stats$markers[[1]]$mean, stats$markers[[1]]$rest)
})

test_that("R agrees with Python on the same selection", {
  # The numbers on the right came from running tests/test_cell_atlas.py
  # against the same atlas.bin. Two servers reading one file have to produce
  # one answer, and this is where that stops being an assumption.
  nk <- which(ATLAS$cluster == 6L)[1:15000]
  stats <- selection_stats(ATLAS, nk, expression = EXPRESSION)
  lfc <- vapply(stats$markers, function(m) m$lfc, numeric(1))
  genes <- vapply(stats$markers, function(m) m$gene, character(1))

  expect_equal(genes, c("NKG7", "CD3D", "LYZ", "MS4A1"))
  expect_equal(round(lfc, 2), c(2.81, -2.05, -2.68, -3.03))
  expect_equal(
    round(expression_payload(ATLAS, 0L, expression = EXPRESSION)$max, 4),
    6.1107
  )
})

test_that("composition shares add up to one", {
  mixed <- seq(1L, ATLAS$n_cells, by = 37L)
  stats <- selection_stats(ATLAS, mixed, expression = EXPRESSION)

  shares <- vapply(stats$composition, function(c) c$share, numeric(1))
  counts <- vapply(stats$composition, function(c) c$n, numeric(1))
  expect_equal(sum(shares), 1)
  expect_equal(sum(counts), stats$n)
})

test_that("an empty selection summarizes to nothing", {
  stats <- selection_stats(ATLAS, integer(0), expression = EXPRESSION)

  expect_equal(stats$n, 0L)
  expect_length(stats$composition, 0L)
  expect_length(stats$markers, 0L)
})

test_that("selecting every cell does not divide by an empty outside", {
  stats <- selection_stats(
    ATLAS,
    seq_len(ATLAS$n_cells),
    expression = EXPRESSION
  )

  expect_equal(stats$n, ATLAS$n_cells)
  lfc <- vapply(stats$markers, function(m) m$lfc, numeric(1))
  expect_true(all(is.finite(lfc)))
})
