# Protein view

```
Claim:        Real 3D orbit and style switching, with no htmlwidget to write.
Plain Shiny:  Using a JS library at all means authoring and shipping an R package.
This app:     npm install, then import it. A hosted Shiny widget sits beside it, for contrast.
```

## What it does

Ubiquitin, 1UBQ from the Protein Data Bank, refined to 1.8 angstroms. The
server parses the file and sends both the text and its own residue table. The
browser renders it with 3Dmol.js: orbit, zoom, four representations, four
colourings.

3Dmol.js has no Shiny binding. In a plain Shiny app, using it would mean
writing an htmlwidget: an R package with a bundled JavaScript build, a
binding, and a release cycle of its own. Here it is `npm install 3dmol` and a
ref.

Clicking an atom does reach the server. 3Dmol knows which residue was
clicked, but where that residue sits against every other one needs the whole
structure, so the server answers it.

## The two controls are the point

The toolbar has two controls, built two different ways, doing comparable
jobs. They are labelled with which is which.

**Colour by** is React state, written with `useShinyInput`. It is the default
and it is how every other app in this gallery works.

**Representation** is a real Shiny `selectInput`. The server renders it with
`render.ui` / `renderUI`, and the client hosts it with
`<ShinyOutput className="shiny-html-output" />`. It writes `input$style`
exactly as it would in a classic Shiny app, and `updateSelectInput` would
still work against it.

This is the escape hatch from the shinyreact docs: use it when you want the
genuine widget rather than owning the state.

## What the hosted widget costs, and why the echo exists

A hosted Shiny widget's value cannot be read from the client directly.
`useShinyInputValue` subscribes to shinyreact's own input registry, which
only holds ids that a shinyreact producer registered, and a hosted widget is
not one. Asking for `input$style` from React returns `undefined` no matter
how you ask.

So the server publishes it back:

```r
output$active_style <- reactive_output({ input$style })
```

and the client reads that output. The widget's value goes client to server to
client, which is one round trip per change. React state costs none.

That is the real trade, and this app leaves it visible rather than hiding it.

It cost a bug to find. The first version read `useShinyInputValue("style")`,
the hosted select updated Shiny's input correctly, and the 3D view did not
move. Nothing logged an error. A `data-style` attribute on the viewer element
is what separated "the viewer ignored us" from "React never got the value".

## One thing the two languages disagree about

`selectInput` in R turns selectize on by default. Shiny for Python deprecated
the argument and renders a plain select. A selectize widget and a plain
select are not driven the same way, so one client against both servers needs
them to match. `app.R` spells out `selectize = FALSE`.

## The measurement

| | |
| --- | --- |
| Structure | 1UBQ, 602 atoms, 76 residues, 58 waters |
| Parse and first draw | 109 to 154 ms |
| Payload | 87 KB, the PDB text plus the residue table |
| Round trips while orbiting and zooming | 0 |
| Round trips per representation change | 1, through the echo above |

Secondary structure comes from the file's own HELIX and SHEET records rather
than being worked out from geometry: 16 residues helix, 33 sheet, 27 coil.
Both servers agree on all of it.

## Run it

```powershell
# Python
shiny run apps/protein-view/app.py

# R
Rscript --% -e "shiny::runApp('apps/protein-view', port = 3838)"
```

## Tests

```powershell
npx vitest run apps/protein-view                                     # 10 client
.venv/Scripts/python -m pytest apps/protein-view                     # 15 Python
Rscript --% -e "shiny::runTests('apps/protein-view', assert = TRUE)"  # 48 R
```

Both languages check the parsed sequence against the real ubiquitin sequence,
which is the strongest single check that the file was read correctly rather
than plausibly. Both pin the same composition and the same residue detail.

## Credit

The structure is [1UBQ](https://www.rcsb.org/structure/1UBQ), Vijay-Kumar,
Bugg and Cook, 1987, from the Protein Data Bank. PDB data is free to use.
