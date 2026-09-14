# test_dir() sources this before any test file runs, with the working
# directory set to tests/testthat. The gallery reads catalog.yml and the app
# directories relative to the repo root, so move there first.
ROOT_DIR <- normalizePath(file.path(getwd(), "..", ".."), mustWork = TRUE)

if (!file.exists(file.path(ROOT_DIR, "catalog.yml"))) {
  stop(
    "setup.R resolved the repo root to ",
    ROOT_DIR,
    ", which holds no catalog.yml."
  )
}

withr::local_dir(ROOT_DIR, .local_envir = teardown_env())

library(shiny)
library(shinyreact)

for (f in list.files(
  file.path(ROOT_DIR, "gallery", "R"),
  pattern = "[.][Rr]$",
  full.names = TRUE
)) {
  source(f, local = TRUE)
}
