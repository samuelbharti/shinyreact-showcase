# Market candles, the R half. Same www/ui.js as app.py.
#
# The client gets one symbol's bars and then owns the chart. Panning, zooming
# and the crosshair are lightweight-charts doing its own work, and none of it
# reaches here.
#
# The compare toggle turns on the other path: the server draws the same
# window as a PNG, the way a plain Shiny app does, and every pan and zoom
# then costs a render and a round trip.
library(shiny)
library(shinyreact)

if (!exists("APP_DIR", inherits = FALSE)) {
  APP_DIR <- normalizePath(".")
}

CATALOG <- catalog()

ui <- page_react(
  src_dir = file.path(APP_DIR, "www"),
  title = "Market candles"
)

server <- function(input, output, session) {
  # The symbol list. Sent once, about 140 bytes.
  output$catalog <- reactive_output({
    CATALOG
  })

  # One symbol's whole history, about 1 MB of base64. Sent when the symbol
  # changes and at no other time. Panning and zooming do not come near this.
  output$series <- reactive_output({
    symbol <- input$symbol
    if (is.null(symbol) || !nzchar(symbol)) {
      return(NULL)
    }
    series_payload(load_series(symbol))
  })

  # Numbers for the visible window, on the server path only. The client
  # works these out itself when it owns the chart.
  output$window <- reactive_output({
    visible <- input$visible
    symbol <- input$symbol
    if (is.null(visible) || is.null(symbol) || !isTRUE(input$compare)) {
      return(NULL)
    }
    window_stats(load_series(symbol), visible$first, visible$last)
  })

  # The same window, as a picture. This is the plain Shiny path. ImageOutput
  # on the client measures itself and asks for this at the size it is drawn,
  # and every change of window asks again.
  output$server_chart <- renderPlot({
    visible <- input$visible
    symbol <- input$symbol
    if (is.null(visible) || is.null(symbol) || !isTRUE(input$compare)) {
      return(NULL)
    }
    render_window(load_series(symbol), visible$first, visible$last)
  })
}

shinyApp(ui, server)
