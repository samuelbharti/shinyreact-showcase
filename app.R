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

# Bookmarking is a property of the whole app, and the gallery is one app
# serving many. Turning it on here is what lets an app that bookmarks do so
# through the gallery. It changes nothing for the apps that do not, because an
# app with no bookmarked inputs never asks Shiny to write a URL.
#
# Bookmarking is deliberately not enabled here, and that is a limitation
# rather than a decision. See docs/deploying.md, "Bookmarking in the R
# gallery". In short: the option a session reads could not be set from this
# file in any of the four documented places, so an app that bookmarks works
# standalone in R and in the Python gallery, and does not write a URL here.
shinyApp(ui = router_ui, server = router_server)
