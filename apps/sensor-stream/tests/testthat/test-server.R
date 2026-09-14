# Layer two: drive the reactive graph with no browser.
#
# The stream itself is pushed with send_message rather than published through
# an output, so testServer cannot see it. That half is checked in a browser
# instead, and the numbers are in README.md. What testServer can see is the
# metadata output the client needs before it can draw anything.

test_that("the channel list is sent without waiting for any input", {
  shiny::testServer(server, {
    # This output reads no input, so it must resolve on connect. If it ever
    # starts depending on one, the client never learns the channel names and
    # draws nothing.
    expect_length(output$stream_meta$channels, 4L)
    expect_equal(output$stream_meta$minHz, MIN_HZ)
    expect_equal(output$stream_meta$maxHz, MAX_HZ)
  })
})

test_that("the channel list carries what the client needs to draw", {
  shiny::testServer(server, {
    for (ch in output$stream_meta$channels) {
      expect_true(nzchar(ch$name))
      expect_true(nzchar(ch$unit))
      expect_match(ch$color, "^#")
    }
  })
})
