# The R gallery: its registry, its routing and the catalog it inlines.
#
# These mirror gallery/tests/test_registry.py. The two galleries share one
# client bundle, so a difference between them shows up as a broken card on
# one deployment only, which is the kind of bug nobody finds for a month.

test_that("the registry only holds apps that exist on disk", {
  expect_gt(length(REGISTRY$entries), 0)

  for (entry in REGISTRY$entries) {
    expect_true(
      file.exists(file.path(entry$directory, "app.R")),
      info = entry$slug
    )
  }
})

test_that("an app with no R server, or marked local, is left out", {
  # Built against a throwaway catalog rather than the real one, so the test
  # still means something on a day when every app happens to ship both.
  root <- withr::local_tempdir()
  writeLines(
    c(
      "site:",
      "  py_url: \"\"",
      "apps:",
      "  - slug: both",
      "    deploy: gallery",
      "    languages: [py, r]",
      "  - slug: python-only",
      "    deploy: gallery",
      "    languages: [py]",
      "  - slug: kept-local",
      "    deploy: local",
      "    languages: [py, r]"
    ),
    file.path(root, "catalog.yml")
  )
  for (slug in c("both", "python-only", "kept-local")) {
    dir.create(file.path(root, "apps", slug), recursive = TRUE)
    file.create(file.path(root, "apps", slug, "app.R"))
    file.create(file.path(root, "apps", slug, "app.py"))
  }

  registry <- read_registry(root)

  expect_equal(names(registry$entries), "both")
})

test_that("a slug the registry does not know lands on the gallery", {
  # A bad link should look like the front page, not like a broken app.
  expect_null(gallery_slug("app=not-a-real-app"))
  expect_null(gallery_slug(""))
  expect_null(gallery_slug(NULL))
  expect_null(gallery_slug("?"))
})

test_that("a known slug is recognized, with or without the leading question mark", {
  slug <- names(REGISTRY$entries)[[1]]

  expect_equal(gallery_slug(paste0("?app=", slug)), slug)
  expect_equal(gallery_slug(paste0("app=", slug)), slug)
})

test_that("the catalog is valid JSON and says it came from R", {
  catalog <- jsonlite::fromJSON(catalog_json(), simplifyVector = FALSE)

  expect_equal(catalog$language, "R")
  expect_gt(length(catalog$apps), 0)
})

test_that("every card has the three claim fields", {
  catalog <- jsonlite::fromJSON(catalog_json(), simplifyVector = FALSE)

  for (card in catalog$apps) {
    expect_true(nzchar(card$claim), info = card$slug)
    expect_true(nzchar(card$plainShiny), info = card$slug)
    expect_true(nzchar(card$thisApp), info = card$slug)
  }
})

test_that("card links use the query string shape this gallery serves", {
  catalog <- jsonlite::fromJSON(catalog_json(), simplifyVector = FALSE)

  for (card in catalog$apps) {
    expect_equal(card$href, paste0("?app=", card$slug))
  }
})

test_that("the R and Python galleries agree on the card shape", {
  # The one place the two deployments can silently diverge. Both are checked
  # against the same fixture, which changes on purpose or not at all.
  expected <- jsonlite::fromJSON(
    file.path(ROOT, "gallery", "tests", "fixtures", "card-keys.json")
  )
  catalog <- jsonlite::fromJSON(catalog_json(), simplifyVector = FALSE)

  expect_equal(sort(names(catalog$apps[[1]])), sort(expected$keys))
})

test_that("features stays an array even when an app has only one", {
  # I() around a length-one vector. Without it jsonlite writes a bare string,
  # and the client calls .map on it and throws.
  catalog <- jsonlite::fromJSON(catalog_json(), simplifyVector = FALSE)

  for (card in catalog$apps) {
    expect_true(is.list(card$features), info = card$slug)
  }
})

test_that("the catalog escapes a closing script tag", {
  # A literal </ inside the JSON would end the script block early and the
  # rest of the catalog would render as text on the page.
  expect_false(grepl("</", catalog_json(), fixed = TRUE))
})

test_that("the gallery page renders without loading any app", {
  # Fifteen apps loading at startup is how the deployment misses its startup
  # window. The front page must not touch one.
  before <- ls(.loaded)
  page <- router_ui(list(QUERY_STRING = ""))

  expect_s3_class(page, "shiny.tag.list")
  expect_equal(ls(.loaded), before)
})

test_that("asking for an app loads it once and reuses it", {
  slug <- names(REGISTRY$entries)[[1]]

  first <- load_app(slug)
  second <- load_app(slug)

  expect_identical(first, second)
  expect_true(is.function(second$server))
})

test_that("a loaded app gets its own APP_DIR and keeps it to itself", {
  slug <- names(REGISTRY$entries)[[1]]
  loaded <- load_app(slug)

  expect_equal(
    normalizePath(loaded$env$APP_DIR),
    normalizePath(REGISTRY$entries[[slug]]$directory)
  )
  # The app environment is private, so nothing it defines reaches the global
  # environment where the next app would see it.
  expect_false(exists("ATLAS", envir = globalenv(), inherits = FALSE))
})

test_that("an app page carries the back link", {
  slug <- names(REGISTRY$entries)[[1]]
  markup <- as.character(router_ui(list(QUERY_STRING = paste0("app=", slug))))

  expect_match(markup, "gallery-back", fixed = TRUE)
  expect_match(markup, "Back to the gallery", fixed = TRUE)
})
