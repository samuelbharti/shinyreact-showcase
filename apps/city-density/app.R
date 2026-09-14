# City density, the R half. Same www/ui.js as app.py.
#
# The server generates half a million trips and sends only their positions.
# The client bins them into hexagons on the GPU and rebins on every zoom,
# which never reaches here.
#
# Picking a hexagon does reach here, because the answer needs the hour, the
# fare and the duration, and those never left the server.
library(shiny)
library(shinyreact)

if (!exists("APP_DIR", inherits = FALSE)) {
  APP_DIR <- normalizePath(".")
}

# Positions are built now. The hour, fare and duration wait until something
# asks for them, which keeps this app well inside the second that the gallery
# allows an R app at load.
CITY <- load_city()
BOUNDARY <- load_boundary(file.path(APP_DIR, "data"))

ui <- page_react(
  src_dir = file.path(APP_DIR, "www"),
  title = "City density"
)

server <- function(input, output, session) {
  # Positions for every trip, and the outline to draw them on. Reads no
  # input, so Shiny sends it once on connect and never again.
  output$trip_points <- reactive_output({
    points_payload(CITY, BOUNDARY)
  })

  # What the server knows about the trips under the picked hexagon.
  output$hex_summary <- reactive_output({
    picked <- input$picked_hex
    if (is.null(picked) || length(picked) == 0L) {
      return(NULL)
    }
    hexagon_summary(
      CITY,
      as.numeric(picked$lng),
      as.numeric(picked$lat),
      as.numeric(picked$radius)
    )
  })
}

shinyApp(ui, server)
