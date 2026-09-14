# Layer two: drive the reactive graph with no browser.

test_that("the slide description is sent without waiting for any input", {
  shiny::testServer(server, {
    # Reads no input, so zooming and panning never come near it.
    expect_equal(output$slide$width, WIDTH)
    expect_equal(output$slide$gigapixels, 6.44)
    expect_length(output$slide$regions, 12L)
  })
})

test_that("nothing picked means no measurements", {
  shiny::testServer(server, {
    session$setInputs(picked_region = -1L)
    expect_null(output$region_detail)
  })
})

test_that("picking a region returns what the client was not sent", {
  shiny::testServer(server, {
    session$setInputs(picked_region = 0L)

    expect_equal(output$region_detail$label, "Tumour nest, high grade")
    expect_equal(output$region_detail$nuclei, 392L)
  })
})

test_that("a stale region index does not take the output down", {
  shiny::testServer(server, {
    session$setInputs(picked_region = 999L)
    expect_null(output$region_detail)
  })
})
