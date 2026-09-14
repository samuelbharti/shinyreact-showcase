# Sensor stream

```
Claim:        Updates at 20Hz append one point instead of redrawing the plot.
Plain Shiny:  invalidateLater re-renders the whole output on every tick.
This app:     send_message pushes a delta. The chart appends and repaints one column.
```

## What it does

Four synthetic instrument channels, streaming live. The server makes one
reading per tick and pushes it to the browser with `send_message`. It never
publishes the series, so nothing re-sends the history and nothing redraws a
plot from scratch.

The browser keeps the history in a fixed size buffer and appends each reading
to four uPlot traces. Pausing stops the reactive timer on the server, so a
paused app sends nothing at all rather than sending into a hidden chart.

The rate slider goes to 30 Hz. The counters show what actually arrived, which
is not always what was asked for.

## The measurement

Taken on a Windows laptop, headless Chrome, both servers.

| | |
| --- | --- |
| Channels | 4 |
| Requested rate | 10 Hz |
| Measured rate | 9 readings per second |
| Messages in 3 seconds | 27 to 28 |
| Wire format per reading | one tick number and four floats |
| Repaints | one per animation frame, however many readings arrived in it |

The counters are on screen and they count messages, not repaints. That
distinction cost a bug: the first version incremented the message counter
inside `requestAnimationFrame`, so it counted frames and read low whenever
the browser throttled animation. The two numbers now agree with each other,
which is the check that matters.

Python and R produced the same trace, the same measured rate and the same
readout values at the same point in the run.

## Why there is no data file

A stream has no history to bundle. The readings are a function of the tick
number and nothing else:

```
value = base + drift * sin(t / p1) + ripple * sin(t / p2) + noise * jitter(t)
```

`jitter` is the fractional part of a large sine, which is the shader trick for
repeatable noise. It gives the same answer in R and in Python, which
`set.seed()` and `np.random` never would. That is what lets both servers draw
the same trace, and it is why the tests can pin exact numbers.

## Run it

```powershell
# Python
shiny run apps/sensor-stream/app.py

# R
Rscript --% -e "shiny::runApp('apps/sensor-stream', port = 3838)"
```

## Tests

```powershell
npx vitest run apps/sensor-stream                                     # 9 client
.venv/Scripts/python -m pytest apps/sensor-stream                     # 10 Python
Rscript --% -e "shiny::runTests('apps/sensor-stream', assert = TRUE)"  # 758 R
```

The push itself is not covered by `testServer()`, because a message sent with
`send_message` does not go through an output. That half is checked in a
browser, and the numbers above are what it reported.
