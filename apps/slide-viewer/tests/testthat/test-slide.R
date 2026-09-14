# Layer one: the slide description, with no Shiny anywhere.
#
# These mirror tests/test_slide_viewer.py. Both servers describe the same
# slide, so the pinned numbers are where the two stop being assumed to agree.

test_that("the slide is the size it claims", {
  expect_equal(slide_payload()$gigapixels, 6.44)
})

test_that("the gigapixel count survives R integer arithmetic", {
  # WIDTH and HEIGHT are integers and their product is 6.4 billion, which
  # overflows R's 32 bit integer and silently becomes NA. Python has no such
  # limit and got the right answer, so this gap would have shipped.
  expect_false(is.na(slide_payload()$gigapixels))
  expect_gt(slide_payload()$gigapixels, 6)
})

test_that("the pyramid has enough levels to hold the slide", {
  expect_gte(2^max_level(), max(WIDTH, HEIGHT))
  expect_lt(2^(max_level() - 1L), max(WIDTH, HEIGHT))
  expect_equal(level_count(), max_level() + 1L)
})

test_that("the whole description fits in a small message", {
  # This is the claim in one number. A 6.4 gigapixel image, described in less
  # than four kilobytes.
  size <- nchar(jsonlite::toJSON(slide_payload(), auto_unbox = TRUE))
  expect_lt(size, 4000)
})

test_that("the payload carries the lobes and the regions", {
  payload <- slide_payload()

  expect_length(payload$lobes, 8L)
  expect_length(payload$regions, 12L)
  for (lobe in payload$lobes) {
    expect_setequal(names(lobe), c("x", "y", "rx", "ry", "angle", "density"))
  }
})

test_that("the payload never carries a measurement", {
  # If the counts ever ride along with the region list, clicking a marker
  # stops needing the server.
  for (region in slide_payload()$regions) {
    expect_null(region$nuclei)
    expect_null(region$mitoses)
    expect_null(region$confidence)
  }
})

test_that("every region sits inside the slide", {
  for (region in slide_regions()) {
    expect_gte(region$x, 0L)
    expect_gte(region$y, 0L)
    expect_lte(region$x + region$width, WIDTH)
    expect_lte(region$y + region$height, HEIGHT)
  }
})

test_that("region indices are unique and contiguous", {
  indices <- vapply(slide_regions(), function(r) r$index, integer(1))
  expect_equal(indices, seq_along(indices) - 1L)
})

test_that("R agrees with Python on the known region", {
  # The numbers on the right came from running tests/test_slide_viewer.py.
  detail <- region_detail(0)

  expect_equal(detail$label, "Tumour nest, high grade")
  expect_equal(detail$areaMm2, 0.1225)
  expect_equal(detail$nuclei, 392L)
  expect_equal(detail$nucleiPerMm2, 3200L)
  expect_equal(detail$mitoses, 0L)
  expect_equal(detail$meanNuclearArea, 28)
})

test_that("area follows the box and the scanner resolution", {
  # A 1400 pixel box at 0.25 microns per pixel is 350 microns on a side.
  detail <- region_detail(0)
  expect_lt(abs(detail$areaMm2 - (1400 * 0.25)^2 / 1e6), 1e-6)
})

test_that("an unknown region gives nothing rather than an error", {
  expect_null(region_detail(999))
  expect_null(region_detail(-1))
})

test_that("the deepest level is the scanner resolution", {
  deepest <- scale_bar(max_level())

  expect_equal(deepest$downsample, 1)
  expect_equal(deepest$micronsPerPixel, MICRONS_PER_PIXEL)
  expect_equal(deepest$magnification, MAGNIFICATION)
})

test_that("each level up halves the magnification", {
  deep <- scale_bar(max_level())
  one_up <- scale_bar(max_level() - 1L)

  expect_equal(one_up$micronsPerPixel, deep$micronsPerPixel * 2)
  expect_equal(one_up$magnification, deep$magnification / 2)
})
