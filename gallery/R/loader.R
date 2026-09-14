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

# The link back to the gallery, added to every app page.
#
# It lives here rather than in fifteen client bundles, because the same
# www/ui.js also serves the app on its own, where there is no gallery to go
# back to.
gallery_back_link <- function() {
  htmltools::tagList(
    htmltools::tags$a(
      "Back to the gallery",
      href = "?",
      class = "gallery-back"
    ),
    htmltools::tags$style(htmltools::HTML(
      ".gallery-back {
         position: fixed;
         left: 12px;
         bottom: 12px;
         z-index: 1000;
         padding: 6px 12px;
         border-radius: 999px;
         border: 1px solid rgba(0, 0, 0, 0.12);
         background: rgba(255, 255, 255, 0.92);
         color: #16181d;
         font: 13px system-ui, -apple-system, 'Segoe UI', sans-serif;
         text-decoration: none;
         box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
       }
       .gallery-back:hover { border-color: rgba(0, 0, 0, 0.28); }"
    ))
  )
}
