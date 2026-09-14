"""Reading catalog.yml, which is the only list of apps in this repo.

Both galleries read the same file at runtime. Nothing here keeps a second
list, because a second list is a list that goes stale.
"""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

import yaml


@dataclass(frozen=True)
class Entry:
    """One app the gallery can serve."""

    slug: str
    title: str
    blurb: str
    claim: str
    plain_shiny: str
    this_app: str
    domain: str
    group: str
    library: str
    features: list[str]
    compare: bool
    directory: Path

    @property
    def module_id(self) -> str:
        """A Python identifier built from the slug, for sys.modules."""
        return self.slug.replace("-", "_")

    def as_card(self, href: str, other: str = "") -> dict:
        """What the landing page needs to draw one card."""
        return {
            "slug": self.slug,
            "title": self.title,
            "blurb": self.blurb,
            "claim": self.claim,
            "plainShiny": self.plain_shiny,
            "thisApp": self.this_app,
            "domain": self.domain,
            "group": self.group,
            "library": self.library,
            "features": self.features,
            "compare": self.compare,
            "href": href,
            "other": other,
        }


def read_catalog(root: Path) -> dict:
    """Parse catalog.yml."""
    with (root / "catalog.yml").open(encoding="utf-8") as handle:
        return yaml.safe_load(handle) or {}


def read_registry(root: Path, language: str) -> dict[str, Entry]:
    """Every app this gallery can actually serve, in catalog order.

    An app is skipped when it is not meant for the gallery, when it has no
    server in this language, or when its directory does not hold one yet.
    That last case is what lets catalog.yml list all fifteen apps from the
    start without the gallery failing on the fourteen not written yet.
    """
    catalog = read_catalog(root)
    entry_point = {"py": "app.py", "r": "app.R"}[language]

    registry: dict[str, Entry] = {}
    for app in catalog.get("apps", []):
        slug = app["slug"]
        directory = root / "apps" / slug

        if app.get("deploy") != "gallery":
            continue
        if language not in app.get("languages", []):
            continue
        if not (directory / entry_point).exists():
            continue

        registry[slug] = Entry(
            slug=slug,
            title=app.get("title", slug),
            blurb=app.get("blurb", ""),
            claim=app.get("claim", ""),
            plain_shiny=app.get("plain_shiny", ""),
            this_app=app.get("this_app", ""),
            domain=app.get("domain", ""),
            group=app.get("group", ""),
            library=app.get("library", ""),
            features=list(app.get("features", [])),
            compare=bool(app.get("compare", False)),
            directory=directory,
        )

    _refuse_colliding_modules(registry)
    return registry


def read_groups(root: Path) -> list[dict]:
    """The card families, in the order the landing page draws them.

    Read from catalog.yml like everything else. A group the client does not
    know about would leave its apps unreachable, so the list travels with the
    cards rather than being repeated in the bundle.
    """
    catalog = read_catalog(root)
    return [
        {
            "id": group.get("id", ""),
            "title": group.get("title", ""),
            "note": group.get("note", ""),
            "colour": group.get("colour", "#5c6370"),
        }
        for group in catalog.get("groups", [])
    ]


def read_analytics(root: Path) -> str:
    """The analytics endpoint, or "" when there is none.

    Read on its own rather than through read_site(), because this one never
    reaches the browser as data. It becomes a script tag on the server and the
    client has no use for the string.
    """
    return (read_catalog(root).get("site") or {}).get("analytics", "") or ""


def read_site(root: Path) -> dict:
    """Who made this and where it lives, for the footer."""
    site = read_catalog(root).get("site") or {}
    return {
        "title": site.get("title", "shinyreact showcase"),
        "author": site.get("author", ""),
        "authorUrl": site.get("author_url", ""),
        "repoUrl": site.get("repo_url", ""),
        "license": site.get("license", ""),
        "links": [
            {
                "label": link.get("label", ""),
                "url": link.get("url", ""),
                "hero": bool(link.get("hero", False)),
            }
            for link in site.get("links") or []
            if link.get("url")
        ],
    }


def _refuse_colliding_modules(registry: dict[str, Entry]) -> None:
    """Fail at startup when two apps ship a helper module with the same name.

    Every app is loaded into one process and one sys.modules, and a sibling
    helper is imported under its bare name. Two apps with a `logic.py` would
    silently share whichever loaded first, and the second app would return
    the first app's numbers with no error anywhere.

    Naming each helper after its slug avoids this. This check is here because
    the failure it prevents is invisible.
    """
    seen: dict[str, str] = {}
    for entry in registry.values():
        for module in sorted(entry.directory.glob("*.py")):
            if module.name == "app.py":
                continue
            owner = seen.get(module.name)
            if owner is not None:
                raise RuntimeError(
                    f"Two apps ship a module called {module.name}: "
                    f"apps/{owner} and apps/{entry.slug}. Every app is loaded "
                    "into one process, so these would collide silently. Name "
                    "each helper after its own slug."
                )
            seen[module.name] = entry.slug
