# Loading one app into the gallery process.
#
# Greenfield apps here are written to be loaded, so there is nothing to shim.
# Every app defines `ui` and `server` at top level, reads its own files
# through APP_DIR, and ends with shinyApp(ui, server) only so that runApp()
# works on it directly. The gallery supplies APP_DIR and reads the two
# objects back out.
#
# An app is loaded at most once per process, on the first visit to it.
#
# R is single threaded, so that first load blocks every other session while
# it runs. Keep top level work in an app.R under a second. The Python gallery
# does the same import in a worker thread and blocks nobody, which is a real
# difference between the two deployments and not something to paper over.

.loaded <- new.env(parent = emptyenv())

load_app <- function(slug) {
  hit <- .loaded[[slug]]
  if (!is.null(hit)) {
    return(hit)
  }

  entry <- REGISTRY$entries[[slug]]
  if (is.null(entry)) {
    stop("No app called ", slug, " in the gallery registry.")
  }

  # Parent is globalenv() so the app sees every attached package, while its
  # own objects stay out of every other app's way.
  env <- new.env(parent = globalenv())
  env$APP_DIR <- entry$directory

  # What runApp() auto-loads for an app running on its own.
  shiny::loadSupport(entry$directory, renv = env, globalrenv = env)

  # Belt and braces for any top level relative read the contract did not
  # anticipate. R is single threaded and Shiny runs one session's code at a
  # time, so no other session sees this working directory.
  old_wd <- setwd(entry$directory)
  on.exit(setwd(old_wd), add = TRUE)

  sys.source(
    file.path(entry$directory, "app.R"),
    envir = env,
    keep.source = FALSE
  )

  if (is.null(env$ui) || !is.function(env$server)) {
    stop(
      "apps/",
      slug,
      "/app.R must define `ui` and `server` at top level. ",
      "The gallery composes them with a page of its own. See CONTRIBUTING.md, ",
      "'The contract every app follows'."
    )
  }

  loaded <- list(slug = slug, ui = env$ui, server = env$server, env = env)
  .loaded[[slug]] <- loaded
  loaded
}

# The counter, on every page the gallery serves.
#
# It goes here rather than into the app bundles for the same reason the back
# link does: the same www/ui.js also serves the app standalone, where there is
# nothing to count. Blank turns it off.
#
# count.js drops requests from local addresses on its own, so running this on
# 127.0.0.1 never reaches the stats.
gallery_analytics <- function(url = REGISTRY$site$analytics %||% "") {
  if (is.null(url) || !nzchar(url)) {
    return(NULL)
  }
  htmltools::tags$script(
    `data-goatcounter` = url,
    async = NA,
    src = "//gc.zgo.at/count.js"
  )
}

# The link back to the gallery, added to every app page.
#
# It lives here rather than in fifteen client bundles, because the same
# www/ui.js also serves the app on its own, where there is no gallery to go
# back to.
gallery_back_link <- function() {
  # Top right, because that is where a reader looks for a way out and because
  # every app in this repo lays its own content out left aligned under a max
  # width, so the top right corner is the one place a floating control is
  # never in the way. Bottom left, where this used to be, was missed entirely.
  htmltools::tagList(
    htmltools::tags$a(
      htmltools::tags$span(
        htmltools::HTML("&larr;"),
        class = "arrow",
        `aria-hidden` = "true"
      ),
      "Back to the gallery",
      href = "?",
      class = "gallery-back"
    ),
    htmltools::tags$style(htmltools::HTML(
      ".gallery-back {
         position: fixed;
         right: 16px;
         top: 14px;
         z-index: 2000;
         display: inline-flex;
         align-items: center;
         gap: 6px;
         padding: 7px 14px 7px 11px;
         border-radius: 999px;
         border: 1px solid rgba(15, 23, 42, 0.12);
         background: #ffffff;
         color: #16181d;
         font: 500 13px system-ui, -apple-system, 'Segoe UI', sans-serif;
         text-decoration: none;
         box-shadow: 0 2px 10px rgba(16, 24, 40, 0.14);
         transition: box-shadow 120ms ease, border-color 120ms ease;
       }
       .gallery-back:hover {
         border-color: rgba(47, 111, 237, 0.55);
         box-shadow: 0 4px 16px rgba(16, 24, 40, 0.2);
       }
       .gallery-back:focus-visible {
         outline: 2px solid #2f6fed;
         outline-offset: 2px;
       }
       .gallery-back .arrow { color: #2f6fed; font-size: 14px; line-height: 1; }
       @media (max-width: 900px) {
         .gallery-back {
           top: 8px;
           right: 8px;
           padding: 5px 11px 5px 9px;
           font-size: 12px;
         }
       }"
    ))
  )
}
