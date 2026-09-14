# APP_TITLE, the R half. Same www/ui.js as app.py, so the client is written
# once and this file holds reactive computation only. Pure logic lives in
# R/logic.R, which shiny loads for us.
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
VALUES <- load_values(file.path(APP_DIR, "data", "values.csv"))

# src_dir must be absolute. page_react_dep() resolves it when the page is
# served, by which time the gallery owns the working directory again.
ui <- page_react(
  src_dir = file.path(APP_DIR, "www"),
  title = "APP_TITLE"
)

server <- function(input, output, session) {
  output$histogram_data <- reactive_output({
    bins <- input$bins
    # NULL until the first message from the client. Return NULL, not req():
    # the silent error req() raises still reaches the client console.
    if (is.null(bins)) {
      return(NULL)
    }
    histogram(VALUES, bins)
  })
}

# Standalone only: shiny::runApp("apps/APP_NAME").
# The gallery reads `ui` and `server` out of this environment and discards
# whatever this call returns.
shinyApp(ui, server)
