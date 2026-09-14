"""The Python gallery: one landing page, and every app mounted under it.

Each app is a real, independent shiny.App with its own session table, its own
input and output namespace and its own dependency router. One app throwing
takes down one session, not the process.
"""

from __future__ import annotations

import json
from pathlib import Path

from htmltools import Tag, tags
from shiny import Inputs, Outputs, Session
from shinyreact import ReactApp, page_react
from starlette.requests import Request
from starlette.responses import RedirectResponse
from starlette.routing import Mount, Route

from .loader import LazyApp
from .registry import Entry, read_catalog, read_registry


def build_gallery_app(root: Path) -> ReactApp:
    """The object Connect Cloud runs, and `shiny run app.py` serves."""
    registry = read_registry(root, language="py")
    catalog = read_catalog(root)
    other_base = (catalog.get("site") or {}).get("r_url", "") or ""

    app = ReactApp(_gallery_server, ui=_gallery_ui(root, registry, other_base))

    routes: list[Route | Mount] = []
    for entry in registry.values():
        # Without this, /app/<slug> with no trailing slash returns 404 rather
        # than redirecting. Shiny's own routes end in Mount("/", ...) which
        # matches everything, so Starlette's redirect_slashes fallback never
        # gets a turn. Verified against py-shiny 1.8.
        routes.append(Route(f"/app/{entry.slug}", _redirect_to_slash, methods=["GET"]))
        routes.append(Mount(f"/app/{entry.slug}", app=LazyApp(entry)))

    # A slug nobody knows lands on the gallery rather than in Shiny's static
    # file handler, which would 404 with nothing to explain it.
    routes.append(Route("/app/{rest:path}", _redirect_to_gallery, methods=["GET"]))

    # In front of Shiny's own routes, for the same catch-all reason.
    app.starlette_app.router.routes[0:0] = routes
    return app


async def _redirect_to_slash(request: Request) -> RedirectResponse:
    query = request.url.query
    target = request.url.path + "/" + (f"?{query}" if query else "")
    return RedirectResponse(target, status_code=307)


async def _redirect_to_gallery(_request: Request) -> RedirectResponse:
    return RedirectResponse("/", status_code=307)


def _gallery_server(input: Inputs, output: Outputs, session: Session) -> None:
    """The landing page needs no server.

    The catalog is inlined into the page, so the cards paint on the first
    frame rather than after the websocket opens. App requires a server
    function, so here is one.
    """


def _gallery_ui(root: Path, registry: dict[str, Entry], other_base: str):
    cards = [
        entry.as_card(
            href=f"app/{entry.slug}/",
            other=f"{other_base}/?app={entry.slug}" if other_base else "",
        )
        for entry in registry.values()
    ]

    def ui(_request: Request) -> Tag:
        return page_react(
            _catalog_tag(cards),
            src_dir=root / "gallery" / "www",
            title="Shiny React showcase",
        )

    return ui


def _catalog_tag(cards: list[dict]) -> Tag:
    """The catalog, inlined as JSON for the client to read synchronously."""
    blob = json.dumps({"language": "Python", "apps": cards}, separators=(",", ":"))
    # A literal </ would end the script block early. htmltools escapes its own
    # dependency manifest the same way.
    return tags.script(
        blob.replace("</", "<\\/"),
        type="application/json",
        id="shinyreact-catalog",
    )
