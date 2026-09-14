# Supply flow

```
Claim:        States animate into each other instead of flickering.
Plain Shiny:  The output is torn down and rebuilt, so the diagram blinks.
This app:     React keeps the nodes mounted and interpolates. The view is bookmarkable.
```

## What it does

Four stages and fourteen places: suppliers, factories, distribution centres,
markets. Demand is pulled backwards through the network and every stage has a
ceiling, so a disruption does not just shrink one arrow. It reroutes
everything, and some demand may go unmet.

Four scenarios. An ordinary week, Rotterdam closed, German demand up 60%, and
Gdansk at half capacity. Each one runs out somewhere different, which is the
reason there are four rather than one.

| Scenario | Delivered | Short | Runs out at |
| --- | --- | --- | --- |
| Ordinary week | 980k | 0 | nowhere |
| Rotterdam closed | 860k | 120k | the suppliers |
| German demand up 60% | 1,100k | 48k | the factories |
| Gdansk at half capacity | 890k | 90k | the factories |

Rotterdam is already at its ceiling in an ordinary week, which is why closing
it costs more than its own share of the volume.

## The measurement

Picking a scenario costs one round trip. That is the right price: rerouting a
capped network is a real computation and belongs on the server.

What it does not cost is the diagram. Driven in headless Chrome, against both
servers:

| | Diagram rebuilt | Elements kept |
| --- | --- | --- |
| Page load | 1 | 42 stamped |
| Switch to Rotterdam closed | **still 1** | **42 of 42 survived** |
| Focus a node | still 1 | 42 of 42 |
| Switch to Gdansk at half capacity | still 1 | 41 of 45 |

Each element is stamped with a property on the DOM object itself. A property
survives an attribute being rewritten and does not survive the element being
replaced, which is exactly the difference the claim is about. On the third
switch four elements are new, because that scenario uses four routes the
previous one did not: the 41 that existed before all survived.

And the geometry passes through every value in between rather than jumping.
Rotterdam's block, measured while it closes:

```
   110 ms   120.0      (the round trip has not landed yet)
   220 ms    79.3
   330 ms    25.5
   440 ms     7.5
   550 ms     3.7
   660 ms     1.2
   770 ms     0.2
   880 ms     0.0
```

A plain Shiny plot output cannot do that. The diagram is a picture, the new
one replaces the old one, and the blink is where a reader loses track of
which band was which.

## How the halfway is possible

A path is a string, and you cannot halfway a string. So nothing here
interpolates paths.

d3-sankey produces a layout, and the layout is kept as numbers: four per
node, five per ribbon. Two layouts are blended by number, and the path is
regenerated from the result each frame. `motion` drives one value from 0 to 1
with an easing curve, and everything else falls out of that.

Two details that make the transition readable rather than merely continuous:

A ribbon that exists in only one of the two layouts is not dropped. It grows
out of zero width, or narrows into it, at the place it belongs. A route that
closes should be seen closing.

The animation is keyed on the scenario name, not on the flows object. Both
servers answer twice at startup, once before the client has said which
scenario it wants, and a resize produces a new layout for the same data.
Neither is a change worth watching, and counting them would put a number on
the meter before the reader has done anything.

## Bookmarking

Both inputs are bookmarked. The server writes the query string on every
change, so the address bar always describes what is on screen:

```
?_inputs_&scenario="line-down"&focus="gdansk"
```

Opening that link restores both: the scenario is solved and the focused node
is dimmed in, with no extra wiring on the client. shinyreact reads the
restore payload out of the page and seeds the input registry before the first
render, so `useShinyInput` simply starts with the bookmarked value.

Shiny does not write the URL on its own. Something has to call
`session.bookmark()` and then say where to put the answer, which is what the
`on_bookmarked` handler does. Without it, bookmarking is a button someone has
to remember to press.

**This works standalone in both languages and in the Python gallery. It does
not work in the R gallery.** The R gallery is one Shiny app serving many, and
the option a session reads could not be set anywhere that session would see
it. See `docs/deploying.md`, "Bookmarking in the R gallery", for the four
places that were tried and what each one did.

One honest note on the meter: focusing a node shows no new round trip,
because no output depends on it. It does still send an input, and the server
does still write a URL. The meter counts answers, and there is no answer.

## Two things in the model worth knowing

**A ceiling has to be shared.** A supplier feeds several factories. The first
version allocated each factory's needs against a fresh copy of the ceilings,
so every call thought it had the whole supplier and the totals ran well past
capacity. The room each place has left is now carried through the whole
stage. There is a test for it in both languages.

**Demand pulls backwards, then reality pushes forwards.** The backward pass
sizes the downstream arrows from what was wanted and the upstream ones from
what could be had, so a factory that cannot get materials was still shipping
the full amount onward. On a diagram that is volume appearing out of nothing.
A forward pass now scales each stage down to what actually reached it, and
the shortfall travels all the way to the market that goes short. Conservation
is asserted at both pass-through stages.

Markets are served in the order they are listed, so the first has first claim
when a stage is tight. That is a policy rather than a fact, and saying so is
better than pretending the model has not got one.

## Running it

```bash
npm run build -w supply-flow

shiny run apps/supply-flow/app.py
Rscript -e "shiny::runApp('apps/supply-flow')"
```

## Tests

```bash
npx vitest run apps/supply-flow                              # 27 client
uv run pytest apps/supply-flow                               # 19 Python
Rscript -e "shiny::runTests('apps/supply-flow', assert = TRUE)"  # 517 R
```

The transition is verified in a real browser rather than in jsdom, because it
is about DOM elements surviving and animation frames running, and a jsdom has
neither. `docs/local/flow-eval.js` is the script that does it.
