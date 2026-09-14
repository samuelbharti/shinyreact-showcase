#!/usr/bin/env Rscript
# Screenshot one running app, full size, for the gallery thumbnail.
#
#   Rscript tools/shoot-thumbs.R --url http://127.0.0.1:8791/app/cell-atlas/ \
#                                --out docs/local/thumb-raw/cell-atlas.png
#
# Options:
#   --url   the running app. Required.
#   --out   where to write the PNG. Required.
#   --wait  seconds to let the app settle before looking. Default 14.
#   --size  viewport, as WIDTHxHEIGHT. Default 1280x860.
#
# Driven by tools/shoot-thumbs.mjs, which starts the gallery and loops the
# apps. It is a separate file because chromote is an R package and the image
# work afterwards is a Python one, and neither wanted to be the other.
#
# The WebGL problem, and why it is solved in the page rather than here.
#
# Chrome leaves WebGL out of a page screenshot in headless mode. A canvas
# without preserveDrawingBuffer has nothing in its buffer by the time the
# screenshot is composited, so the shot comes back with an empty plot and no
# error. cell-atlas did exactly that.
#
# Reading the canvas back through a 2D context does work. So before the
# screenshot, every canvas that has ink gets an <img> of its own pixels laid
# over it, and the screenshot then picks that up like any other image. Doing
# it in the page means no image editing here, it covers every canvas rather
# than a named list of apps, and it costs nothing for a 2D canvas, which
# simply gets a copy of what was already there.

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
wait <- as.numeric(arg_value("wait", "14"))
size <- arg_value("size", "1280x860")

if (is.null(url) || is.null(out)) {
  stop("Both --url and --out are required. See the comment at the top.")
}

dims <- as.integer(strsplit(size, "x", fixed = TRUE)[[1]])

# Same browser settings as tools/peek.R. --disable-gpu is dropped from
# chromote's defaults and SwiftShader turned on, or WebGL never starts at all
# and every canvas comes back empty for a different reason.
chromote::set_chrome_args(c(
  setdiff(chromote::get_chrome_args(), "--disable-gpu"),
  "--use-gl=angle",
  "--use-angle=swiftshader",
  "--enable-unsafe-swiftshader",
  "--hide-scrollbars"
))

OVERLAY <- '
(() => {
  const out = [];
  for (const canvas of document.querySelectorAll("canvas")) {
    try {
      const box = canvas.getBoundingClientRect();
      if (box.width < 8 || box.height < 8) continue;

      const copy = document.createElement("canvas");
      copy.width = canvas.width;
      copy.height = canvas.height;
      const ctx = copy.getContext("2d");
      ctx.drawImage(canvas, 0, 0);

      // Is there anything in it? A canvas the page never drew into reads
      // back transparent, and pasting that over a plot the screenshot did
      // capture would erase it.
      const pixels = ctx.getImageData(0, 0, copy.width, copy.height).data;
      let lit = 0;
      for (let i = 0; i < pixels.length; i += 4 * 199) {
        if (pixels[i + 3] !== 0) lit += 1;
      }
      if (lit < 20) {
        out.push({ w: copy.width, h: copy.height, lit: lit, overlaid: false });
        continue;
      }

      const img = document.createElement("img");
      img.src = copy.toDataURL("image/png");
      img.style.position = "absolute";
      img.style.left = (box.left + window.scrollX) + "px";
      img.style.top = (box.top + window.scrollY) + "px";
      img.style.width = box.width + "px";
      img.style.height = box.height + "px";
      img.style.zIndex = "9998";
      img.style.pointerEvents = "none";
      document.body.appendChild(img);
      out.push({ w: copy.width, h: copy.height, lit: lit, overlaid: true });
    } catch (error) {
      out.push({ error: String(error) });
    }
  }
  return out;
})()
'

session <- chromote::ChromoteSession$new(width = dims[[1]], height = dims[[2]])
on.exit(try(session$close(), silent = TRUE), add = TRUE)

# invisible(): chromote returns the protocol reply and R would print the
# whole thing, which buries the one line this script means to say.
# navigate(wait_ = TRUE) already waits for the navigation to commit, and on a
# page that loads quickly the load event can fire inside that call. Waiting
# for it again then sits there until the timeout and kills the run for no
# reason. It is a nicety in any case: what actually makes a shinyreact app
# ready is the sleep below, after the websocket has connected and the first
# outputs have arrived.
invisible(session$Page$navigate(url, wait_ = TRUE))
try(
  invisible(session$Page$loadEventFired(wait_ = TRUE, timeout_ = 20)),
  silent = TRUE
)
Sys.sleep(wait)

overlaid <- session$Runtime$evaluate(
  OVERLAY,
  returnByValue = TRUE,
  awaitPromise = TRUE,
  timeout_ = 120
)$result$value

# The overlay is a data URL, so the browser has to decode it before the
# screenshot. One second is plenty and beats guessing at a load event for an
# element that may not exist.
if (length(overlaid) > 0) {
  Sys.sleep(1)
}

dir.create(dirname(out), recursive = TRUE, showWarnings = FALSE)
invisible(session$screenshot(filename = out, show = FALSE))

canvases <- length(overlaid)
painted <- sum(vapply(
  overlaid,
  function(c) isTRUE(c$overlaid),
  logical(1)
))
cat(sprintf(
  "%s  %d canvas%s, %d overlaid\n",
  basename(out),
  canvases,
  if (canvases == 1) "" else "es",
  painted
))
