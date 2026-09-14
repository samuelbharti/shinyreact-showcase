# Layer two: drive the reactive graph with no browser.
#
# The one worth having here is the pair that stay silent. In browser mode
# the chart owns the view, and the server must not be drawing anything. If
# these start answering, every pan is costing a render nobody asked for.

test_that("the catalog is sent without waiting for any input", {
  shiny::testServer(server, {
    expect_length(output$catalog$symbols, 6L)
    expect_equal(output$catalog$bars, BAR_COUNT)
  })
})

test_that("choosing a symbol sends that symbol", {
  shiny::testServer(server, {
    session$setInputs(symbol = "CYGN")

    expect_equal(output$series$symbol, "CYGN")
    expect_equal(output$series$bars, BAR_COUNT)
    expect_true(nzchar(output$series$close))
  })
})

test_that("no symbol yet sends nothing", {
  shiny::testServer(server, {
    session$setInputs(symbol = "")
    expect_null(output$series)
  })
})

test_that("with the comparison off the server draws nothing", {
  shiny::testServer(server, {
    session$setInputs(
      symbol = "ACME",
      compare = FALSE,
      visible = list(first = 0, last = 389)
    )

    expect_null(output$window)
  })
})

test_that("with the comparison on the server answers the same window", {
  shiny::testServer(server, {
    session$setInputs(
      symbol = "ACME",
      compare = TRUE,
      visible = list(first = 0, last = 389)
    )

    expect_equal(output$window$bars, 390L)
    expect_equal(output$window$close, 143.3093)
  })
})

test_that("a window with no symbol does not take the output down", {
  shiny::testServer(server, {
    session$setInputs(compare = TRUE, visible = list(first = 0, last = 10))
    expect_null(output$window)
  })
})
