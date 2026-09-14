# Runner for the gallery's own tests. The repo root is a Shiny app (app.R is
# the R gallery), so its tests live here, in the layout shiny::runTests()
# expects.
#
#   Rscript --% -e "shiny::runTests('.', assert = TRUE)"
library(testthat)

test_dir("testthat")
