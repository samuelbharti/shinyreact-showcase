# Market candles

```
Claim:        Crosshair, pan and zoom with zero server round trips.
Plain Shiny:  Every hover and zoom is a websocket message and a full redraw.
This app:     The server sends a series once. Navigation is client state.
```

## What it does

Six symbols, 39,000 one minute bars each. Pick a symbol and the server sends
that symbol's whole history, about a megabyte. After that the chart owns
everything: panning, zooming, the crosshair, and the numbers in the panel
underneath.

There is a toggle. **Also draw it on the server** turns on a second view of
the same visible window, rendered as a PNG by matplotlib or by R's own
graphics and delivered through `ImageOutput`. That is what a plain Shiny app
shows, and every pan and zoom asks for another one.

Both views read the same numbers, computed the same way in three languages,
so the panel says the same thing whichever path drew the picture. The only
difference is what it cost.

## The measurement

Driven in headless Chrome, both servers, identical results.

| | Round trips |
| --- | --- |
| Page load: catalog, series, first flush | 4 |
| Six zoom steps, chart only | **4**, unchanged |
| Turning the comparison on | 5 |
| Four more zoom steps, server drawing | **9** |

Six zooms cost nothing. Four zooms cost four renders and four round trips.

Other numbers: the series is 1.04 MB of base64, decoded in 7 to 8 ms. A
server render of the window takes 75 to 89 ms in Python and 43 to 53 ms in R,
before the round trip.

## Why the series is not sent as JSON

Prices go as int32 in hundredths. Four bytes a field rather than eight, and a
hundredth of a currency unit is finer than any chart draws. The same series
as JSON numbers is several times larger for no visible gain.

There is a test asserting the round trip through int32 loses no more than
half a hundredth, which is the exact worst case for that rounding.

## Two things worth knowing

**matplotlib's first render costs a second and a half.** The font cache is
built on the first `savefig` in a process. Leaving that inside the first
render the reader asks for would make the server path look slower than it is
for a reason that has nothing to do with the comparison, so `warm_renderer`
pays it at load.

**`ImageOutput` renders as the image, not around it.** It becomes the `<img>`
itself, so `.shot` is the image and there is no child to style. It also has
to be given a size: with none it measures zero and the server is never asked
for anything.

## The bars are not stored

They are generated, from a hash of the bar number, in all three languages. A
geometric random walk per minute, with wicks scaled to each bar's own move
and volume that peaks at the open and the close.

Both servers pin the same first bar: open 142.50, high 142.5273, low 142.1498,
close 142.303, volume 3462. And the same window: 390 bars from 142.50 to
143.3093, up 0.568 percent, worst drawdown 1.22 percent.

Five hundred sessions was the first attempt. That made a five megabyte
payload, which is a worse trade than it looks, so it is a hundred.

## Run it

```powershell
# Python
shiny run apps/market-candles/app.py

# R
Rscript --% -e "shiny::runApp('apps/market-candles', port = 3838)"
```

## Tests

```powershell
npx vitest run apps/market-candles                                     # 17 client
.venv/Scripts/python -m pytest apps/market-candles                     # 18 Python
Rscript --% -e "shiny::runTests('apps/market-candles', assert = TRUE)"  # 55 R
```

One R server test asserts that with the comparison off, the server draws
nothing at all. If that ever starts answering, every pan is costing a render
nobody asked for, and the claim on the tin stops being true.
