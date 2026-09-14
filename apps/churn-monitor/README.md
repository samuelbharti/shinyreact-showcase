# Churn monitor

```
Claim:        Move the decision threshold and every metric updates with no round trip.
Plain Shiny:  Each slider step recomputes the confusion matrix and redraws four plots.
This app:     The server sends scores and labels once. Thresholding is arithmetic here.
```

## What it does

Fifty thousand customers, each with a predicted probability of leaving and
the label saying whether they did. The server sends all of it once, about
200 kB.

Three sliders. **Flag a customer at** is the decision threshold. **A customer
lost costs** and **A retention offer costs** are the two prices that decide
which threshold is actually the right one. Move any of them and the confusion
matrix, the six metrics, the operating point on the ROC, and the whole cost
curve all follow the pointer.

There is a toggle. **Also draw it on the server** turns on a second view: the
same four panels, rendered as a PNG by matplotlib or by R's own graphics and
delivered through `ImageOutput`. That is what a plain Shiny app shows, and
every step of every slider asks for another one.

## The measurement

Driven in headless Chrome, both servers.

| | Recomputed here | Server round trips |
| --- | --- | --- |
| Page load | 1 | 3 |
| Ten steps of the threshold slider | 11 | **3**, unchanged |
| Six steps of the miss cost slider | 18 | **3**, unchanged |
| Five steps of the offer cost slider | 23 | **3**, unchanged |
| Turning the comparison on | 23 | 4 |
| Four more steps of the threshold | 27 | **8** |

Twenty one slider steps cost nothing. Four more, with the server drawing,
cost exactly four.

The R server reads one higher throughout, four at load rather than three,
because the two Shiny implementations differ in how often they answer an
image output that has nothing to draw. The shape is identical: zero while the
comparison is off, one per step while it is on.

## Why it is this fast

Not because the browser is clever. Because the work is small, and it was
always small.

The scores are turned into a cumulative count once, when the payload arrives:
for every point on the score grid, how many churners and how many stayers sit
at or above it. That takes 3 to 7 ms and it happens once.

After that a confusion matrix is **two array reads**. Precision, recall, F1,
accuracy and the expected cost are arithmetic on four integers. The cost
sweep across every threshold is 101 multiplications. The ROC, the precision
recall curves and the histogram never move at all, because none of them
depend on the threshold: only the markers on them do.

The slowest recompute measured was **under 100 microseconds**, which is the
resolution of `performance.now()` in Chrome. The meter says "under 100 us"
rather than printing 100, because 100 is the clock, not the measurement.

That is the real argument. A round trip costs tens of milliseconds of network
and a re-render at the other end. The thing it is fetching takes less time
than the clock can see.

## What the cost sliders are for

Precision and recall do not tell you where to put a threshold. Prices do.

At the default prices, losing a customer costs £220 and a retention offer
costs £25, so the cheapest threshold is **12%**: flag generously, because a
wasted offer is cheap compared to a lost customer.

Raise the cost of a lost customer to £600 and the cheapest threshold falls to
**4%**. Raise the cost of an offer to £120 instead and it climbs to **42%**.

The dashed green line on the cost panel is that answer, and it moves while
you drag. That is the number a team would actually argue about, and it is the
one that would be least tolerable to wait for.

## The model

Synthetic, built from a hash of the customer number so all three languages
agree and the repo ships no data file. Two overlapping populations in logit
space, giving an area under the ROC of **0.814** and a base rate of
**17.9%**, 8,934 of 50,000.

The overlap is deliberate. Push the two populations apart and the ROC hugs
the corner, every threshold looks fine, and there is nothing left to decide.
A real churn model does not separate cleanly, and an app about choosing a
threshold should not pretend otherwise. There is a test asserting the area
stays between 0.78 and 0.87.

## Three things that had to be got right

**The threshold is an integer, on both sides.** Scores live on a 0 to 10,000
grid and the slider steps by 100. There is no float anywhere for the browser
and the server to disagree about, so a customer is flagged here exactly when
they are flagged there, and the compare image always matches the numbers
beside it.

**Neither language uses its own histogram function.** `np.histogram` and R's
`hist` disagree about which side of a bin edge is closed, so both do the
binning by arithmetic instead. The first eight bars are pinned in both test
suites.

**`ImageOutput` renders as the image, not around it.** The class lands on the
`<img>` itself, so there is no child to style, and it must be given a height.
With none it measures zero, the server is asked for a plot zero pixels tall,
and what comes back is a 24 pixel sliver. That happened, and it is why
`.shot` carries an explicit `height`.

## Running it

```bash
npm run build -w churn-monitor

shiny run apps/churn-monitor/app.py
Rscript -e "shiny::runApp('apps/churn-monitor')"
```

## Tests

```bash
npx vitest run apps/churn-monitor                              # 34 client
uv run pytest apps/churn-monitor                               # 23 Python
Rscript -e "shiny::runTests('apps/churn-monitor', assert = TRUE)"  # 100 R
```

The client suite works on ten customers on a hundred point grid, so every
expected value in it can be checked on paper. That is deliberate: the claim
is that this arithmetic is trivial, and arithmetic that needs a fixture to
verify is not trivial.

The Python and R suites pin the same counts and metrics, because two
languages score these customers and a reader gets whichever one is serving.

The R server suite has the test that guards the claim: with the comparison
off, moving the threshold through four values must not change the picture the
server produced. `renderPlot` hands back an empty device rather than nothing,
so asking whether the picture changed is the only honest way to ask whether
the server drew anything.
