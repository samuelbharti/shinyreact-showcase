# Supply flow, the R half. Same www/ui.js as app.py, so the client is written
# once and this file holds reactive computation only. Pure logic lives in
# R/flow.R, which shiny loads for us.
library(shiny)
library(shinyreact)

# The gallery sets APP_DIR before sourcing this file. Standalone,
# shiny::runApp() has already made this directory the working directory.
# inherits = FALSE matters: app.R is sourced into the private environment the
# gallery makes per app, so without it a stray APP_DIR in the global
# environment could leak in from another app.
if (!exists("APP_DIR", inherits = FALSE)) {
  APP_DIR <- normalizePath(".")
}

KNOWN <- vapply(SCENARIOS, function(s) s$slug, character(1))
DEFAULT <- KNOWN[[1]]

# URL bookmarking needs a UI that is rebuilt per request, because the restore
# payload is read when the page is built. A tag list made once would carry
# whatever was true at startup forever.
#
# src_dir must be absolute. page_react_dep() resolves it when the page is
# served, by which time the gallery owns the working directory again.
ui <- function(request) {
  page_react(
    src_dir = file.path(APP_DIR, "www"),
    title = "Supply flow"
  )
}

server <- function(input, output, session) {
  output$catalogue <- reactive_output({
    catalogue()
  })

  output$flows <- reactive_output({
    chosen <- input$scenario
    # An unknown slug can only come from a hand edited bookmark, and falling
    # back is friendlier than a stack trace in the client console.
    if (is.null(chosen) || !(chosen %in% KNOWN)) {
      chosen <- DEFAULT
    }
    solve_flow(chosen)
  })

  # Bookmarking. Shiny does not write the query string on its own: something
  # has to ask, and then say where to put the answer. Doing it on every change
  # is what makes the address bar a description of the page rather than a
  # button someone has to remember to press.
  observe({
    input$scenario
    input$focus
    session$doBookmark()
  })

  onBookmarked(function(url) {
    updateQueryString(url)
  })
}

# Standalone only: shiny::runApp("apps/supply-flow").
# The gallery reads `ui` and `server` out of this environment and discards
# whatever this call returns.
shinyApp(ui, server, enableBookmarking = "url")
