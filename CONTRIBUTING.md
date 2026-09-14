# Contributing

Thank you for looking. This repo has one unusual rule, and most of this page
explains it.

## Every app must make a claim

An app belongs here only when you can fill in three lines:

```
Claim:        200,000 cells stay interactive, with lasso select.
Plain Shiny:  A server rendered PNG, or a plotly figure that stalls past 10,000 points.
This app:     One payload, a WebGL scatter, selection handled on the client.
```

The lines go in `catalog.yml` and in the README of the app. They must match.

A claim needs a number, and a note on how you measured it. "Faster" is not a
claim. "60 frames per second while panning 200,000 points, measured with the
Chrome performance panel" is a claim.

If the same app is as easy to write in plain Shiny, it does not belong here.
That is not a judgement about the app. It just does not show anything.

## Apps stay small

1. One screen per app. No tabs and no wizards. The gallery is the navigation.
2. No downloads at run time and no API keys. Ship a small data file under
   `data/`, and the script that made it under `tools/gen-data/`.

Rule 2 exists because one process serves all 15 apps. An app that reaches the
network on startup breaks the gallery for everyone.

## Start a new app

```powershell
node tools/new-app.mjs <slug> "Title"
npm install
npm run build -w apps/<slug>
shiny run apps/<slug>/app.py
```

Then add the row to `catalog.yml` and run `npm run catalog`.

The scaffold is a working histogram app. Replace it. Keep the shape.

## The contract every app follows

The gallery loads all 15 apps into one process, so every app file produces a
`server` function and a `ui` that the gallery composes. The `ReactApp()` or
`shinyApp()` line at the bottom exists only so the app runs on its own.

Six rules follow from that. Break one and the app works alone and fails in the
gallery, which is the worst way to find out.

1. In Python, resolve every path against `__file__`. `shiny run` does not
   change the working directory, and the gallery imports the module from the
   repo root.
2. In R, resolve every path against `APP_DIR`. Keep the
   `exists("APP_DIR", inherits = FALSE)` guard exactly as the template writes
   it. Without `inherits = FALSE`, one app can read another app's `APP_DIR`.
3. Name the Python logic module after the slug, for example `cell_atlas.py`.
   Never `logic.py`. All 15 apps share one `sys.modules`, so two helpers with
   the same name collide and the second app silently gets the first one.
4. Use Shiny Core in Python, not Express. Express gives the gallery no way to
   add the back link.
5. Do not register process level cleanup. Mounted sub-apps never receive ASGI
   lifespan events, so `App.on_shutdown()` inside an app never runs.
6. Keep work at the top of `app.R` under a second. R is single threaded, so the
   first visit to an app blocks every other session while it loads. Precompute
   heavy data into a file instead.

## The client

Copy `templates/app/vite.config.ts` without changing it. It leaves React out of
the bundle so your app shares the React instance that owns the hooks.

If you bundle your own React, every hook returns nothing and no error appears
anywhere. This is the most common way to lose an afternoon on a Shiny React
app.

Read the hooks off `window.shinyreact` inside the component, not at the top of
the file:

```tsx
export default function App() {
  const { useShinyInput, useShinyOutputValue } = window.shinyreact;
  ...
}
```

At module scope the file cannot be imported before the global exists, which
makes the component impossible to test.

Install a library rather than writing a widget. A date picker, a data grid, a
combobox and a chart all have good versions on npm, with tests and an issue
tracker. Write a component from scratch only when it is specific to your app.

## Build output is committed

Posit Connect Cloud runs no Node at deploy time, so `www/ui.js` and
`www/ui.css` are committed on purpose. Rebuild after every change to `src/`:

```powershell
npm run build -w apps/<slug>
```

`npm run check-built` rebuilds everything and fails when a committed bundle
does not match its source. CI runs it on every pull request, so a stale bundle
cannot merge.

## Tests

Write down what the app does, in plain English, before you write the tests. An
agent or a person who writes the client and then writes the tests for that
client is only agreeing with themselves. The description is the thing a reader
can check at a glance.

Then test at the cheapest layer that can see the behavior:

```powershell
npx vitest run apps/<slug>                                      # the client
.venv/Scripts/python -m pytest apps/<slug>                      # Python logic
Rscript --% -e "shiny::runTests('apps/<slug>', assert = TRUE)"  # R logic and server
```

Keep pure computation in the logic module, not in `app.py` or `app.R`. Code
next to the page call cannot be reached by a test at all.

R has `shiny::testServer()`, which drives the reactive graph with no browser
and hands back the JSON the client would have received. Python has no
equivalent, which is why the importable module matters more there.

## Before you open a pull request

```powershell
npm run build --workspaces
npm run typecheck --workspaces
npm run check-built
npx vitest run
node tools/sync-requirements.mjs
npm run catalog
prek run --all-files
```

Branch off `dev`. Name the branch `feat/<name>`, `fix/<name>` or
`chore/<name>`. Title the pull request as a Conventional Commit.

House style: no em dashes, anywhere. Write plainly.

Never commit `.env`, `.Renviron`, or a key. A pre-commit hook blocks the common
names, but read a file before you stage it if it might hold a secret.
