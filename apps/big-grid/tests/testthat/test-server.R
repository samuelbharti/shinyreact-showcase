# Layer two: drive the reactive graph with no browser.

test_that("the spec is sent without waiting for any input", {
  shiny::testServer(server, {
    expect_equal(output$spec$rows, N_ROWS)
    expect_length(output$spec$regions, 6L)
  })
})

test_that("no query means the server stays idle", {
  # In browser mode the client sends nothing, and the server must do nothing.
  # If these ever start answering, the comparison in this app stops meaning
  # anything because both paths would be running.
  shiny::testServer(server, {
    expect_null(output$page)
    expect_null(output$server_totals)
  })
})

test_that("a query comes back as one page", {
  shiny::testServer(server, {
    session$setInputs(
      grid_query = list(
        sortBy = "amount",
        descending = TRUE,
        limit = 5
      )
    )

    expect_equal(output$page$total, N_ROWS)
    expect_length(output$page$rows, 5L)
    expect_equal(output$page$rows[[1]]$id, 287216L)
  })
})

test_that("the same query totals the whole match, not the page", {
  shiny::testServer(server, {
    session$setInputs(grid_query = list(regions = list(0), limit = 5))

    expect_gt(output$server_totals$rows, 5L)
    expect_equal(output$server_totals$rows, output$page$total)
  })
})
