# APP_TITLE

```
Claim:        Fill this in from catalog.yml.
Plain Shiny:  What plain Shiny does instead, and why it is worse here.
This app:     How this app does it.
```

Replace the three lines above before this app ships. An app that cannot fill
them in does not belong in the gallery. Keep them identical to the `claim`,
`plain_shiny` and `this_app` fields in `catalog.yml`.

## What it does

One paragraph, in plain English, written before the tests. An agent that
writes the client and then writes the client tests is only agreeing with
itself. This description is what a reader can falsify at a glance.

## The measurement

State the number behind the claim and how it was measured. Points rendered,
frame time, rows filtered, round trips avoided. A claim with no number is an
assertion.

## Run it

```powershell
# Python
shiny run apps/APP_NAME/app.py

# R
Rscript --% -e "shiny::runApp('apps/APP_NAME', port = 3838)"
```

Both servers read the same `www/ui.js`. Rebuild it after any change under
`src/`:

```powershell
npm run build -w apps/APP_NAME     # or `npm run dev -w apps/APP_NAME` to watch
```

A stale `www/ui.js` is the second most common confusion in a shinyreact app,
after two copies of React. CI rebuilds it and fails the PR when the committed
file does not match the source.

## Tests

```powershell
npx vitest run apps/APP_NAME                                  # client
.venv/Scripts/python -m pytest apps/APP_NAME                  # Python logic
Rscript --% -e "shiny::runTests('apps/APP_NAME', assert = TRUE)"   # R logic and server
```
