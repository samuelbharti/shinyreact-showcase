# City density

```
Claim:        Half a million trips, rebinned into hexagons on every zoom, with no server call.
Plain Shiny:  leaflet clusters give up well before half a million markers.
This app:     One typed array to the GPU. Binning happens per zoom, locally.
```

## What it does

Half a million synthetic taxi trips over a synthetic city. The server sends
the positions once. The browser bins them into hexagons and rebins whenever
the hexagon radius changes, which is every zoom step and every change of bin
size. None of that reaches the server.

Clicking a hexagon does reach the server, and that is the split worth
showing. The client has the positions, so it could count the trips itself. It
does not have the hour, the fare or the duration of any trip, and it never
will: those columns stay on the server, and the panel that breaks them down
is the one thing here that needs it.

## The measurement

Driven in headless Chrome, both servers, identical results.

| | |
| --- | --- |
| Trips | 500,000 |
| Positions payload | 2.67 MB of base64, sent once |
| First bin | 490 to 512 ms |
| Rebin after a zoom step | 32 to 42 ms |
| Zoom steps driven | 5, radius 1,863 m down to 217 m |
| Rebins | 1 to 6 |
| Round trips across all of it | 2, unchanged |

The rebin counter and the round trip counter sit next to each other on
screen. One moves when you zoom and the other does not, which is the claim in
two numbers.

## Two things that were wrong first

**Positions need three components, not two.** deck.gl reads positions as 3D
and strides the buffer accordingly, so a two component array is read as
interleaved nonsense. The layer then draws nothing, logs nothing and throws
nothing. The only signal was a blank map, and there is a test for it now.

**Unclamped normals have no edges.** The first version drew a uniform sheet
of hexagons over the whole viewport, because the tails of the trip
distributions put a stray trip in every bin. Clamping at 2.8 sigma gives the
map a ragged edge and a recognizable city.

## Why there is no data file

Half a million positions would be a two megabyte binary. The trips are
generated instead, from a hash of the trip number, which gives the same
answer in R and in Python. Both servers build the same city, and the repo
carries none of it.

The only file is `data/boundary.json`, under 3 KB: a city outline and a river
so the hexagons sit on something recognizable. There is no basemap. This app
downloads nothing at run time, which is what lets the gallery deploy as one
process.

## Run it

```powershell
# Python
shiny run apps/city-density/app.py

# R
Rscript --% -e "shiny::runApp('apps/city-density', port = 3838)"
```

## Tests

```powershell
npx vitest run apps/city-density                                     # 9 client
.venv/Scripts/python -m pytest apps/city-density                     # 18 Python
Rscript --% -e "shiny::runTests('apps/city-density', assert = TRUE)"  # 57 R
```

One test in each language asserts the same hexagon summary: 4,690 trips,
Central 3,937, median fare 14.27. Two servers generating the same city have
to produce one answer.
