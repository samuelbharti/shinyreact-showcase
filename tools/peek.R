#!/usr/bin/env Rscript
# Open a running app in headless Chrome, report what the console said, and
# save a screenshot.
#
#   Rscript tools/peek.R --url http://127.0.0.1:8000 --out docs/local/peek/cell-atlas
#
# Options:
#   --url    the running app. Required.
#   --out    where to write <name>.png and <name>.log. Required.
#   --wait   seconds to let the app settle before looking. Default 6.
#   --eval   a JavaScript expression to evaluate after the wait. Its value is
#            printed, which is how a check asserts something about the page.
#   --eval-file  a file holding that expression. Easier than quoting anything
#            multi line through a shell.
#   --size   viewport, as WIDTHxHEIGHT. Default 1280x900.
#   --eval-timeout  seconds to allow the expression. Default 120.
#            An interaction script that drives the app and waits for it
#            needs far longer than chromote's own default, which is 10.
#   --canvas a CSS selector for a <canvas>. Saved separately as
#            <out>-canvas.png. Use this for any app that draws with WebGL:
#            Chrome leaves canvas content out of a page screenshot in
#            headless, so the page shot shows a blank box while the app is
#            fine. This route copies the canvas into a 2D context and reads
#            the pixels back, which does work.
#
# A screenshot alone does not prove much. The console is the part that
# catches a Shiny React app failing quietly: two copies of React make every
# hook return nothing, with no error on screen and nothing in the server log.
#
# Exit code is 1 when the console logged an error, so this works in a check.

args <- commandArgs(trailingOnly = TRUE)

arg_value <- function(name, default = NULL) {
  hit <- match(paste0("--", name), args)
  if (is.na(hit) || hit == length(args)) {
    return(default)
  }
  args[[hit + 1L]]
}

url <- arg_value("url")
out <- arg_value("out")
wait <- as.numeric(arg_value("wait", "6"))
js <- arg_value("eval")
eval_file <- arg_value("eval-file")
if (!is.null(eval_file)) {
  js <- paste(readLines(eval_file, warn = FALSE), collapse = "\n")
}
size <- arg_value("size", "1280x900")
eval_timeout <- as.numeric(arg_value("eval-timeout", "120"))
canvas_selector <- arg_value("canvas")

if (is.null(url) || is.null(out)) {
  stop(
    "Both --url and --out are required. See the comment at the top of this file."
  )
}

dims <- as.integer(strsplit(size, "x", fixed = TRUE)[[1]])
dir.create(dirname(out), recursive = TRUE, showWarnings = FALSE)

# Headless Chrome has no GPU, and several apps here draw with WebGL.
# SwiftShader is a software rasterizer that makes WebGL work anyway: slower
# than a real GPU, and enough to prove the app draws what it says it draws.
#
# chromote puts --disable-gpu first by default. WebGL still runs under it,
# but the canvas is left out of Page.captureScreenshot, so the screenshot
# comes back blank while the page is fine. Drop that flag rather than spend
# another hour reading a screenshot that lies.
chrome_args <- setdiff(chromote::default_chrome_args(), "--disable-gpu")
chromote::set_chrome_args(c(
  chrome_args,
  "--use-gl=angle",
  "--use-angle=swiftshader",
  "--enable-unsafe-swiftshader",
  "--ignore-gpu-blocklist"
))


chrome <- chromote::ChromoteSession$new(width = dims[[1]], height = dims[[2]])
on.exit(try(chrome$close(), silent = TRUE), add = TRUE)

# Collect console output and page errors before navigating, so nothing that
# happens during load is missed.
messages <- new.env(parent = emptyenv())
messages$lines <- character(0)

record <- function(level, text) {
  messages$lines <- c(messages$lines, paste0("[", level, "] ", text))
}

chrome$Runtime$enable()
chrome$Runtime$consoleAPICalled(callback_ = function(event) {
  parts <- vapply(
    event$args,
    function(a) {
      if (!is.null(a$value)) {
        paste(format(a$value), collapse = " ")
      } else if (!is.null(a$description)) {
        a$description
      } else {
        a$type %||% "?"
      }
    },
    character(1)
  )
  record(event$type, paste(parts, collapse = " "))
})
chrome$Runtime$exceptionThrown(callback_ = function(event) {
  detail <- event$exceptionDetails
  record(
    "exception",
    detail$exception$description %||% detail$text %||% "unknown"
  )
})

`%||%` <- function(a, b) if (is.null(a)) b else a

# navigate(wait_ = TRUE) already waits for the navigation to commit, and on a
# page that loads quickly the load event can fire inside that call. Waiting
# for it again then sits there until the timeout and kills the run for no
# reason, which is a confusing way to lose a check that was about to pass.
chrome$Page$navigate(url, wait_ = TRUE)
try(chrome$Page$loadEventFired(wait_ = TRUE, timeout_ = 20), silent = TRUE)

# A Shiny React app is not finished when load fires. The websocket still has
# to connect and the first outputs have to arrive.
Sys.sleep(wait)

result <- NULL
if (!is.null(js)) {
  evaluated <- chrome$Runtime$evaluate(
    js,
    returnByValue = TRUE,
    awaitPromise = TRUE,
    timeout_ = eval_timeout
  )
  result <- evaluated$result$value
  if (!is.null(evaluated$exceptionDetails)) {
    record("exception", evaluated$exceptionDetails$text %||% "eval failed")
  }
}

chrome$screenshot(filename = paste0(out, ".png"), show = FALSE)

if (!is.null(canvas_selector)) {
  grab <- sprintf(
    "(() => {
       const source = document.querySelector(%s);
       if (!source) return null;
       const copy = document.createElement('canvas');
       copy.width = source.width;
       copy.height = source.height;
       const ctx = copy.getContext('2d');
       ctx.fillStyle = '#ffffff';
       ctx.fillRect(0, 0, copy.width, copy.height);
       ctx.drawImage(source, 0, 0);
       return copy.toDataURL('image/png');
     })()",
    jsonlite::toJSON(canvas_selector, auto_unbox = TRUE)
  )
  shot <- chrome$Runtime$evaluate(grab, returnByValue = TRUE)$result$value
  if (is.null(shot)) {
    cat("canvas:     no element matched ", canvas_selector, "\n", sep = "")
  } else {
    payload <- sub("^data:image/png;base64,", "", shot)
    writeBin(jsonlite::base64_dec(payload), paste0(out, "-canvas.png"))
    cat("canvas:    ", paste0(out, "-canvas.png"), "\n", sep = " ")
  }
}

lines <- messages$lines
writeLines(lines, paste0(out, ".log"))

cat("url:       ", url, "\n", sep = "")
cat("screenshot:", paste0(out, ".png"), "\n", sep = " ")
cat("console:   ", length(lines), " messages\n", sep = "")

if (length(lines)) {
  cat("\n--- console ---\n")
  cat(paste(lines, collapse = "\n"), "\n")
}

if (!is.null(js)) {
  cat("\n--- eval ---\n")
  cat(
    jsonlite::toJSON(result, auto_unbox = TRUE, pretty = TRUE, null = "null"),
    "\n"
  )
}

errors <- grep("^\\[(error|exception)\\]", lines, value = TRUE)
if (length(errors)) {
  cat("\n", length(errors), " console errors.\n", sep = "")
  quit(status = 1L)
}

cat("\nNo console errors.\n")
