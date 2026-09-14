# Layer two: drive the reactive graph with no browser.

test_that("the catalogue is sent without waiting for any input", {
  shiny::testServer(server, {
    expect_length(output$catalogue$scenarios, length(SCENARIOS))
    expect_equal(output$catalogue$nodeCount, 14L)
  })
})

test_that("the network is solved before the client has chosen anything", {
  # input$scenario is NULL until the first message from the browser. Falling
  # back rather than erroring is what lets the diagram paint on the first
  # frame instead of after a round trip.
  shiny::testServer(server, {
    expect_equal(output$flows$scenario, "baseline")
    expect_equal(output$flows$delivered, 980)
  })
})

test_that("choosing a scenario solves that one", {
  shiny::testServer(server, {
    session$setInputs(scenario = "port-closed")
    expect_equal(output$flows$scenario, "port-closed")
    expect_equal(output$flows$shortfall, 120)

    session$setInputs(scenario = "line-down")
    expect_equal(output$flows$shortfall, 90)
  })
})

test_that("a hand edited bookmark falls back rather than erroring", {
  # The scenario travels in the URL, so anyone can type anything into it.
  shiny::testServer(server, {
    session$setInputs(scenario = "not-a-scenario")
    expect_equal(output$flows$scenario, "baseline")
  })
})

test_that("focusing a node costs no recomputation", {
  # focus is bookmarked, so it is a Shiny input, but nothing on the server
  # reads it. If solving ever starts depending on it, every click on the
  # diagram would cost a round trip that changes nothing.
  shiny::testServer(server, {
    session$setInputs(scenario = "port-closed")
    before <- output$flows

    session$setInputs(focus = "gdansk")
    expect_identical(output$flows, before)
  })
})

test_that("the ui is a function of the request, which bookmarking needs", {
  # A page built once would carry whatever restore payload was true at
  # startup forever. This is the assertion that catches someone simplifying
  # `ui` back to a plain tag list.
  expect_true(is.function(ui))
  expect_true(is.function(server))
})

test_that("the page is built from this app directory, not the working one", {
  expect_true(file.exists(file.path(APP_DIR, "www", "ui.js")))
})
