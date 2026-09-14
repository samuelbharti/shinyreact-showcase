# Layer two: drive the reactive graph with no browser.
#
# The one worth having here is the output that stays silent. The whole claim
# is that moving a slider costs nothing, so the plot must answer only when the
# compare toggle is on. If it starts drawing on its own, every step of every
# slider is costing four panels nobody asked to see.

test_that("the summary is sent without waiting for any input", {
  shiny::testServer(server, {
    expect_equal(output$summary$customers, CUSTOMER_COUNT)
    expect_equal(output$summary$auc, 0.81424)
    expect_equal(output$summary$scoreScale, SCORE_SCALE)
    expect_length(output$summary$curves$thresholds, 101L)
  })
})

test_that("the scores are sent without waiting for any input", {
  shiny::testServer(server, {
    expect_equal(output$scores$customers, CUSTOMER_COUNT)
    expect_equal(
      nchar(output$scores$score) + nchar(output$scores$left),
      200004L
    )
  })
})

# renderPlot always hands back an image, even when the expression returns
# NULL: what comes back then is an empty device rather than nothing. So the
# way to tell whether the server drew the four panels is to ask whether the
# picture changed, which is also the question the claim is about.
picture <- function(out) out$server_panels$src

test_that("with the comparison off, moving the threshold changes nothing", {
  # This is the assertion that guards the claim. Every number the page shows
  # while the sliders move was worked out in the browser, and the server
  # produced the same empty device throughout.
  shiny::testServer(server, {
    session$setInputs(
      compare = FALSE,
      threshold = 1000L,
      miss_cost = 220,
      offer_cost = 25
    )
    idle <- picture(output)

    for (value in c(2000L, 4000L, 8000L)) {
      session$setInputs(threshold = value)
      expect_identical(picture(output), idle)
    }

    session$setInputs(miss_cost = 700, offer_cost = 150)
    expect_identical(picture(output), idle)
  })
})

test_that("turning the comparison on draws something else", {
  shiny::testServer(server, {
    session$setInputs(
      compare = FALSE,
      threshold = 3000L,
      miss_cost = 220,
      offer_cost = 25
    )
    idle <- picture(output)

    session$setInputs(compare = TRUE)
    drawn <- picture(output)

    expect_false(identical(drawn, idle))
    expect_true(nzchar(drawn))
  })
})

test_that("with the comparison on, every slider step costs a new picture", {
  # The other half of the comparison, and the reason the round trip counter
  # in the browser climbs once per step once the toggle is on.
  shiny::testServer(server, {
    session$setInputs(
      compare = TRUE,
      threshold = 1000L,
      miss_cost = 220,
      offer_cost = 25
    )
    seen <- picture(output)

    for (value in c(2000L, 4000L, 8000L)) {
      session$setInputs(threshold = value)
      expect_false(identical(picture(output), seen))
      seen <- picture(output)
    }

    session$setInputs(miss_cost = 700)
    expect_false(identical(picture(output), seen))
  })
})

test_that("the page is built from this app directory, not the working one", {
  # APP_DIR is what the gallery sets before sourcing app.R. If src_dir ever
  # became relative, the app would serve the gallery's www/ instead.
  expect_true(file.exists(file.path(APP_DIR, "www", "ui.js")))
  expect_true(is.function(server))
})
