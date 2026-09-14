# Genome tracks

```
Claim:        Drag the locus across a large interval set with no server call.
Plain Shiny:  Each pan re-queries the server and re-renders a track image.
This app:     The server sends the region once. Windowing is a client transform.
```

## What it does

A small genome browser. The server sends one chromosome of synthetic gene
annotation, 8,000 genes and 24,000 coverage bins for chr1, and then stops.
The browser draws a gene track and a coverage track on a canvas.

Dragging pans. Scrolling zooms about the pointer. Both are arithmetic on two
numbers followed by a repaint, so neither reaches the server.

Clicking a gene does reach the server, and that is the point of the split. The
client knows where every gene is drawn, because it has the coordinates. It
does not know the mean read depth over that gene, or how many genes sit within
a megabase, because both need the whole chromosome at once.

The round trip counter is on screen. Pan and zoom as much as you like and it
does not move.

## The measurement

Driven in headless Chrome, both servers, identical results.

| Action | Locus | Genes in view | Round trips |
| --- | --- | --- | --- |
| Start | `chr1:0-4,000,000` | 44 | 4 |
| After a 300px drag | `chr1:1,125,704-5,125,704` | 40 | 4 |
| After four zoom steps | `chr1:2,306,504-3,944,904` | 20 | 4 |

Frame time while panning: 0.1 to 0.3 ms. The chromosome payload is 149 KB of
base64, sent once.

The counter measures answers from the server, not renders, so the row that
matters is the one where the locus changes and the count does not.

## Why it is fast

Gene starts are sorted, so finding what is in view is a binary search rather
than a scan of 8,000 genes. The search steps back by the longest gene on the
chromosome first, because a long gene can start well before the view and still
reach into it. There is a test for exactly that case: it is the bug where a
wide gene disappears whenever you scroll into its middle.

Hovering is tracked in a ref and repaints the canvas directly. Through React
state it would re-render the tree on every pointer move.

## The data

`tools/gen-data/genome-tracks.py` writes three chromosomes, 231 KB in total.
Genes cluster rather than spread evenly, because a uniform track looks wrong
to anyone who has seen a real one. Lengths are log normal and biotypes follow
roughly the real proportions.

Gene names are not stored. Both servers and the client build the same name
from the biotype and the index, which saves shipping a table of eight thousand
strings.

The data is synthetic. No real genome was involved.

## Run it

```powershell
# Python
shiny run apps/genome-tracks/app.py

# R
Rscript --% -e "shiny::runApp('apps/genome-tracks', port = 3838)"
```

## Tests

```powershell
npx vitest run apps/genome-tracks                                     # 18 client
.venv/Scripts/python -m pytest apps/genome-tracks                     # 13 Python
Rscript --% -e "shiny::runTests('apps/genome-tracks', assert = TRUE)"  # 56 R
```

One R test pins the same gene details the Python test does. R has no unsigned
32 bit integer, so positions past two billion would wrap on a naive read;
there is a test for that too.
