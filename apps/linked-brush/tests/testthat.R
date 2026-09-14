# Runner for this app, in the layout shiny::runTests() expects. Run it from
# the app directory:
#
#   Rscript --% -e "shiny::runTests('.', assert = TRUE)"
library(testthat)

test_dir("testthat")
