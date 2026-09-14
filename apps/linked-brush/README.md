# Linked brush

```
Claim:        Four charts brush each other while the pointer moves.
Plain Shiny:  Every brush is a round trip, and all four outputs re-render.
This app:     One payload, one selection in React state, one fit on release.
```

## What it does

Forty thousand stars, sent once. Four panels read the same table: colour
against brightness, position on the sky, distance, and how bright each star
looks from here. Drag a box on any of them and the other three follow the
pointer.

The panels cross filter. Each one holds its own rectangle and a star has to
satisfy all of them, so brushing the white dwarfs and then brushing the near
half of the distance histogram gives you the white dwarfs that are nearby,
not two separate selections.

When the pointer comes up, the browser sends the rectangles and the server
fits a least squares line through the stars they pick out. That dashed line
on the first panel is the only mark on the page that cost a round trip.

## The measurement

Driven in headless Chrome against both servers. Identical results.

| | Selections computed in the browser | Server round trips |
| --- | --- | --- |
| Page load | 1 | 3 |
| Dragging a box over the white dwarfs, 8 moves | 9 | **3**, unchanged |
| Letting go | 10 | 4 |
| Dragging a second box on the distance panel, 6 moves | 16 | **4**, unchanged |
| Letting go | 17 | 5 |
| Clear all | 18 | 6 |

Fourteen pointer moves cost nothing. Three releases cost three answers.

A selection is 40,000 stars tested against up to four rectangles, then both
histograms rebinned. The slowest one measured was **2.3 ms**, which leaves
plenty of room in a 16 ms frame. Decoding the whole catalogue takes 3 to 5 ms.

The three round trips at load are the summary, the catalogue, and the fit
output answering that it has nothing yet. The last one is a real message, so
the meter counts it rather than quietly hiding it.

## Why the server is still here

It would be easy to send the table and let the browser do everything. The
split this app argues for is different: interaction belongs in the browser,
and a considered computation belongs on the server.

So the fit runs there. It is the kind of thing you want R or numpy for, it
runs once per released brush rather than once per pointer move, and both
languages produce the same coefficients to four decimal places.

The panel beside it shows the browser's count and the server's count next to
each other. When they agree it says so. That is the honest version of the
claim: the two are computing the same selection, and only one of them is
doing it sixty times a second.

## Two things that had to be got right

**The two sides have to agree about a brush edge, exactly.** The server keeps
the catalogue as integers in fixed units, the same integers the browser is
sent, so both divide the same numbers by the same scale. The brush rectangle
is rounded in the browser *before* anything reads it, not on the way out, so
the selection drawn and the selection fitted come from identical edges.

The last piece is that the browser unpacks into `Float64Array`, not
`Float32Array`. At single precision `1919 / 1000` is `1.9190000295639038`,
the comparison against a brush edge goes the other way, and the two counts
differ by one with nothing on screen to explain it. The extra megabyte is
worth it.

**A key that is sometimes null is a key the two servers disagree about.** R
drops a `NULL` out of a list, and `jsonlite` writes `{}` for one that
survives, where Python writes `null`. So when a selection is too small or too
narrow to fit, the `fit` key is left out entirely rather than set to null, in
both languages, and the client checks whether the key is there.

## The data

Synthetic, built from a hash of the star number so all three languages agree
and the repo ships no data file. The physics is real enough to be worth
brushing:

- The main sequence follows a cubic fitted to the standard spectral type
  table, B0V through M5V, with scatter.
- Giants climb to the upper right, with the red clump where helium burning
  stars pile up.
- White dwarfs sit on their own sequence about ten magnitudes below.
- Every star is inside the distance a survey limited near apparent magnitude
  11.5 could see it from, and drawn uniformly through that volume.
- Distant stars are confined to the galactic disc, which is the bright band
  across the middle of the sky panel.

That last pair is what makes the panels worth linking. Brush the white
dwarfs and the median distance is **4.4 parsecs**. Brush a similar number of
main sequence stars and it is **84 parsecs**. Brush the giants and it is
**1.2 kiloparsecs**. A survey sees a bright star much further away than a
faint one, and four linked panels show you that in about two seconds.

## Running it

```bash
npm run build -w linked-brush

shiny run apps/linked-brush/app.py
Rscript -e "shiny::runApp('apps/linked-brush')"
```

## Tests

```bash
npx vitest run apps/linked-brush                              # 38 client
uv run pytest apps/linked-brush                               # 25 Python
Rscript -e "shiny::runTests('apps/linked-brush', assert = TRUE)"  # 102 R
```

The Python and R suites pin the same numbers, including the exact counts and
fit coefficients from the browser run above. Two languages build this
catalogue, and a reader gets whichever one is serving; if they ever stop
agreeing, one of the two suites fails.

The R server tests include one that asserts `fitted` answers nothing at all
until a brush arrives. If that output starts firing on its own, every pointer
move is costing a fit nobody asked for, and the claim on the card is no
longer true.
