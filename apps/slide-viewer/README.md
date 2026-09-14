# Slide viewer

```
Claim:        Gigapixel deep zoom, which a server rendered image cannot do at all.
Plain Shiny:  renderImage sends one downsampled PNG. There is no zoom.
This app:     A tile pyramid the client builds as the viewer moves.
```

## What it does

A whole slide image viewer. The slide is 98,304 by 65,536 pixels at 0.25
microns per pixel, which is 6.44 gigapixels and an ordinary size for a
pathology scan.

There is no image file. The server describes the slide in about two
kilobytes: its dimensions, its eighteen zoom levels, eight tissue lobes and
twelve flagged regions. OpenSeadragon asks for level 14, column 9, row 6, and
the browser draws that tile from the description. The viewer cannot tell the
difference between this and a server holding a real pyramid.

Clicking a flagged region does reach the server. The client drew the marker,
so it has the box and the label. It does not have the nuclear count, the
density or the mitotic figures, and that panel is the only thing here that
needs a server.

## The measurement

Driven in headless Chrome, both servers, identical results.

| | At the start | After zooming in |
| --- | --- | --- |
| Pyramid level | L10 | L17 |
| Magnification | 0.31x | 40x |
| Scale | 32.0 um per pixel | 0.25 um per pixel |
| Tiles drawn | 12 | 109 |
| Server round trips | 2 | **2** |

Sixteen zoom steps, seven pyramid levels, 128 times deeper, 97 new tiles, and
the server was not asked for anything. That is the claim.

A plain Shiny version of this sends one PNG of whatever size you chose in
advance. Zooming it shows you bigger pixels.

## How the tiles are drawn

Two regimes, because one does not work at both ends of an eighteen level
pyramid.

Zoomed out, one tile pixel covers hundreds of slide pixels, and a nucleus is
far smaller than a pixel. Drawing them would mean millions of ellipses per
tile for something the eye reads as a smooth wash, so the wash is drawn
directly, on a coarse grid scaled up.

Zoomed in, a nucleus is several pixels across and its shape is the point, so
each one is drawn: position, size, elongation, angle and stain all from a
hash of its lattice cell.

`tissueAt` takes fractions of the slide rather than tile pixels, so the same
point gives the same answer at every level. Without that the tissue drifts
under the reader as they zoom, which looks like a rendering glitch rather
than the arithmetic bug it is. There is a test for it.

## One R bug worth naming

`WIDTH * HEIGHT` with both stored as integers is 6.4 billion, which overflows
R's 32 bit integer and comes out `NA` with only a warning. Python has no such
limit and returned the right number, so the two servers disagreed and only
one of them said anything. There is a test pinning it.

## Run it

```powershell
# Python
shiny run apps/slide-viewer/app.py

# R
Rscript --% -e "shiny::runApp('apps/slide-viewer', port = 3838)"
```

Scroll to zoom, drag to pan. With the viewer focused, `+` and `-` zoom and
`0` goes back to the whole slide.

## Tests

```powershell
npx vitest run apps/slide-viewer                                     # 15 client
.venv/Scripts/python -m pytest apps/slide-viewer                     # 14 Python
Rscript --% -e "shiny::runTests('apps/slide-viewer', assert = TRUE)"  # 123 R
```

Both languages pin the same region measurements, and both assert that the
region list carries no measurement at all. The day it does, clicking a marker
stops needing the server and the app stops making its point.
