"""Building an app's Shiny app the first time somebody asks for its URL.

Fifteen apps importing numpy, and reading their data, at startup is how a
deployment walks into the Connect Cloud startup timeout. Nothing here runs
until a request arrives for that app's mount, and then it runs once.
"""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path
from types import ModuleType
from typing import TYPE_CHECKING

import anyio
import anyio.to_thread
from htmltools import tags
from shiny import App
from shinyreact import ReactApp, page_react
from starlette.types import Receive, Scope, Send

if TYPE_CHECKING:
    from .registry import Entry


class LazyApp:
    """An ASGI app that becomes `apps/<slug>` on first use."""

    def __init__(self, entry: Entry) -> None:
        self._entry = entry
        self._app: App | None = None
        self._lock = anyio.Lock()

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if self._app is None:
            async with self._lock:
                # Checked again inside the lock: two requests can both find
                # None before either takes it.
                if self._app is None:
                    # In a worker thread. Importing numpy and reading a data
                    # file is seconds of blocking CPU, and on the event loop
                    # that stalls every other app's websocket, including the
                    # gallery page itself.
                    self._app = await anyio.to_thread.run_sync(self._build)

        await self._app(scope, receive, send)

    def _build(self) -> App:
        directory = self._entry.directory

        # What `shiny run` does through uvicorn's app_dir, so that
        # `from cell_atlas import ...` inside app.py resolves exactly as it
        # does when the app runs on its own.
        sys.path.insert(0, str(directory))
        try:
            module = _import_module(
                f"showcase_{self._entry.module_id}", directory / "app.py"
            )
        finally:
            sys.path.remove(str(directory))

        server = getattr(module, "server", None)
        if not callable(server):
            raise RuntimeError(
                f"apps/{self._entry.slug}/app.py defines no `server` function. "
                "The gallery composes `server` with a page of its own. See "
                "CONTRIBUTING.md, 'The contract every app follows'."
            )

        # Built here rather than reusing module.app, so the gallery can add
        # the back link and pin src_dir to an absolute path. The app's own
        # ReactApp() call is for running it standalone.
        return ReactApp(
            server,
            ui=lambda _request: page_react(
                _back_link(),
                _back_link_style(),
                src_dir=directory / "www",
                title=self._entry.title,
            ),
        )


def _import_module(name: str, path: Path) -> ModuleType:
    spec = importlib.util.spec_from_file_location(name, path)
    if spec is None or spec.loader is None:
        raise ImportError(f"Cannot load {path}")
    module = importlib.util.module_from_spec(spec)
    # Registered before execution, because dataclasses and pickle look
    # themselves up by module name while the module is still running.
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


def _back_link():
    # Relative, because the app is mounted at /app/<slug>/ and the gallery is
    # two levels up. An absolute /  would break behind a proxy that serves
    # the content under a path of its own.
    return tags.a(
        "Back to the gallery",
        href="../../",
        class_="gallery-back",
    )


def _back_link_style():
    # Inline rather than in fifteen client bundles. The same www/ui.js serves
    # the app standalone, where there is no gallery to go back to, so this
    # belongs to the gallery and not to the app.
    return tags.style("""
      .gallery-back {
        position: fixed;
        left: 12px;
        bottom: 12px;
        z-index: 1000;
        padding: 6px 12px;
        border-radius: 999px;
        border: 1px solid rgba(0, 0, 0, 0.12);
        background: rgba(255, 255, 255, 0.92);
        color: #16181d;
        font: 13px system-ui, -apple-system, "Segoe UI", sans-serif;
        text-decoration: none;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
      }
      .gallery-back:hover {
        border-color: rgba(0, 0, 0, 0.28);
      }
    """)
