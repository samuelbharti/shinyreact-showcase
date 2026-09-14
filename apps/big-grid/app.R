# Big grid, the R half. Same www/ui.js as app.py.
#
# The client builds the same million rows from the spec below and filters and
# sorts them locally. Nothing about that reaches here.
#
# The server path exists so the app can answer the same question the other
# way and show what it costs. It runs only while the client is in server
# mode, so in browser mode this process is genuinely idle.
library(shiny)
library(shinyreact)

if (!exists("APP_DIR", inherits = FALSE)) {
  APP_DIR <- normalizePath(".")
}

# About 450 ms for a million rows. numpy does the same work in 40 ms, which
# is a real difference between the two deployments and worth knowing: R is
# single threaded, so this blocks every other session in the gallery while it
# runs, once, on the first visit.
ORDERS <- load_orders()
SPEC <- grid_spec()

ui <- page_react(
  src_dir = file.path(APP_DIR, "www"),
  title = "Big grid"
)

server <- function(input, output, session) {
  # How to build the table. About 350 bytes, sent once.
  output$spec <- reactive_output({
    SPEC
  })

  # One page, filtered and sorted here. This is the server backed grid, for
  # comparison. It returns fifty rows, because that is what such a grid
  # sends: it has no way to let you scroll past what you asked for without
  # asking again.
  output$page <- reactive_output({
    raw <- input$grid_query
    if (is.null(raw) || length(raw) == 0L) {
      return(NULL)
    }
    run_query(ORDERS, query_from(raw))
  })

  # Sums over everything that matched, for the same query.
  output$server_totals <- reactive_output({
    raw <- input$grid_query
    if (is.null(raw) || length(raw) == 0L) {
      return(NULL)
    }
    totals(ORDERS, query_from(raw))
  })
}

shinyApp(ui, server)
