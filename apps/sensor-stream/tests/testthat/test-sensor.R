# Layer one: the signal generator, with no Shiny anywhere.
#
# These mirror tests/test_sensor_stream.py. Both servers generate their own
# readings, so the pinned numbers below are what stops the two deployments
# quietly drawing different traces.

test_that("there is one reading per channel", {
  expect_length(as.numeric(reading(0)), length(channels()))
})

test_that("every channel is labelled and colored", {
  for (ch in channels()) {
    expect_true(nzchar(ch$name))
    expect_true(nzchar(ch$unit))
    expect_match(ch$color, "^#")
  }
})

test_that("the same tick always gives the same reading", {
  expect_equal(as.numeric(reading(1234)), as.numeric(reading(1234)))
})

test_that("different ticks give different readings", {
  expect_false(isTRUE(all.equal(
    as.numeric(reading(0)),
    as.numeric(reading(1))
  )))
})

test_that("R agrees with Python on the known readings", {
  # The numbers on the right came from running tests/test_sensor_stream.py.
  expect_equal(as.numeric(reading(0)), c(21.28, 101.2112, 1.6163, 47.7233))
  expect_equal(as.numeric(reading(100)), c(22.072, 103.0582, 1.1932, 52.1029))
})

test_that("jitter stays inside minus one to one", {
  values <- as.numeric(outer(0:499, 0:3, Vectorize(jitter_value)))

  expect_gte(min(values), -1)
  expect_lte(max(values), 1)
})

test_that("jitter actually varies", {
  # A hash that collapses to one value would make every trace a clean sine.
  values <- vapply(0:199, function(t) round(jitter_value(t, 0), 6), numeric(1))

  expect_gt(length(unique(values)), 150)
})

test_that("readings stay near their channel base", {
  bases <- c(21.5, 101.3, 1.9, 48.0)
  for (tick in seq(0, 5000, by = 7)) {
    values <- as.numeric(reading(tick))
    expect_true(all(abs(values - bases) < 15), info = paste("tick", tick))
  }
})

test_that("a rate the client invented is clamped", {
  expect_equal(clamp_rate(0), MIN_HZ)
  expect_equal(clamp_rate(-5), MIN_HZ)
  expect_equal(clamp_rate(10000), MAX_HZ)
  expect_equal(clamp_rate(NULL), 10L)
  expect_equal(clamp_rate(12), 12L)
})

test_that("the interval matches the clamped rate", {
  expect_equal(interval_ms(10), 100)
  expect_equal(interval_ms(0), 1000 / MIN_HZ)
  expect_equal(interval_ms(10000), 1000 / MAX_HZ)
})
