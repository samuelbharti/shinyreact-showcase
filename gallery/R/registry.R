# Reading catalog.yml, which is the only list of apps in this repo.
#
# Both galleries read the same file at run time. Nothing here keeps a second
# list, because a second list is a list that goes stale.

ROOT <- normalizePath(".", mustWork = TRUE)
GALLERY_DIR <- file.path(ROOT, "gallery")

# Every app this gallery can actually serve, in catalog order.
#
# An app is skipped when it is not meant for the gallery, when it has no R
# server, or when its directory does not hold one yet. That last case is what
# lets catalog.yml list all fifteen apps from the start without the gallery
# failing on the ones not written yet.
read_registry <- function(root = ROOT) {
  catalog <- yaml::read_yaml(file.path(root, "catalog.yml"))
  site <- catalog$site %||% list()

  entries <- list()
  for (app in catalog$apps %||% list()) {
    directory <- file.path(root, "apps", app$slug)

    if (!identical(app$deploy, "gallery")) {
      next
    }
    if (!("r" %in% unlist(app$languages))) {
      next
    }
    if (!file.exists(file.path(directory, "app.R"))) {
      next
    }

    entries[[app$slug]] <- list(
      slug = app$slug,
      title = app$title %||% app$slug,
      blurb = app$blurb %||% "",
      claim = app$claim %||% "",
      plain_shiny = app$plain_shiny %||% "",
      this_app = app$this_app %||% "",
      domain = app$domain %||% "",
      group = app$group %||% "",
      library = app$library %||% "",
      features = unlist(app$features %||% list()),
      compare = isTRUE(app$compare),
      directory = directory
    )
  }

  # The card families, in the order the landing page draws them, and who made
  # this. Both travel with the cards rather than being repeated in the bundle,
  # because a group the client does not know about would leave its apps
  # unreachable.
  groups <- lapply(catalog$groups %||% list(), function(g) {
    list(
      id = g$id %||% "",
      title = g$title %||% "",
      note = g$note %||% "",
      colour = g$colour %||% "#5c6370"
    )
  })

  list(
    entries = entries,
    site = site,
    groups = groups,
    footer = list(
      title = site$title %||% "Shiny React showcase",
      author = site$author %||% "",
      authorUrl = site$author_url %||% "",
      repoUrl = site$repo_url %||% "",
      license = site$license %||% "",
      links = lapply(site$links %||% list(), function(link) {
        list(label = link$label %||% "", url = link$url %||% "")
      })
    )
  )
}

REGISTRY <- read_registry()

# The slug a request asked for, or NULL for the gallery page.
#
# A slug the registry does not know lands on the gallery rather than on an
# error page. A bad link should not look like a broken app.
gallery_slug <- function(query_string) {
  if (is.null(query_string) || !nzchar(query_string)) {
    return(NULL)
  }
  parsed <- shiny::parseQueryString(query_string)
  slug <- parsed$app
  if (is.null(slug) || !nzchar(slug)) {
    return(NULL)
  }
  if (is.null(REGISTRY$entries[[slug]])) {
    return(NULL)
  }
  slug
}

# The catalog, as the JSON the landing page reads out of the document.
#
# Inlined rather than served through an output, so the cards paint on the
# first frame instead of after the websocket opens. Must match the shape
# gallery/pygallery/router.py sends: gallery/tests/fixtures pins that.
catalog_json <- function(registry = REGISTRY) {
  other_base <- registry$site$py_url %||% ""

  cards <- lapply(unname(registry$entries), function(e) {
    list(
      slug = e$slug,
      title = e$title,
      blurb = e$blurb,
      claim = e$claim,
      plainShiny = e$plain_shiny,
      thisApp = e$this_app,
      domain = e$domain,
      group = e$group,
      library = e$library,
      features = I(as.character(e$features)),
      compare = e$compare,
      href = paste0("?app=", e$slug),
      other = if (nzchar(other_base)) {
        paste0(other_base, "/app/", e$slug, "/")
      } else {
        ""
      }
    )
  })

  blob <- jsonlite::toJSON(
    list(
      language = "R",
      apps = cards,
      groups = registry$groups,
      site = registry$footer
    ),
    auto_unbox = TRUE,
    null = "null"
  )
  # A literal </ would end the script block early.
  gsub("</", "<\\/", blob, fixed = TRUE)
}

`%||%` <- function(a, b) if (is.null(a)) b else a
