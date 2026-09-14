# Layer one: the price series and the window numbers, with no Shiny.
#
# These mirror tests/test_market_candles.py. Both servers build the series
# from the same hash, so the pinned values are where the two stop being
# assumed to agree.

SERIES <- load_series("ACME")

test_that("the catalog is small and names every symbol", {
  body <- catalog()

  expect_lt(nchar(jsonlite::toJSON(body, auto_unbox = TRUE)), 400)
  expect_equal(as.character(body$symbols), symbol_names())
  expect_length(body$symbols, 6L)
})

test_that("the hash stays inside zero to one", {
  values <- hash_unit(0:19999, 11)
  expect_gte(min(values), 0)
  expect_lt(max(values), 1)
})

test_that("the series is the length it claims", {
  expect_length(SERIES$time, BAR_COUNT)
  expect_length(SERIES$close, BAR_COUNT)
})

test_that("a candle is a candle", {
  # High is the highest and low is the lowest, on every bar. A wick the wrong
  # way round draws a chart that looks almost right.
  expect_true(all(SERIES$high >= SERIES$open))
  expect_true(all(SERIES$high >= SERIES$close))
  expect_true(all(SERIES$low <= SERIES$open))
  expect_true(all(SERIES$low <= SERIES$close))
})

test_that("each bar opens where the last one closed", {
  n <- length(SERIES$close)
  expect_equal(SERIES$open[-1], SERIES$close[-n])
})

test_that("prices stay positive", {
  expect_gt(min(SERIES$low), 0)
})

test_that("R agrees with Python on the first bar", {
  expect_equal(SERIES$open[[1]], 142.5)
  expect_equal(SERIES$high[[1]], 142.5273)
  expect_equal(SERIES$low[[1]], 142.1498)
  expect_equal(SERIES$close[[1]], 142.303)
  expect_equal(SERIES$volume[[1]], 3462)
})

test_that("an unknown symbol is refused", {
  expect_error(load_series("NOPE"), "No symbol called")
})

test_that("symbols differ from each other", {
  cygn <- load_series("CYGN")
  expect_false(isTRUE(all.equal(SERIES$close[1:100], cygn$close[1:100])))
})

test_that("the payload carries every bar", {
  payload <- series_payload(SERIES)

  for (field in c("open", "high", "low", "close", "volume")) {
    expect_length(jsonlite::base64_dec(payload[[field]]), BAR_COUNT * 4L)
  }
  expect_equal(payload$scale, 100L)
})

test_that("the base64 carries no line breaks", {
  payload <- series_payload(SERIES)
  expect_false(grepl("\n", payload$close, fixed = TRUE))
})

test_that("R agrees with Python on the window stats", {
  stats <- window_stats(SERIES, 0, 389)

  expect_equal(stats$bars, 390L)
  expect_equal(stats$open, 142.5)
  expect_equal(stats$close, 143.3093)
  expect_equal(stats$change, 0.8093)
  expect_equal(stats$changePercent, 0.568)
  expect_equal(stats$maxDrawdown, -1.22)
})

test_that("window stats clamp to the series", {
  # The client sends bar indices from a chart that can be scrolled past the
  # ends. Out of range must clamp rather than fail.
  stats <- window_stats(SERIES, -500, BAR_COUNT + 500)

  expect_equal(stats$first, 0L)
  expect_equal(stats$last, BAR_COUNT - 1L)
  expect_equal(stats$bars, BAR_COUNT)
})

test_that("a single bar window is allowed", {
  stats <- window_stats(SERIES, 100, 100)

  expect_equal(stats$bars, 1L)
  expect_lte(stats$maxDrawdown, 0)
})

test_that("drawdown is never positive", {
  for (window in list(c(0, 100), c(1000, 5000), c(0, BAR_COUNT - 1L))) {
    expect_lte(window_stats(SERIES, window[[1]], window[[2]])$maxDrawdown, 0)
  }
})

test_that("the volume total survives R integer arithmetic", {
  # A wide window sums past two billion, which overflows R's 32 bit integer
  # to NA with only a warning and blanks the number on screen.
  stats <- window_stats(SERIES, 0, BAR_COUNT - 1L)

  expect_false(is.na(stats$volume))
  expect_gt(stats$volume, 0)
})

test_that("the server can draw the window", {
  path <- withr::local_tempfile(fileext = ".png")
  png(path, width = 900, height = 360)
  render_window(SERIES, 0, 389)
  dev.off()

  expect_gt(file.info(path)$size, 5000)
})

test_that("the server thins a wide window", {
  path <- withr::local_tempfile(fileext = ".png")
  png(path, width = 900, height = 360)
  render_window(SERIES, 0, BAR_COUNT - 1L)
  dev.off()

  expect_gt(file.info(path)$size, 5000)
})
