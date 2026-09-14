# Genome tracks, the R half. Same www/ui.js as app.py.
#
# The split this app is about: the server sends one chromosome and then
# stops. Panning and zooming are a client transform over data the browser
# already holds. Clicking a gene is a question about data, so that does come
# here.
library(shiny)
library(shinyreact)

if (!exists("APP_DIR", inherits = FALSE)) {
  APP_DIR <- normalizePath(".")
}

GENOME <- load_genome(file.path(APP_DIR, "data"))

ui <- page_react(
  src_dir = file.path(APP_DIR, "www"),
  title = "Genome tracks"
)

server <- function(input, output, session) {
  # The chromosome list, so the client can offer a choice.
  output$genome_meta <- reactive_output({
    list(chromosomes = GENOME$chromosomes, biotypes = I(GENOME$biotypes))
  })

  # One whole chromosome, sent when the chromosome changes. Nothing here
  # depends on the view, so panning and zooming never recompute it.
  output$chromosome_data <- reactive_output({
    name <- input$chromosome
    if (is.null(name) || !nzchar(name)) {
      return(NULL)
    }
    chromosome_payload(GENOME, name)
  })

  # Details for the clicked gene. The client knows where every gene is
  # drawn. It does not know the read depth over that gene or how crowded the
  # neighbourhood is, because those need the whole chromosome.
  output$gene_info <- reactive_output({
    index <- input$gene_click
    name <- input$chromosome
    if (is.null(index) || index < 0 || is.null(name) || !nzchar(name)) {
      return(NULL)
    }
    gene_details(GENOME, name, as.integer(index))
  })
}

shinyApp(ui, server)
