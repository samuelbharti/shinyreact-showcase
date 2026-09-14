# Churn monitor, the R half. Same www/ui.js as app.py, so the client is
# written once and this file holds reactive computation only. Pure logic lives
# in R/churn.R, which shiny loads for us.
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
# time, so building the index inside a session would block every other session
# in the gallery.
load_curve()

# src_dir must be absolute. page_react_dep() resolves it when the page is
# served, by which time the gallery owns the working directory again.
ui <- page_react(
  src_dir = file.path(APP_DIR, "www"),
  title = "Churn monitor"
)

server <- function(input, output, session) {
  output$summary <- reactive_output({
    summary_payload()
  })

  output$scores <- reactive_output({
    scores_payload()
  })

  # The same four panels, as a picture. This is the plain Shiny path.
  #
  # Returning NULL while the comparison is off is what keeps this server
  # idle: without that guard every step of every slider would draw four
  # panels nobody asked to see.
  output$server_panels <- renderPlot({
    if (!isTRUE(input$compare)) {
      return(NULL)
    }
    render_panels(input$threshold, input$miss_cost, input$offer_cost)
  })
}

# Standalone only: shiny::runApp("apps/churn-monitor").
# The gallery reads `ui` and `server` out of this environment and discards
# whatever this call returns.
shinyApp(ui, server)
