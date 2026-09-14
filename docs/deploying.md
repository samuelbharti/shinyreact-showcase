# Deploying to Posit Connect Cloud

The gallery runs as two pieces of content on Connect Cloud, one per language.
Both serve all 15 apps from a single process.

| Content | Primary file | Dependency file | App URL |
| --- | --- | --- | --- |
| Python gallery | `app.py` | `requirements.txt` | `/app/<slug>/` |
| R gallery | `app.R` | `manifest.json` | `/?app=<slug>` |

## Why one process holds every app

The Connect Cloud free plan allows five applications. Fifteen separate pieces
of content do not fit, and the paid plan that does fit costs money for a demo.

Documents are unlimited on every plan, but a Shiny app is not a document.

So each gallery loads an app on the first visit to that app and keeps it for
the life of the process. Two pieces of content hold all 30 servers.

## Three facts that shape everything here

1. Connect Cloud runs no Node at deploy time. There is no `npm` in the image
   and no Node content type. Every `www/ui.js` is committed for this reason.
2. Connect Cloud copies the whole repository, so an app can read files outside
   its own directory. Do not rely on that. Resolve paths against `__file__` in
   Python and `APP_DIR` in R.
3. The dependency file must sit next to the primary file. Both live at the
   repository root, which is why the gallery entry points are there too.

## Python deployment

`requirements.txt` at the root is generated. It is the union of every
`apps/*/requirements.txt`:

```powershell
node tools/sync-requirements.mjs
```

Run it after any app adds a dependency, and commit the result. CI fails when
the file is out of date. If you skip this, the deployment starts and then fails
on the first visit to the app that needs the missing package.

Set the Python version to 3.12 in the content settings. Connect Cloud offers
3.9 through 3.14 and defaults to 3.11.

## R deployment

Connect Cloud reads `manifest.json`, not `renv.lock`. The manifest lists every
file with a checksum, so it must be regenerated after any build:

```powershell
npm run build --workspaces
Rscript --% -e "rsconnect::writeManifest(appDir = '.')"
```

Build first, then write the manifest. The other order records the checksum of
the old bundle, and the deployment then fails on a file that does not match.

`rsconnect::writeManifest()` reads `app.R` to decide which files to include,
and it misses `catalog.yml` and the app directories. Check the file list before
you deploy.

The R gallery waits for `shinyreact` to reach CRAN. Connect Cloud installs R
packages from CRAN, and the package is currently a GitHub install only. Until
then the R servers still run locally and still run in CI.

## First deployment of a new piece of content

1. Push to a public GitHub repository.
2. In Connect Cloud, choose Publish, then GitHub.
3. Pick the repository and branch, and set the primary file to `app.py`.
4. Leave automatic publishing on. Every push to the branch redeploys.
5. Open the URL and click into every card.

Record the content ID afterwards. `rsconnect` cannot look content up by name on
Connect Cloud, so the ID is the only stable handle for later automation.

## Bookmarking in the R gallery

URL bookmarking works in three of the four places an app can run, and not in
the fourth.

| Where | Works |
| --- | --- |
| `shiny run apps/supply-flow/app.py` | yes |
| `shiny::runApp("apps/supply-flow")` | yes |
| Python gallery, `/app/supply-flow/` | yes |
| R gallery, `/?app=supply-flow` | no |

The Python gallery enables it per app: `loader.py` passes
`bookmark_store="url"` to `ReactApp` for any app whose `catalog.yml` entry
lists `bookmarking` in its features.

The R gallery cannot, so far. Bookmarking in Shiny is one shiny option,
`bookmarkStore`, and a session reads it when the session is created. The R
gallery is a single app serving many, so the option has to be set on the
gallery. It was not possible to set it anywhere a session would see it:

- `shinyApp(enableBookmarking = "url")` puts it in the app object, and that
  is what `enableBookmarking()` does too, since the argument simply calls it.
- A top level `enableBookmarking("url")` in `app.R` runs while the file is
  being sourced, and `runApp()` scopes shiny options around the running app,
  so the value is gone before any session starts.
- `onStart = function() enableBookmarking("url")` did not reach it either.
- `shinyOptions(bookmarkStore = "url")` inside `router_ui`, which runs per
  request, does not reach the session that follows it.

In all four, `getShinyOption("bookmarkStore")` inside the session reads
unset, `session$doBookmark()` quietly does nothing, no `onBookmark` or
`onBookmarked` callback fires, and the address bar never moves. There is no
error and nothing in the log, which is the part worth knowing.

`router_server` already puts `?app=<slug>` back onto a bookmark URL, because
Shiny builds that URL from the app's inputs alone and would otherwise drop
the one parameter that says which app it is. Those lines do nothing today and
are kept for the day the option can be set.

This is not blocking anything. The R gallery is already waiting on
`shinyreact` reaching CRAN before it can be deployed at all.

## Known faults worth expecting

These came out of running the same setup in `shiny-showcase-bioinformatics`.
They are real and dated to rsconnect 1.11.0.

1. Connect Cloud creates content with `default_robots_policy: disallow_all`.
   A public gallery stays invisible to search engines until you change it.
2. `deployApp(appId =)` does not work for Connect Cloud. Content is identified
   through a local `rsconnect/*.dcf` record, which git ignores.
3. `rsconnect::applications()` fails for Connect Cloud accounts, so there is no
   lookup by name.
4. The idle timeout defaults to 5 seconds. The process stops soon after the
   last visitor leaves, and the next visitor waits for a cold start. Raise it
   to 60 seconds in the content settings if that matters.

## Checks before you deploy

```powershell
npm run build --workspaces
npm run check-built
npm run typecheck --workspaces
npx vitest run
node tools/sync-requirements.mjs
prek run --all-files

shiny run app.py
```

A deployment is verified by opening the URL and clicking into every card. A
green CI badge does not prove the deployment works.
