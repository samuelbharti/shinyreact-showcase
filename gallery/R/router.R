# Routing. "/" is the gallery page, "/?app=<slug>" is that app.
#
# The query string rather than a path, because R renders dependency hrefs
# relative and serves addResourcePath() prefixes from the server root. An app
# page at /app/<slug>/ would ask for /app/<slug>/shinyreact-0.1.1/... and get
# a 404. The Python gallery mounts on paths instead, and the landing page
# reads the right link out of the catalog, so the client never has to know
# which shape it is on.

gallery_ui <- function() {
  shinyreact::page_react(
    htmltools::tags$script(
      id = "shinyreact-catalog",
      type = "application/json",
      htmltools::HTML(catalog_json())
    ),
    src_dir = file.path(GALLERY_DIR, "www"),
    title = "shinyreact showcase"
  )
}

router_ui <- function(req) {
  slug <- gallery_slug(req$QUERY_STRING)
  if (is.null(slug)) {
    return(gallery_ui())
  }

  loaded <- load_app(slug)
  # An app that bookmarks defines `ui` as a function of the request.
  ui <- if (is.function(loaded$ui)) loaded$ui(req) else loaded$ui
  htmltools::tagList(ui, gallery_back_link())
}

router_server <- function(input, output, session) {
  slug <- gallery_slug(shiny::isolate(session$clientData$url_search))
  if (is.null(slug)) {
    # The gallery page reads its catalog out of the document, so it needs no
    # server at all.
    return(invisible(NULL))
  }
  load_app(slug)$server(input, output, session)

  # An app that bookmarks writes its own query string, and Shiny builds that
  # string from the app's inputs alone. In the gallery that would throw away
  # the ?app= saying which app this is, and the link would reopen the landing
  # page. This callback is registered after the app's own, and the last write
  # to the address bar wins.
  #
  # It does nothing today, because bookmarking is not enabled for the R
  # gallery. See docs/deploying.md. It is here because the moment it is
  # enabled, this is the bug that would otherwise appear, and it is cheaper to
  # keep the two lines than to rediscover it.
  shiny::onBookmarked(function(url) {
    shiny::updateQueryString(with_app_param(url, slug))
  })

  invisible(NULL)
}

# Put ?app=<slug> back at the front of a bookmark URL.
with_app_param <- function(url, slug) {
  mark <- regexpr("?", url, fixed = TRUE)
  if (mark < 0) {
    return(paste0(url, "?app=", slug))
  }
  paste0(
    substr(url, 1, mark),
    "app=",
    slug,
    "&",
    substr(url, mark + 1, nchar(url))
  )
}
