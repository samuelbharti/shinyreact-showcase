"""Pure computation for APP_TITLE. No Shiny, no I/O beyond reading its data.

Everything here is importable and testable on its own. Logic that sits inside
app.py cannot be reached by a test at all, which is why it lives here.
"""

from __future__ import annotations

import csv
from pathlib import Path


def load_values(path: Path) -> list[float]:
    """Read the bundled data file into a plain list of numbers."""
    with path.open(newline="", encoding="utf-8") as fh:
        return [float(row["value"]) for row in csv.DictReader(fh)]


def histogram(values: list[float], bins: int) -> dict[str, list[float]]:
    """Bin `values` into `bins` equal width buckets.

    Returns the bucket edges and the count in each, which is what the client
    needs to draw bars. A value equal to the maximum lands in the last bucket
    rather than falling off the end.
    """
    if bins < 1:
        raise ValueError("bins must be at least 1")
    if not values:
        return {"breaks": [], "counts": []}

    low, high = min(values), max(values)
    if low == high:
        # One distinct value. An equal width split has no meaning, so report a
        # single bucket holding everything.
        return {"breaks": [low, high], "counts": [float(len(values))]}

    width = (high - low) / bins
    breaks = [low + i * width for i in range(bins + 1)]
    counts = [0.0] * bins
    for value in values:
        index = int((value - low) / width)
        counts[min(index, bins - 1)] += 1
    return {"breaks": breaks, "counts": counts}
