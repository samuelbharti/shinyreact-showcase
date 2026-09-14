# Linked brush, the R half. Same www/ui.js as app.py, so the client is written
# once and this file holds reactive computation only. Pure logic lives in
# R/stars.R, which shiny loads for us.
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

# R/ is loaded for us. runApp() does it standalone and the gallery calls
# shiny::loadSupport() itself, so nothing here sources anything.
#
# Built at startup rather than on the first request. R serves one request at a
# time, so an eighty millisecond build inside a session would block every
# other session in the gallery.
load_catalogue()

# src_dir must be absolute. page_react_dep() resolves it when the page is
# served, by which time the gallery owns the working directory again.
ui <- page_react(
  src_dir = file.path(APP_DIR, "www"),
  title = "Linked brush"
)

server <- function(input, output, session) {
  output$summary <- reactive_output({
    summary_payload()
  })

  output$catalogue <- reactive_output({
    catalogue_payload()
  })

  output$fitted <- reactive_output({
    brushes <- input$brushes
    # NULL until the first brush is released. Return NULL, not req(): the
    # silent error req() raises still reaches the client console, and an empty
    # panel is what we want here anyway.
    if (is.null(brushes)) {
      return(NULL)
    }
    fit_selection(brushes)
  })
}

# Standalone only: shiny::runApp("apps/linked-brush").
# The gallery reads `ui` and `server` out of this environment and discards
# whatever this call returns.
shinyApp(ui, server)
