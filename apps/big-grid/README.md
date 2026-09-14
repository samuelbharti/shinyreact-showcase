# Big grid

```
Claim:        All million rows scrollable, with filter and sort in the browser.
Plain Shiny:  DT sends one page per interaction, and you cannot scroll past it without another round trip.
This app:     Columnar typed arrays, about twenty rows in the page, and a scrollbar that covers the whole table.
```

## What it does

A million order rows. Filter by region, status and amount, sort by any
column, and scroll the whole thing. About twenty rows are in the page at any
moment.

There is a toggle. **In the browser** does the work locally. **On the server**
sends the same query over the wire and waits, which is what a server backed
grid does on every interaction. Both paths are wired to the same controls and
the same data, so the comparison is between two ways of answering one
question rather than between two different tables.

## The measurement

Driven in headless Chrome, both servers, same results.

| | In the browser | On the server |
| --- | --- | --- |
| Filter, no sort | 5 to 8 ms | round trip |
| Sort a million rows by amount | 215 to 222 ms | 196 to 206 ms |
| Rows you can scroll | 1,000,000 | 50 |
| Rows in the page | 27 | 50 |
| Building the table in the browser | 171 to 208 ms, once | not applicable |

**The honest part: on this machine the server is not slower.** Both processes
are on localhost, numpy and R both sort a million rows quickly, and the round
trip lands within about ten percent of the browser sort. Over a real network
it would not, but that is a claim about somebody else's latency and this app
does not get to make it.

What the server path cannot do is the row that matters: it hands you fifty
rows. Scrolling past them is another request, and another, and another. The
browser path hands you the scrollbar for all million.

So the claim here is about what you can reach, not about milliseconds.

## The million rows are not sent

They are generated, from a hash of the row number, in all three of
JavaScript, Python and R. The spec that describes them is 350 bytes. The
same table as a file would be about thirteen megabytes, and as a payload it
would be worse.

That only works if the three agree exactly, so all three test suites pin the
same values:

- `hashUnit(0, 1)` is `0.08570585407142062`
- row 0 is North, Training, shipped, 38 units, 194 pence
- sorted by amount descending, the top three ids are 287,216, 60,385 and
  836,118
- the whole table sums to 9,942,166,186 pence across 60,831,301 units

Three implementations, one table. If any of them drifts, the grid still works
perfectly and shows a different million rows than the server would page out,
which makes the comparison meaningless rather than broken. That is why the
pins exist.

## Three things that had to be right

**Round half to even.** `Math.round` rounds a half up; numpy's `rint` and R's
`round` round to even. One row in a million landing exactly on a half would
differ between the browser and both servers.

**Whole number powers.** The skews that shape the distributions started as
`x^0.7` and `x^2.6`. A fractional exponent costs R about 190 ms per column on
a million rows, which was most of a second of startup for three of them. A
square and a cube give the same shape for nothing.

**Sums wider than an integer.** The totals pass two billion pence. In R that
overflows a 32 bit integer to `NA` with only a warning, and the grid shows a
blank where the money goes. There is a test for it.

## Run it

```powershell
# Python
shiny run apps/big-grid/app.py

# R
Rscript --% -e "shiny::runApp('apps/big-grid', port = 3838)"
```

The R server takes about 450 ms to build its million rows at startup, against
40 ms for numpy. R is single threaded, so in the gallery that blocks every
other session once, on the first visit to this app.

## Tests

```powershell
npx vitest run apps/big-grid                                     # 23 client
.venv/Scripts/python -m pytest apps/big-grid                     # 21 Python
Rscript --% -e "shiny::runTests('apps/big-grid', assert = TRUE)"  # 57 R
```

One R server test asserts that with no query the server answers nothing at
all. In browser mode it has to be idle, or both paths are running and the
comparison stops meaning anything.
