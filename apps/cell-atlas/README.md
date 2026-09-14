# Cell atlas

```
Claim:        200,000 cells stay interactive, with lasso select.
Plain Shiny:  A server rendered PNG, or a plotly figure that stalls past 10,000 points.
This app:     One payload, a WebGL scatter, selection handled on the client.
```

## What it does

The server reads 200,000 synthetic single cells from a binary file and sends
every position to the browser once. The browser draws them in one WebGL
scatter and owns everything after that: panning, zooming, hovering and drawing
a lasso all happen locally.

Two things do reach the server. Picking a gene asks it for that gene across
all 200,000 cells, because only the server holds the expression matrix.
Closing a lasso sends the selected cell indices, and the server answers with
the cluster make up of that group and which genes are higher inside it than
outside.

The counter labelled "server round trips" is on screen so you can watch this.
Pan and zoom as much as you like and it does not move.

## The measurement

Taken on a Windows laptop, Chrome 141, Python server.

| | |
| --- | --- |
| Cells | 200,000 |
| Point cloud payload | 1.33 MB of base64, sent once |
| Gene expression payload | 267 KB, per gene change |
| Lasso of 15,000 cells, uploaded | 80 KB |
| Server time to summarize that lasso | 3.7 ms in Python, 17 ms in R |
| Round trips while panning and zooming | 0 |

The round trip count is the honest part of the claim, and it is the one you
can check yourself in the browser. The frame rate readout counts frames the
scatter actually drew, so it reads zero when the plot is idle. The number that
means anything is the one while you are dragging.

Payload sizes were measured with `tools/gen-data/cell-atlas.py` and the
timings by calling the logic module directly, not through Shiny.

## Why 200,000 and not more

The first version claimed 500,000. At that size the committed binary was
2.25 MB, over the large file limit for this repo, and the point cloud payload
grew past 3 MB. The claim was cut to a number that fits and that is still
several times past where plotly gives up.

The limit here is the payload, not the renderer. The GPU is not working hard
at 200,000 points.

## How the data is made

`tools/gen-data/cell-atlas.py` writes `data/atlas.bin` and `data/atlas.json`:
eight clusters of a synthetic PBMC-shaped atlas, with four marker genes. The
binary is committed so both servers read identical bytes.

Expression is not stored. Each cell carries one noise byte per gene, and the
servers turn that into a dropout and a spread around the cluster mean. That
halves the file and still gives the zero heavy distribution that makes a gene
coloring look like counts rather than a gradient.

The data is synthetic. It is shaped like a PBMC atlas because that shape is
familiar, but no real cells were involved.

## Run it

```powershell
# Python
shiny run apps/cell-atlas/app.py

# R
Rscript --% -e "shiny::runApp('apps/cell-atlas', port = 3838)"
```

Both read the same `www/ui.js`. Rebuild it after any change under `src/`:

```powershell
npm run build -w cell-atlas
```

## Tests

```powershell
npx vitest run apps/cell-atlas                                     # 19 client
.venv/Scripts/python -m pytest apps/cell-atlas                     # 15 Python
Rscript --% -e "shiny::runTests('apps/cell-atlas', assert = TRUE)"  # 53 R
```

One R test hard codes numbers taken from the Python run: the marker order and
the log2 fold changes for a fixed selection. Two servers reading one file have
to produce one answer, and that test is where it stops being an assumption.
