# Deployment entry point for the R gallery.
#
# This sits at the repo root, not in gallery/, because the repo root is what
# gets deployed. The gallery reads catalog.yml and the app directories at run
# time, so a bundle holding only gallery/ would start and then fail on the
# first request. Connect Cloud also wants manifest.json next to the primary
# file.
#
# Run it locally with:
#
#   Rscript --% -e "shiny::runApp('.', port = 3838)"
library(shiny)
library(shinyreact)

for (f in list.files("gallery/R", pattern = "[.][Rr]$", full.names = TRUE)) {
  source(f)
}

shinyApp(ui = router_ui, server = router_server)
