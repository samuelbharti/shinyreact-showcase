# How to write and test a claim

Every app here makes one claim. This page says what a claim is, how to pick a
good one, and how to prove it.

## What a claim is

A claim is a sentence about something the app does that plain Shiny does badly
or cannot do. It comes with two supporting lines:

```
Claim:        500,000 cells stay interactive, with lasso select.
Plain Shiny:  A server rendered PNG, or a plotly figure that stalls past 10,000 points.
This app:     One payload, a WebGL scatter, selection handled on the client.
```

The first line is what a visitor reads. The second is why they care. The third
is what a developer copies.

## The gap this gallery is about

Plain Shiny is good software. It falls down in a small number of places, and
those places are the subject of this repo. A useful claim sits in one of them.

1. Scale of drawing. Server rendered images do not zoom. Plotly stalls in the
   tens of thousands of points. A GPU handles a million.
2. Round trip latency. In plain Shiny, a hover, a zoom and a brush all travel
   to the server and back. In React they are local state.
3. Where computation happens. Send the data once and let the browser filter,
   bin and threshold it. A slider then costs nothing.
4. Libraries with no Shiny binding. Using a JavaScript library from R normally
   means writing and shipping an htmlwidget package. Here it is `npm install`.
5. Interaction that needs real state. Drag and drop, undo, optimistic updates
   and multi step forms need client state to feel right.
6. Update shape. Appending one point to a chart is not the same as redrawing
   the chart, and plain Shiny only does the second.

If your app is not in one of these six, say so in the pull request. The list is
not closed, but a new entry needs an argument.

## A claim needs a number

"Faster" is not a claim. These are claims:

- 60 frames per second while panning 500,000 points, measured in the Chrome
  performance panel with a 6x CPU slowdown.
- Zero websocket messages during pan and zoom, counted in the network panel.
- 1,000,000 rows sorted in under 50 milliseconds, timed with
  `performance.now()` around the sort.

Write the number and the method in the README of the app. A reader who repeats
your measurement and gets something else has found a bug, and that is only
possible when you said how you measured.

## Compare toggles

Four apps render the plain Shiny version beside the React one, with a counter
on both: `cell-atlas`, `market-candles`, `big-grid` and `churn-monitor`.

Use a Compare toggle when the difference is measurable. Do not use one when the
difference is a matter of taste, because a side by side that shows nothing
weakens the whole gallery.

Rules for a Compare toggle:

1. Both sides use the same data and the same server.
2. The plain Shiny side is written the way somebody would really write it. A
   deliberately bad version proves nothing.
3. The counter measures one thing, and the label says what it is.

## Claims that were rejected

Keep this list growing. It saves the next person the same argument.

- "React is faster." Too vague, and often false. Shiny is fast at what it does.
- "Nicer looking charts." Taste, not capability. Plain Shiny can load a theme.
- "Better code organization." A real opinion, but not something an app can
  demonstrate on one screen.
