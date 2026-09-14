"""Sensor stream, the Python half. The React client in www/ owns the UI.

The claim is that an update appends one point instead of redrawing a plot,
so the server does not publish a growing series through an output at all. It
pushes one reading per tick with send_message, and the client keeps the
history.
"""

from pathlib import Path

from shiny import Inputs, Outputs, Session, reactive
from shinyreact import ReactApp, reactive_output, send_message

APP_DIR = Path(__file__).parent

from sensor_stream import (  # noqa: E402
    MAX_HZ,
    MIN_HZ,
    channels,
    interval_seconds,
    reading,
)


def server(input: Inputs, output: Outputs, session: Session) -> None:
    # A plain counter, not a reactive value. An effect that both reads and
    # writes a reactive value invalidates itself forever. The history lives
    # on the client anyway, so nothing here needs to be reactive.
    state = {"tick": 0}

    @reactive_output
    def stream_meta():
        """Labels, units and colors. Sent once."""
        return {"channels": channels(), "minHz": MIN_HZ, "maxHz": MAX_HZ}

    @reactive.effect
    async def _stream():
        if not input.running():
            # No invalidate_later here, so the timer stops. The effect wakes
            # again when `running` changes, and not before.
            return

        # Scheduled before the await, so a slow send cannot skip a tick.
        reactive.invalidate_later(interval_seconds(input.rate_hz()))

        state["tick"] += 1
        tick = state["tick"]
        await send_message(
            session,
            "reading",
            {"tick": tick, "values": reading(tick)},
        )


app = ReactApp(server)
