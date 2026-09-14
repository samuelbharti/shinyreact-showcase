# Sensor stream, the R half. Same www/ui.js as app.py.
#
# The claim is that an update appends one point instead of redrawing a plot,
# so the server does not publish a growing series through an output at all.
# It pushes one reading per tick with send_message, and the client keeps the
# history.
library(shiny)
library(shinyreact)

if (!exists("APP_DIR", inherits = FALSE)) {
  APP_DIR <- normalizePath(".")
}

ui <- page_react(
  src_dir = file.path(APP_DIR, "www"),
  title = "Sensor stream"
)

server <- function(input, output, session) {
  # A plain counter in the server environment, not a reactiveVal. An observer
  # that both reads and writes a reactive value invalidates itself forever.
  # The history lives on the client anyway.
  tick <- 0L

  output$stream_meta <- reactive_output({
    list(channels = channels(), minHz = MIN_HZ, maxHz = MAX_HZ)
  })

  observe({
    if (!isTRUE(input$running)) {
      # No invalidateLater here, so the timer stops. The observer wakes again
      # when `running` changes, and not before.
      return(invisible(NULL))
    }

    invalidateLater(interval_ms(input$rate_hz), session)

    tick <<- tick + 1L
    send_message(session, "reading", list(tick = tick, values = reading(tick)))
  })
}

shinyApp(ui, server)
