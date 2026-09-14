# Layer two: drive the reactive graph with no browser. testServer() sets an
# input and hands back exactly the JSON value the client would have received.
# Python has no equivalent, which is why the logic above is importable.

test_that("the histogram output answers a bins input", {
  shiny::testServer(server, {
    session$setInputs(bins = 6)

    expect_length(output$histogram_data$counts, 6)
    expect_equal(sum(output$histogram_data$counts), length(VALUES))
  })
})

test_that("no bins input yet produces NULL rather than an error", {
  shiny::testServer(server, {
    expect_null(output$histogram_data)
  })
})
