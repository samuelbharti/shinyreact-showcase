# Layer two: drive the reactive graph with no browser.

test_that("the positions are sent without waiting for any input", {
  shiny::testServer(server, {
    # Reads no input, so Shiny sends it on connect. If it ever starts
    # depending on one, the map stays empty forever.
    expect_equal(output$trip_points$n, CITY$n)
    expect_true(nzchar(output$trip_points$lng))
    expect_false(is.null(output$trip_points$boundary))
  })
})

test_that("nothing picked means no summary", {
  shiny::testServer(server, {
    expect_null(output$hex_summary)
  })
})

test_that("picking a hexagon returns what only the server knows", {
  shiny::testServer(server, {
    session$setInputs(
      picked_hex = list(
        lng = CENTER_LNG,
        lat = CENTER_LAT + 0.004,
        radius = 400
      )
    )

    expect_equal(output$hex_summary$count, 4690L)
    expect_equal(output$hex_summary$districts[[1]]$name, "Central")
    expect_false(is.null(output$hex_summary$fare))
  })
})

test_that("picking empty water returns a zero count, not an error", {
  shiny::testServer(server, {
    session$setInputs(picked_hex = list(lng = 2.5, lat = 54.0, radius = 200))

    expect_equal(output$hex_summary$count, 0L)
  })
})
