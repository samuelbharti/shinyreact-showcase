"""The gallery registry and routing.

What the gallery does, in plain English:

  It reads catalog.yml, keeps the apps marked for the gallery that have a
  server in this language and a directory on disk, and serves each one at its
  own URL. It builds an app the first time somebody asks for that URL, and
  never before, so fifteen apps do not all load at startup. The landing page
  carries the catalog inside the document, so the cards are there on the
  first frame.
"""

import json
import re
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "gallery"))

from pygallery.registry import (  # noqa: E402
    read_catalog,
    read_groups,
    read_registry,
    read_site,
)
from pygallery.router import build_gallery_app  # noqa: E402


@pytest.fixture(scope="module")
def app():
    return build_gallery_app(ROOT)


@pytest.fixture(scope="module")
def client(app):
    from starlette.testclient import TestClient

    with TestClient(app) as test_client:
        yield test_client


def test_the_registry_only_holds_apps_that_exist_on_disk():
    registry = read_registry(ROOT, language="py")

    assert registry, "expected at least one built app"
    for slug, entry in registry.items():
        assert (entry.directory / "app.py").exists(), slug


def test_an_app_with_no_r_server_is_left_out_of_the_r_registry(tmp_path):
    _write_catalog(
        tmp_path,
        [
            {"slug": "both", "languages": ["py", "r"], "deploy": "gallery"},
            {"slug": "python-only", "languages": ["py"], "deploy": "gallery"},
        ],
    )

    assert set(read_registry(tmp_path, "py")) == {"both", "python-only"}
    assert set(read_registry(tmp_path, "r")) == {"both"}


def test_an_app_marked_local_never_reaches_the_gallery(tmp_path):
    _write_catalog(
        tmp_path,
        [
            {"slug": "shown", "languages": ["py"], "deploy": "gallery"},
            {"slug": "hidden", "languages": ["py"], "deploy": "local"},
        ],
    )

    assert set(read_registry(tmp_path, "py")) == {"shown"}


def test_two_apps_sharing_a_helper_module_name_are_refused_at_startup(tmp_path):
    # Every app is loaded into one process and one sys.modules. Two apps with
    # a logic.py would silently share whichever loaded first, and the second
    # app would return the first one's numbers with no error anywhere. This
    # is the check that turns an invisible bug into a startup failure.
    _write_catalog(
        tmp_path,
        [
            {"slug": "first", "languages": ["py"], "deploy": "gallery"},
            {"slug": "second", "languages": ["py"], "deploy": "gallery"},
        ],
    )
    for slug in ("first", "second"):
        (tmp_path / "apps" / slug / "logic.py").write_text("x = 1", encoding="utf-8")

    with pytest.raises(RuntimeError, match=r"logic.py"):
        read_registry(tmp_path, "py")


def test_the_landing_page_carries_the_catalog_in_the_document(client):
    body = client.get("/").text

    assert 'id="shinyreact-catalog"' in body
    catalog = _catalog_from(body)
    assert catalog["language"] == "Python"
    assert catalog["apps"], "no apps in the inlined catalog"


def test_every_card_has_the_three_claim_fields(client):
    for card in _catalog_from(client.get("/").text)["apps"]:
        assert card["claim"], card["slug"]
        assert card["plainShiny"], card["slug"]
        assert card["thisApp"], card["slug"]


def test_card_links_point_at_the_mount_for_this_gallery(client):
    for card in _catalog_from(client.get("/").text)["apps"]:
        assert card["href"] == f"app/{card['slug']}/"


def test_an_app_url_is_served(client):
    assert client.get("/app/cell-atlas/").status_code == 200


def test_an_app_url_without_a_trailing_slash_redirects_rather_than_404s(client):
    # Shiny's own routes end in a catch-all mount, so Starlette's
    # redirect_slashes fallback never runs and this would 404 without an
    # explicit route. Verified against py-shiny 1.8.
    response = client.get("/app/cell-atlas", follow_redirects=False)

    assert response.status_code == 307
    assert response.headers["location"].endswith("/app/cell-atlas/")


def test_an_unknown_slug_lands_on_the_gallery_not_an_error(client):
    response = client.get("/app/does-not-exist", follow_redirects=False)

    assert response.status_code == 307
    assert response.headers["location"] == "/"


def test_the_entry_point_is_a_real_shiny_app(app):
    # Connect Cloud runs this object. It has to be a Shiny app, not an ASGI
    # app that happens to contain one.
    from shiny import App

    assert isinstance(app, App)


def test_building_the_gallery_imports_no_app():
    # Fifteen apps importing numpy and reading their data at startup is how a
    # deployment walks into the Connect Cloud startup timeout.
    loaded_before = {name for name in sys.modules if name.startswith("showcase_")}
    build_gallery_app(ROOT)
    loaded_after = {name for name in sys.modules if name.startswith("showcase_")}

    assert loaded_after == loaded_before


def test_the_python_and_r_galleries_agree_on_the_card_shape(client):
    # The one place the two deployments can silently diverge. The fixture is
    # regenerated by hand when the shape changes on purpose, and both
    # languages are checked against it.
    expected = json.loads(
        (Path(__file__).parent / "fixtures" / "card-keys.json").read_text(
            encoding="utf-8"
        )
    )
    card = _catalog_from(client.get("/").text)["apps"][0]

    assert sorted(card.keys()) == sorted(expected["keys"])


def _catalog_from(body: str) -> dict:
    start = body.index('id="shinyreact-catalog">') + len('id="shinyreact-catalog">')
    end = body.index("</script>", start)
    return json.loads(body[start:end].replace("<\\/", "</"))


def _write_catalog(root: Path, apps: list[dict]) -> None:
    """A throwaway catalog plus the app directories it names."""
    lines = ["site:", '  py_url: ""', '  r_url: ""', "apps:"]
    for app in apps:
        languages = ", ".join(app["languages"])
        lines += [
            f"  - slug: {app['slug']}",
            f"    title: {app['slug']}",
            f"    deploy: {app['deploy']}",
            f"    languages: [{languages}]",
        ]
        directory = root / "apps" / app["slug"]
        directory.mkdir(parents=True, exist_ok=True)
        for language in app["languages"]:
            (directory / {"py": "app.py", "r": "app.R"}[language]).write_text(
                "", encoding="utf-8"
            )
    (root / "catalog.yml").write_text("\n".join(lines) + "\n", encoding="utf-8")


def test_every_app_names_a_group_the_landing_page_knows():
    """The landing page draws cards under group headings and nothing else.

    An app whose group is a typo would be sorted into a family that does not
    exist, and the client would have to invent a home for it. catalog.yml is
    hand edited, so this is worth an assertion rather than a convention.
    """
    root = Path(__file__).resolve().parents[2]
    known = {group["id"] for group in read_groups(root)}
    assert known, "catalog.yml lists no groups"

    catalog = read_catalog(root)
    for app in catalog["apps"]:
        assert app.get("group") in known, (app["slug"], app.get("group"))


def test_life_sciences_is_the_first_group():
    """Biology leads the page. It is the first thing a reader sees, and it is
    where the largest payloads and the heaviest plots are."""
    root = Path(__file__).resolve().parents[2]
    assert read_groups(root)[0]["id"] == "life-sciences"


def test_every_group_has_a_colour_the_client_can_use():
    root = Path(__file__).resolve().parents[2]
    for group in read_groups(root):
        assert group["title"]
        assert re.fullmatch(r"#[0-9a-fA-F]{6}", group["colour"]), group


def test_the_footer_knows_who_made_this():
    """The client hard codes no name or link. Both come from catalog.yml."""
    root = Path(__file__).resolve().parents[2]
    site = read_site(root)
    assert site["author"]
    assert site["repoUrl"].startswith("https://")
    assert site["license"]


def test_the_landing_page_carries_the_groups_and_the_footer(client):
    payload = _catalog_from(client.get("/").text)

    assert payload["groups"][0]["id"] == "life-sciences"
    assert payload["site"]["author"]
    # Every card's group is one the page was also given.
    known = {group["id"] for group in payload["groups"]}
    for card in payload["apps"]:
        assert card["group"] in known
