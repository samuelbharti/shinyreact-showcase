import { type CSSProperties } from "react";

import { assetUrl, byGroup, readCatalog, type Entry, type Group } from "@/catalog";

// Read once at module load. The catalog is inlined in the document and never
// changes while the page is open, so there is nothing to subscribe to.
const CATALOG = readCatalog();

/**
 * Props that send a link away from this page, when it goes away from it.
 *
 * Decided from the href rather than from a list of which links are which, so
 * anything added to the site block in catalog.yml gets it without anyone
 * remembering to. An app link is relative and stays in the tab; anything with
 * a scheme, or a protocol relative //, is somewhere else.
 *
 * rel is not decoration. Without noopener, the page being opened gets a
 * handle on this one through window.opener and can navigate it somewhere
 * else, which is a real way to lose someone.
 */
function away(href: string) {
  const leaves = /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//");
  return leaves ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

export default function App() {
  const sections = byGroup(CATALOG.apps, CATALOG.groups);
  const compared = CATALOG.apps.filter((entry) => entry.compare).length;
  const { links } = CATALOG.site;

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-inner">
          <p className="eyebrow">The ui.tsx pattern</p>
          <h1>{CATALOG.site.title}</h1>
          <p className="hero-text">
            Shiny apps where React draws the screen and Shiny does the data
            work. Each one takes a single thing plain Shiny handles badly and
            puts the measurement beside it: round trips not made, points drawn,
            milliseconds spent. {spellOut(compared)} of them run both paths on
            the same page, with a counter on each, so the comparison is
            something you watch rather than something you are told.
          </p>
          <p className="hero-text">
            The same TSX bundle is served by a Python server and an R one, and
            nothing in the browser knows which it is talking to.
          </p>

          <div className="hero-links">
            {links
              .filter((link) => link.hero)
              .map((link) => (
                <a key={link.url} href={link.url} {...away(link.url)}>
                  {link.label}
                </a>
              ))}
          </div>
        </div>
      </header>

      <main className="body">
        {CATALOG.apps.length === 0 ? (
          <p className="empty">
            No apps are built yet. Run <code>node tools/new-app.mjs</code> to add
            one.
          </p>
        ) : (
          sections.map((section) => (
            <Section key={section.group.id} group={section.group} apps={section.apps} />
          ))
        )}
      </main>

      <Footer />
    </div>
  );
}

function Section({ group, apps }: { group: Group; apps: Entry[] }) {
  // The accent travels as a custom property, so nothing underneath repeats the
  // colour and a group can be recoloured in catalog.yml alone.
  const accent = { "--accent": group.colour } as CSSProperties;

  return (
    <section className="group" data-group={group.id} style={accent}>
      <div className="group-head">
        <h2>{group.title}</h2>
        {group.note ? <p>{group.note}</p> : null}
      </div>

      <div className="grid">
        {apps.map((entry) => (
          <Card key={entry.slug} entry={entry} />
        ))}
      </div>
    </section>
  );
}

function Card({ entry }: { entry: Entry }) {
  return (
    <article className="card" data-slug={entry.slug}>
      <a className="shot" href={entry.href} tabIndex={-1} aria-hidden="true">
        {/* A real screenshot of the app, captured from a running server. It
            is the only honest thumbnail: a reader sees what they are about
            to open rather than an icon standing in for it. */}
        <img src={assetUrl(`thumbs/${entry.slug}.jpg`)} alt="" loading="lazy" width={720} height={450} />
      </a>

      <h3>
        <a href={entry.href}>{entry.title}</a>
      </h3>

      <p className="by">
        {entry.domain}
        <span className="dot">·</span>
        <span className="lib">{entry.library}</span>
      </p>

      <p className="blurb">{entry.blurb}</p>

      <p className="compare">
        <span className="mark">Instead of</span> {entry.plainShiny}
      </p>

      <p className="actions">
        <a className="open" href={entry.href}>
          Open app
        </a>
        {entry.compare ? <span className="tag">Runs both paths</span> : null}
        {entry.other ? (
          <a className="other" href={entry.other} {...away(entry.other)}>
            {CATALOG.language === "Python" ? "R version" : "Python version"}
          </a>
        ) : null}
      </p>
    </article>
  );
}

function Footer() {
  const { author, authorUrl, license, links } = CATALOG.site;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-about">
          Each app is a Shiny server that sends data and a React client that
          draws it. Nothing downloads anything at run time and nothing needs a
          key: every app builds its own data from a hash of the row number, so
          the Python server, the R server and the browser agree on it to the
          last digit.
        </p>

        <ul className="footer-links">
          {links.map((link) => (
            <li key={link.url}>
              <a href={link.url} {...away(link.url)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="footer-base">
        Built by{" "}
        {authorUrl ? (
          <a href={authorUrl} {...away(authorUrl)}>
            {author}
          </a>
        ) : (
          <strong>{author}</strong>
        )}
        {license ? ` · ${license}` : ""} · {year}
      </p>
    </footer>
  );
}

/** A small number reads better as a word when it starts a clause. */
function spellOut(value: number): string {
  const words = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven"];
  return words[value] ?? String(value);
}
