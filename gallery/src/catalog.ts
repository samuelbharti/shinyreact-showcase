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
  library: string;
  features: string[];
  compare: boolean;
  /** Where this app lives on this server. The server decides the shape. */
  href: string;
  /** The same app on the other language's deployment, or "". */
  other: string;
};

export type Catalog = {
  /** "Python" or "R". Which server is serving this page. */
  language: string;
  apps: Entry[];
};

export function readCatalog(doc: Document = document): Catalog {
  const tag = doc.getElementById("shinyreact-catalog");
  if (!tag?.textContent) return { language: "", apps: [] };
  return JSON.parse(tag.textContent) as Catalog;
}
