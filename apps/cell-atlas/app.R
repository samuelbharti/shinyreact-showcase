# Cell atlas, the R half. Same www/ui.js as app.py, so the client is written
# once and this file holds reactive computation only. The real work is in
# R/atlas.R, which shiny loads for us.
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

# Read once per process, shared by every session.
ATLAS <- load_atlas(file.path(APP_DIR, "data"))

# Built once at startup rather than per request. R is single threaded, so a
# matrix rebuilt inside a reactive would block every other session in the
# gallery, not just this one.
EXPRESSION <- atlas_expression(ATLAS)

# src_dir must be absolute. page_react_dep() resolves it when the page is
# served, by which time the gallery owns the working directory again.
ui <- page_react(
  src_dir = file.path(APP_DIR, "www"),
  title = "Cell atlas"
)

server <- function(input, output, session) {
  # The whole point cloud, sent once. This reads no input, so Shiny sends it
  # on connect and never again. About 1.3 MB of base64 for 200,000 cells.
  output$atlas_points <- reactive_output({
    points_payload(ATLAS)
  })

  # One gene across every cell, for the color ramp. Recomputed only when the
  # gene changes. Panning, zooming and hovering never reach this, which is
  # the whole claim.
  output$gene_expression <- reactive_output({
    gene <- input$gene
    # NULL until the first message from the client. Return NULL, not req():
    # the silent error req() raises still reaches the client console.
    if (is.null(gene) || gene < 0) {
      return(NULL)
    }
    expression_payload(ATLAS, gene, expression = EXPRESSION)
  })

  # Cluster composition and marker genes for the lasso selection. The client
  # already knows which cells it caught. Only the server holds the expression
  # matrix, so this is the part the server is for.
  output$selection_summary <- reactive_output({
    encoded <- input$selection
    if (is.null(encoded) || !nzchar(encoded)) {
      return(list(n = 0L, composition = I(list()), markers = I(list())))
    }
    selection_stats(
      ATLAS,
      decode_selection(encoded, ATLAS$n_cells),
      expression = EXPRESSION
    )
  })
}

# Standalone only: shiny::runApp("apps/cell-atlas").
# The gallery reads `ui` and `server` out of this environment and discards
# whatever this call returns.
shinyApp(ui, server)
