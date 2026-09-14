# gallery

The thing that gets deployed. It serves every app in `catalog.yml` from one
process, and puts a landing page in front of them.

There are two of them, one per language, because a piece of content on Posit
Connect Cloud is either Python or R and never both. They share this one React
client.

The entry points are [`app.py`](../app.py) and [`app.R`](../app.R) at the
**repo root**, not here. The gallery reads `catalog.yml` and the app
directories at run time, so the repo root is the deployable unit. This
directory holds the gallery's own code and nothing else.

## Why one process holds every app

The Connect Cloud free plan allows five applications. Fifteen separate pieces
of content do not fit.

Documents are unlimited, but a Shiny app is not a document.

## How it routes

| | Python | R |
| --- | --- | --- |
| Landing page | `/` | `/` |
| One app | `/app/<slug>/` | `/?app=<slug>` |
| Back link | `../../` | `?` |

The two shapes are different on purpose.

Python mounts each app as a real, independent `shiny.App` under its own path.
Each one gets its own session table, its own input and output namespace, its
own dependency router and its own bookmark store. One app throwing takes down
one session, not the process.

R routes on the query string instead. R renders dependency hrefs relative and
serves `addResourcePath()` prefixes from the server root, so an app page at
`/app/<slug>/` would ask for `/app/<slug>/shinyreact-0.1.1/...` and get a 404.
The fix for that is a `<base href="/">`, which then fights the websocket path.
Not worth it.

The landing page never learns which shape it is on. Each card links to the
`href` the server put in the catalog, so the same `www/ui.js` serves both.

A card is a real link, so moving into an app is a page load rather than client
side navigation. Each app owns its own bundle, so there is nothing to gain
from a shared router.

A slug the registry does not know lands on the landing page, not an error. A
bad link should not look like a broken app.

## How an app gets loaded

An app is built the first time somebody asks for its URL, and never before.
Fifteen apps importing numpy and reading their data at startup is how a
deployment misses the 60 second Connect Cloud startup window.

Nothing here shims anything, because the apps are written to be loaded. Every
app defines `ui` and `server` at top level and reads its own files through
`__file__` in Python or `APP_DIR` in R. The `ReactApp()` or `shinyApp()` call
at the bottom of an app is only there so it runs on its own.

The gallery builds its own page around the app's `server`, which is how the
back link gets added and how `src_dir` becomes an absolute path.

One difference worth knowing: the Python gallery imports in a worker thread,
so a slow app blocks nobody. R is single threaded, so the first visit to an R
app blocks every other session while `app.R` runs. Keep top level work in an
`app.R` under a second.

## The landing page

`catalog.yml` is inlined into the document as a JSON script tag, so the cards
paint on the first frame rather than after the websocket opens. There is no
generated `catalog.json`, and no `reactive_output` carrying the catalog.

Both languages must produce the same card shape. That is the one place the two
deployments can silently diverge, so `tests/fixtures/card-keys.json` pins it
and both test suites check against it.

## Tests

```powershell
.venv/Scripts/python -m pytest gallery          # Python gallery
Rscript --% -e "shiny::runTests('.', assert = TRUE)"   # R gallery
```

The R tests live in `tests/` at the repo root, because the repo root is the R
gallery app.

## Checking it in a browser

```powershell
shiny run app.py
Rscript tools/peek.R --url http://127.0.0.1:8000/ --out docs/local/peek/gallery
```

`tools/peek.R` reports the browser console, which is what catches an app
failing quietly. For anything drawing on a canvas, add
`--canvas "<selector>"`: Chrome leaves canvas content out of a page
screenshot in headless, so the page shot comes back blank while the app is
fine.
