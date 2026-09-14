# Layer two: drive the reactive graph with no browser.
#
# The one worth having here is the output that stays silent. The whole claim
# is that dragging a brush costs nothing, so the server must answer only when
# a brush is released. If `fitted` starts answering on its own, every pointer
# move is costing a fit nobody asked for.

test_that("the summary is sent without waiting for any input", {
  shiny::testServer(server, {
    expect_equal(output$summary$stars, STAR_COUNT)
    expect_equal(as.character(output$summary$populations), POPULATIONS)
    expect_equal(output$summary$apparentLimit, APPARENT_LIMIT)
    expect_equal(names(output$summary$ranges), names(SCALES))
  })
})

test_that("the catalogue is sent without waiting for any input", {
  shiny::testServer(server, {
    expect_equal(output$catalogue$stars, STAR_COUNT)
    expect_equal(nchar(output$catalogue$colour), 106668L)
    expect_equal(output$catalogue$scales$colour, SCALES$colour)
  })
})

test_that("with no brush the server fits nothing at all", {
  # This is the assertion that guards the claim. Everything the four panels
  # draw before a brush is released came out of the browser.
  shiny::testServer(server, {
    expect_null(output$fitted)
  })
})

test_that("a released brush costs exactly one answer", {
  shiny::testServer(server, {
    session$setInputs(
      brushes = list(
        hr = list(x0 = -0.1507, x1 = 0.846, y0 = 9.4116, y1 = 16.0644)
      )
    )

    expect_equal(output$fitted$stars, 2110L)
    expect_equal(output$fitted$medianParsecs, 4.43)
    expect_equal(output$fitted$fit$slope, 4.5996)
  })
})

test_that("adding a second brush narrows what the server fits", {
  shiny::testServer(server, {
    session$setInputs(
      brushes = list(
        hr = list(x0 = -0.1507, x1 = 0.846, y0 = 9.4116, y1 = 16.0644)
      )
    )
    expect_equal(output$fitted$stars, 2110L)

    session$setInputs(
      brushes = list(
        hr = list(x0 = -0.1507, x1 = 0.846, y0 = 9.4116, y1 = 16.0644),
        distance = list(x0 = 0.254, x1 = 1.541)
      )
    )
    expect_equal(output$fitted$stars, 1901L)
    expect_equal(output$fitted$fit$slope, 4.4915)
  })
})

test_that("a one dimensional brush carries no y edges and is still applied", {
  # The two histogram panels send x only. A server that insisted on y would
  # either error or quietly ignore the panel.
  shiny::testServer(server, {
    session$setInputs(brushes = list(distance = list(x0 = 0.254, x1 = 1.541)))
    expect_lt(output$fitted$stars, STAR_COUNT)
    expect_gt(output$fitted$stars, 0L)
  })
})

test_that("clearing every brush goes back to the whole catalogue", {
  shiny::testServer(server, {
    session$setInputs(brushes = list(distance = list(x0 = 0.254, x1 = 1.541)))
    expect_lt(output$fitted$stars, STAR_COUNT)

    session$setInputs(brushes = NULL)
    expect_null(output$fitted)
  })
})

test_that("a brush over empty sky answers with a count and no fit", {
  shiny::testServer(server, {
    session$setInputs(
      brushes = list(hr = list(x0 = 9, x1 = 9.1, y0 = 0, y1 = 1))
    )
    expect_equal(output$fitted$stars, 0L)
    expect_false("fit" %in% names(output$fitted))
  })
})

test_that("the page is built from this app directory, not the working one", {
  # APP_DIR is what the gallery sets before sourcing app.R. If src_dir ever
  # became relative, the app would serve the gallery's www/ instead.
  expect_true(file.exists(file.path(APP_DIR, "www", "ui.js")))
  expect_true(is.function(server))
})
