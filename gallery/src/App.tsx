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
            Shiny apps I've built to see what the ui.tsx pattern is actually worth:
            the server keeps the reactive computation, and a React client owns
            the screen. Each one picks a single thing plain Shiny does badly,
            then puts a number on what the split buys. {spellOut(compared)} go
            further. They draw the plain Shiny version alongside, with a counter
            on each, so you can watch the two come apart while you drag.
          </p>
          <p className="hero-text">
            The same TSX bundle runs against a Python server and an R one, and
            nothing in the browser knows the difference.
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
          Nothing here fetches data at run time and nothing needs a key. Most
          apps compute theirs from the row number, so the Python server, the R
          server and the browser land on the same values. A few ship a small
          file next to the code. Either way the whole gallery runs in one
          process and deploys as a single piece of content.
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
