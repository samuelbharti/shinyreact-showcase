# Slide viewer, the R half. Same www/ui.js as app.py.
#
# There is no image file. The server describes a 6.4 gigapixel slide in about
# two kilobytes, and the browser draws every tile from that description at
# whatever zoom level the reader is looking at.
library(shiny)
library(shinyreact)

if (!exists("APP_DIR", inherits = FALSE)) {
  APP_DIR <- normalizePath(".")
}

SLIDE <- slide_payload()

ui <- page_react(
  src_dir = file.path(APP_DIR, "www"),
  title = "Slide viewer"
)

server <- function(input, output, session) {
  # The whole slide description, sent once. Reads no input, so zooming and
  # panning never come near it. This is the entire cost of a 6.4 gigapixel
  # image on the wire.
  output$slide <- reactive_output({
    SLIDE
  })

  # Measurements for the flagged region the reader picked. The client drew
  # the marker, so it has the box and the label. It does not have the nuclear
  # counts, and this is the one thing in the app that needs the server.
  output$region_detail <- reactive_output({
    index <- input$picked_region
    if (is.null(index) || index < 0) {
      return(NULL)
    }
    region_detail(as.integer(index))
  })
}

shinyApp(ui, server)
