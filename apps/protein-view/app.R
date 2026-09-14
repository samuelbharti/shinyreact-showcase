# Protein view, the R half. Same www/ui.js as app.py.
#
# Two ways of putting a control on the page sit side by side in this app, on
# purpose.
#
# The colour control is React state, written with useShinyInput. That is the
# default and it is how the other apps here work.
#
# The representation control is a real Shiny selectInput, rendered by the
# server and hosted in the React tree with ShinyOutput. It writes input$style
# exactly as it would in a classic Shiny app. That is the escape hatch for
# when you want the genuine widget rather than owning the state.
library(shiny)
library(shinyreact)

if (!exists("APP_DIR", inherits = FALSE)) {
  APP_DIR <- normalizePath(".")
}

STRUCTURE <- load_structure(file.path(APP_DIR, "data", "1ubq.pdb"))
PAYLOAD <- structure_payload(STRUCTURE)
FOLD <- composition(STRUCTURE)

REPRESENTATIONS <- c(
  Cartoon = "cartoon",
  Sticks = "stick",
  Spheres = "sphere",
  Lines = "line"
)

ui <- page_react(
  src_dir = file.path(APP_DIR, "www"),
  title = "Protein view"
)

server <- function(input, output, session) {
  # The PDB text and the parsed residue table, sent once. 3Dmol.js parses the
  # text itself; the residue list is the parsing the server already did.
  output$structure <- reactive_output({
    PAYLOAD
  })

  # Secondary structure counts and the temperature factor range.
  output$fold <- reactive_output({
    FOLD
  })

  # One residue, and where it sits in the whole structure. 3Dmol tells the
  # client which residue was clicked. Where it sits in the distribution of
  # temperature factors needs every other residue, so it is answered here.
  output$residue <- reactive_output({
    number <- input$residue_click
    if (is.null(number) || number < 0) {
      return(NULL)
    }
    residue_detail(STRUCTURE, as.integer(number))
  })

  # The hosted widget's value, sent back to the client.
  #
  # This echo is necessary, not decoration. useShinyInputValue reads
  # shinyreact's own input registry, which only holds ids a shinyreact
  # producer registered. A hosted Shiny widget is not one of those, so the
  # client cannot read input$style directly no matter how it asks.
  #
  # The value does reach the server, exactly as it would in a classic Shiny
  # app, so the server publishes it as an output and the client reads that.
  # The visible cost is one round trip per change, which is the difference
  # between a hosted widget and React state, and worth seeing.
  output$active_style <- reactive_output({
    style <- input$style
    if (is.null(style) || !nzchar(style)) "cartoon" else style
  })

  # A real Shiny select, hosted inside the React tree.
  #
  # Rendered through renderUI rather than sent as data, because Shiny's html
  # output binding loads the widget's own JavaScript and runs the input
  # initialization pass. That is what makes input$style arrive the way it
  # would in a classic app. ShinyOutput alone only calls bindAll, which is
  # not enough for an input.
  output$style_widget <- renderUI({
    # selectize is spelled out rather than left to the default, because the
    # two languages do not agree on it: selectInput turns it on and Shiny for
    # Python leaves it off. A plain select is a real Shiny input either way,
    # and matching the two keeps one client working against both servers.
    selectInput(
      "style",
      label = NULL,
      choices = REPRESENTATIONS,
      selected = "cartoon",
      selectize = FALSE
    )
  })
}

shinyApp(ui, server)
