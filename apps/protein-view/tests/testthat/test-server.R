# Layer two: drive the reactive graph with no browser.
#
# The interesting one here is active_style. A hosted Shiny widget writes
# input$style, and the client cannot read that directly: useShinyInputValue
# only sees ids a shinyreact producer registered. The server echoes it back
# as an output, and that echo is what makes the widget usable from React.

test_that("the structure is sent without waiting for any input", {
  shiny::testServer(server, {
    expect_equal(output$structure$pdbId, "1UBQ")
    expect_length(output$structure$residues, 76L)
    expect_true(startsWith(output$structure$text, "HEADER"))
  })
})

test_that("the fold summary is sent without waiting for any input", {
  shiny::testServer(server, {
    expect_equal(output$fold$helix, 16L)
    expect_equal(output$fold$sheet, 33L)
  })
})

test_that("the hosted widget's value is echoed back to the client", {
  shiny::testServer(server, {
    session$setInputs(style = "sphere")
    expect_equal(output$active_style, "sphere")
  })
})

test_that("the echo falls back before the widget has rendered", {
  # The select is rendered by the server, so on the first flush there is no
  # input$style yet. Without a fallback the viewer would have no style at all
  # and draw nothing.
  shiny::testServer(server, {
    expect_equal(output$active_style, "cartoon")
  })
})

test_that("nothing clicked means no residue detail", {
  shiny::testServer(server, {
    session$setInputs(residue_click = -1L)
    expect_null(output$residue)
  })
})

test_that("clicking a residue returns what needs the whole structure", {
  shiny::testServer(server, {
    session$setInputs(residue_click = 23L)

    expect_equal(output$residue$code, "ILE")
    expect_equal(output$residue$bPercentile, 42.7)
  })
})

test_that("a stale residue number does not take the output down", {
  shiny::testServer(server, {
    session$setInputs(residue_click = 999L)
    expect_null(output$residue)
  })
})
