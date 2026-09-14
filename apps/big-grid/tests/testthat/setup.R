# test_dir() sources this before any test file runs, with the working
# directory set to tests/testthat, so the app directory is two levels up.
# testthat::test_path() is not used here: it looks for a package style
# tests/testthat from the project root and errors inside an app directory.
APP_DIR <- normalizePath(file.path(getwd(), "..", ".."), mustWork = TRUE)

if (!file.exists(file.path(APP_DIR, "app.R"))) {
  stop("setup.R resolved APP_DIR to ", APP_DIR, ", which holds no app.R.")
}

# Load the app the way the gallery does: one environment holding APP_DIR, the
# R/ helpers and then app.R itself. local = TRUE is what puts them there;
# plain source() would evaluate app.R in the global environment instead,
# where its `exists("APP_DIR", inherits = FALSE)` guard would not see the
# APP_DIR set above and would fall back to the working directory.
#
# Test files run in a child of this environment, so they see `server` and
# whatever data app.R loaded. If app.R stops defining `ui` and `server` at
# top level, that breaks here rather than in production.
for (f in list.files(
  file.path(APP_DIR, "R"),
  pattern = "[.][Rr]$",
  full.names = TRUE
)) {
  source(f, local = TRUE)
}

source(file.path(APP_DIR, "app.R"), local = TRUE)
