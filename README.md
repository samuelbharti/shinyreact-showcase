# shinyreact showcase

Fifteen small Shiny apps whose screen is built in React. Each app proves one
thing that Shiny React makes possible and plain Shiny does not.

This is not a collection of large dashboards. Every app fits on one screen and
answers one question: what can you build when the browser owns the interface
and Shiny only sends data?

[Shiny React](https://posit-dev.github.io/shinyreact/) is a bridge between a
Shiny server and a React front end. The server holds reactive computation and
returns JSON. A React client that you write holds all of the interface. The two
meet at named inputs and outputs.

## The rule every app follows

An app belongs here only when you can fill in these three lines:

```
Claim:        200,000 cells stay interactive, with lasso select.
Plain Shiny:  A server rendered PNG, or a plotly figure that stalls past 10,000 points.
This app:     One payload, a WebGL scatter, selection handled on the client.
```

The three lines live in `catalog.yml` and appear on the gallery card and in the
README of the app. If you cannot write them, the app does not make a point.

Two more rules keep the apps small:

1. One screen per app. No tabs and no wizards. The gallery is the navigation.
2. No downloads at run time and no API keys. Each app ships its own small data
   file. This is what lets one process serve every app.

## The apps

<!-- catalog:start -->

15 apps, 8 built so far.

| # | App | Domain | The claim | Library | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | [Cell atlas](apps/cell-atlas) | Single cell biology | 200,000 cells stay interactive, with lasso select. | regl-scatterplot | done |
| 2 | [Market candles](apps/market-candles) | Finance | Crosshair, pan and zoom with zero server round trips. | lightweight-charts | done |
| 3 | [Sensor stream](apps/sensor-stream) | IoT telemetry | Updates at 20Hz append one point instead of redrawing the plot. | uPlot | done |
| 4 | [Genome tracks](apps/genome-tracks) | Genomics | Drag the locus across a large interval set with no server call. | canvas + d3-scale | done |
| 5 | [Slide viewer](apps/slide-viewer) | Pathology imaging | Gigapixel deep zoom, which a server rendered image cannot do at all. | OpenSeadragon | done |
| 6 | [City density](apps/city-density) | Geospatial | Half a million trips, rebinned into hexagons on every zoom, with no server call. | deck.gl | done |
| 7 | [Protein view](apps/protein-view) | Structural biology | Real 3D orbit and style switching, with no htmlwidget to write. | 3Dmol.js | done |
| 8 | Linked brush | Statistics and EDA | Four charts brush each other instantly, all on the client. | visx | planned |
| 9 | Query lab | Data engineering | A real editor: syntax highlighting, completion, and a squiggle on the failing line. | CodeMirror 6 | planned |
| 10 | [Big grid](apps/big-grid) | BI and tabular | All million rows scrollable, with filter and sort in the browser. | TanStack Virtual | done |
| 11 | Fleet board | Operations | Drag and drop that commits optimistically: the card moves before the server confirms. | dnd-kit | planned |
| 12 | Churn monitor | ML monitoring | Move the decision threshold and every metric updates with no round trip. | visx | planned |
| 13 | Supply flow | Supply chain | States animate into each other instead of flickering. | d3-sankey + motion | planned |
| 14 | Text lens | NLP | Token level highlighting and selection across a long document. | CodeMirror decorations | planned |
| 15 | Survey builder | Forms and data entry | A multi step form with validation and undo, without a reactive per field. | react-hook-form + zod | planned |

### Where the claim is measured, not asserted

These apps render the plain Shiny version beside the React one, with a
counter, so you can see the difference rather than take it on trust.

- **Cell atlas** 200,000 cells stay interactive, with lasso select.
- **Market candles** Crosshair, pan and zoom with zero server round trips.
- **Big grid** All million rows scrollable, with filter and sort in the browser.
- **Churn monitor** Move the decision threshold and every metric updates with no round trip.

### Feature coverage

Which app exercises which part of shinyreact. A row reading
**nothing yet** is a real gap.

| Feature | Apps | Where |
| --- | --- | --- |
| `useShinyInput` | 13 | cell-atlas, market-candles, genome-tracks, slide-viewer, city-density, protein-view, linked-brush, query-lab, big-grid, churn-monitor, supply-flow, text-lens, survey-builder |
| `useShinyInputValue` | 1 | linked-brush |
| `useSetShinyInput` | 2 | market-candles, fleet-board |
| `useShinyOutputValue` | 14 | cell-atlas, market-candles, genome-tracks, slide-viewer, city-density, protein-view, linked-brush, query-lab, big-grid, fleet-board, churn-monitor, supply-flow, text-lens, survey-builder |
| `useShinyOutputStatus` | 6 | cell-atlas, market-candles, city-density, protein-view, big-grid, text-lens |
| `useShinyOutputError` | 1 | query-lab |
| `useShinyMessageHandler` | 1 | sensor-stream |
| `useShinyInitialized` | 15 | cell-atlas, market-candles, sensor-stream, genome-tracks, slide-viewer, city-density, protein-view, linked-brush, query-lab, big-grid, fleet-board, churn-monitor, supply-flow, text-lens, survey-builder |
| `useShinyBusy` | 3 | sensor-stream, query-lab, text-lens |
| `ShinyOutput` | 1 | protein-view |
| `ImageOutput` | 2 | market-candles, churn-monitor |
| `ShinyModuleProvider` | 1 | fleet-board |
| `typed inputs` | 1 | survey-builder |
| `bookmarking` | 1 | supply-flow |
| `send_message` | 1 | sensor-stream |

<!-- catalog:end -->

## Every app runs two servers

Each app ships an `app.py` and an `app.R` that read the same built client in
`www/`. The React code is written once. This is the point of building both: it
shows how little of an app depends on the language of the server.

```powershell
# Python
shiny run apps/cell-atlas/app.py

# R
Rscript --% -e "shiny::runApp('apps/cell-atlas', port = 3838)"
```

## Run the whole gallery

The gallery serves every app from one process. There are two of them, one per
language.

```powershell
shiny run app.py                                  # Python, apps at /app/<slug>/
Rscript --% -e "shiny::runApp('.', port = 3838)"  # R, apps at /?app=<slug>
```

The two use different URL shapes because R and Python serve their assets
differently. The landing page reads the correct link out of `catalog.yml`, so
the React client never has to know which server it runs on.

## Set up a checkout

You need Node 20 or later, Python 3.12 or later, and R 4.4 or later.

```powershell
npm install
uv venv
uv pip install -r requirements.txt
prek install
```

The R package is not on CRAN yet. Install it from GitHub:

```r
pak::pak("posit-dev/shinyreact/pkg-r")
```

## Build the client

Every app commits its built `www/ui.js` and `www/ui.css`. Posit Connect Cloud
runs no Node at deploy time, so the built file has to be in the repository.
Continuous integration rebuilds each app and fails the pull request when the
committed file does not match the source.

```powershell
npm run build -w apps/<slug>    # build once
npm run dev -w apps/<slug>      # rebuild on every change
npm run check-built             # what CI runs
```

A stale `www/ui.js` is the second most common confusion in a Shiny React app.
The first is two copies of React on one page, which makes every hook return
nothing. The Vite configuration in `templates/app/` prevents that by leaving
React out of the bundle. Copy it. Do not write one by hand.

## Add an app

```powershell
node tools/new-app.mjs <slug> "Title"
```

The script copies `templates/app/` into `apps/<slug>` and renames the Python
logic module after the slug. Then add a row to `catalog.yml` with all three
claim fields, and run `npm run catalog` to rewrite the tables above.

Read [CONTRIBUTING.md](CONTRIBUTING.md) before you write the app itself.

## Tests

Each app has three layers of tests. Run the cheapest one that can see the
behavior you changed.

```powershell
npx vitest run apps/<slug>                                    # the client
.venv/Scripts/python -m pytest apps/<slug>                    # Python logic
Rscript --% -e "shiny::runTests('apps/<slug>', assert = TRUE)"  # R logic and server
```

## License

MIT. See [LICENSE](LICENSE).
