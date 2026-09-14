# Layer one: the trip generator and the hexagon summary, with no Shiny.
#
# These mirror tests/test_city_density.py. Both servers generate their own
# trips from the same hash, so the pinned summary below is where the two stop
# being assumed to agree.

test_that("the hash stays inside zero to one", {
  values <- hash_unit(0:19999, 3)

  expect_gte(min(values), 0)
  expect_lt(max(values), 1)
})

test_that("the hash actually spreads", {
  # A hash that clumps would put every trip in the same place.
  values <- hash_unit(0:19999, 1)
  counts <- tabulate(pmin(floor(values * 10) + 1, 10), nbins = 10)

  expect_gt(min(counts), 1500)
  expect_lt(max(counts), 2500)
})

test_that("every trip is inside the city bounds", {
  expect_gte(min(CITY$lng), BOUNDS[[1]])
  expect_lte(max(CITY$lng), BOUNDS[[3]])
  expect_gte(min(CITY$lat), BOUNDS[[2]])
  expect_lte(max(CITY$lat), BOUNDS[[4]])
})

test_that("the tails are clamped so the map has empty space", {
  # Unclamped normals reach halfway across the county, which puts a stray
  # trip in every hexagon and turns the map into an even smear.
  expect_lt(max(CITY$lng) - min(CITY$lng), BOUNDS[[3]] - BOUNDS[[1]])
})

test_that("districts get roughly the share they asked for", {
  counts <- tabulate(CITY$district + 1L, nbins = length(DISTRICTS))
  shares <- counts / sum(counts)

  for (i in seq_along(DISTRICTS)) {
    expect_lt(abs(shares[[i]] - DISTRICTS[[i]][[5]]), 0.01)
  }
})

test_that("hours are hours", {
  hours <- city_hour(CITY)
  expect_gte(min(hours), 0)
  expect_lte(max(hours), 23)
})

test_that("fares and durations are positive", {
  expect_gt(min(city_fare(CITY)), 0)
  expect_gt(min(city_duration(CITY)), 0)
})

test_that("fares have a long right tail", {
  fares <- city_fare(CITY)
  expect_gt(mean(fares), stats::median(fares))
})

test_that("an unknown metric is refused", {
  expect_error(city_metric(CITY, "altitude"), "Unknown metric")

  for (name in METRICS) {
    expect_length(city_metric(CITY, name), CITY$n)
  }
})

test_that("the payload carries one position per trip", {
  payload <- points_payload(CITY)

  expect_length(jsonlite::base64_dec(payload$lng), CITY$n * 2)
  expect_length(jsonlite::base64_dec(payload$lat), CITY$n * 2)
  expect_equal(payload$n, CITY$n)
  expect_length(payload$bounds, 4L)
})

test_that("the payload never carries an attribute", {
  # The whole split rests on this. If fares ever ride along with the
  # positions, the server stops being needed and the app stops making its
  # point.
  payload <- points_payload(CITY)

  expect_null(payload$fare)
  expect_null(payload$duration)
  expect_null(payload$hour)
})

test_that("the base64 carries no line breaks", {
  payload <- points_payload(CITY)
  expect_false(grepl("\n", payload$lng, fixed = TRUE))
})

test_that("the boundary loads and has a river", {
  boundary <- load_boundary(file.path(APP_DIR, "data"))
  kinds <- sort(vapply(
    boundary$features,
    function(f) f$properties$kind,
    character(1)
  ))

  expect_equal(kinds, c("boundary", "river"))
})

test_that("a hexagon over the centre is mostly central", {
  summary <- hexagon_summary(CITY, CENTER_LNG, CENTER_LAT + 0.004, 400)

  expect_gt(summary$count, 1000)
  expect_equal(summary$districts[[1]]$name, "Central")
  expect_equal(sum(summary$hours), summary$count)
})

test_that("R agrees with Python on the known hexagon", {
  # The numbers on the right came from running tests/test_city_density.py.
  # Two servers generating the same city have to produce one answer.
  summary <- hexagon_summary(CITY, CENTER_LNG, CENTER_LAT + 0.004, 400)

  expect_equal(summary$count, 4690L)
  expect_equal(summary$districts[[1]]$name, "Central")
  expect_equal(summary$districts[[1]]$n, 3937L)
  expect_equal(summary$fare$mean, 15.25)
  expect_equal(summary$fare$median, 14.27)
  expect_equal(summary$fare$p90, 22.65)
  expect_equal(summary$duration$mean, 18.7)
  expect_equal(summary$duration$median, 17.9)
})

test_that("an empty hexagon summarizes to nothing", {
  # Somewhere in the North Sea.
  summary <- hexagon_summary(CITY, 2.5, 54.0, 200)

  expect_equal(summary$count, 0L)
  expect_null(summary$fare)
  expect_length(summary$hours, 0L)
})
