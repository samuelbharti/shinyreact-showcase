// The catalog, read out of the page rather than fetched.
//
// Both galleries inline catalog.yml into the document as a JSON script tag,
// so the cards paint on the first frame. Reading it through an output would
// leave the landing page empty until the websocket opens, which is the worst
// first impression a showcase can make.

export type Entry = {
  slug: string;
  title: string;
  blurb: string;
  claim: string;
  plainShiny: string;
  thisApp: string;
  domain: string;
  /** Which family of cards this one sits under. Matches a Group id. */
  group: string;
  library: string;
  features: string[];
  compare: boolean;
  /** Where this app lives on this server. The server decides the shape. */
  href: string;
  /** The same app on the other language's deployment, or "". */
  other: string;
};

export type Group = {
  id: string;
  title: string;
  note: string;
  /** The accent this family is drawn in. Comes from catalog.yml. */
  colour: string;
};

export type SiteLink = { label: string; url: string };

export type Site = {
  title: string;
  author: string;
  authorUrl: string;
  repoUrl: string;
  license: string;
  /** The footer column, in order. Comes from catalog.yml, not from here. */
  links: SiteLink[];
};

export type Catalog = {
  /** "Python" or "R". Which server is serving this page. */
  language: string;
  apps: Entry[];
  groups: Group[];
  site: Site;
};

const NO_SITE: Site = {
  title: "Shiny React showcase",
  author: "",
  authorUrl: "",
  repoUrl: "",
  license: "",
  links: [],
};

export function readCatalog(doc: Document = document): Catalog {
  const tag = doc.getElementById("shinyreact-catalog");
  if (!tag?.textContent) {
    return { language: "", apps: [], groups: [], site: NO_SITE };
  }

  const parsed = JSON.parse(tag.textContent) as Partial<Catalog>;
  return {
    language: parsed.language ?? "",
    apps: parsed.apps ?? [],
    groups: parsed.groups ?? [],
    site: { ...NO_SITE, ...(parsed.site ?? {}) },
  };
}

/**
 * The apps, in the order the groups are listed, dropping empty groups.
 *
 * A group with nothing in it is not drawn. catalog.yml names all four
 * families from the start, and the gallery only serves the apps that have
 * actually been built, so an empty heading would otherwise sit on the page
 * advertising work that is not there.
 */
export function byGroup(
  apps: Entry[],
  groups: Group[],
): { group: Group; apps: Entry[] }[] {
  const sections = groups
    .map((group) => ({
      group,
      apps: apps.filter((entry) => entry.group === group.id),
    }))
    .filter((section) => section.apps.length > 0);

  // Anything whose group is missing from the list still has to appear, or a
  // typo in catalog.yml would silently hide an app.
  const placed = new Set(groups.map((group) => group.id));
  const orphans = apps.filter((entry) => !placed.has(entry.group));
  if (orphans.length > 0) {
    sections.push({
      group: { id: "other", title: "Everything else", note: "", colour: "#5c6370" },
      apps: orphans,
    });
  }

  return sections;
}
