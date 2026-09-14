#!/usr/bin/env node
// Scaffold a new app from templates/app/.
//
//   node tools/new-app.mjs cell-atlas "Cell atlas"
//
// Copies templates/app/ to apps/<slug>, renames the Python logic module after
// the slug, and replaces the placeholders in every copied file. Does not touch
// catalog.yml: add the row there yourself, with the same slug.
//
// The module is renamed because a sibling helper is imported under its bare
// name into one shared sys.modules when the gallery loads every app in one
// process. Two apps with a logic.py would silently share whichever loaded
// first. Naming the module after the slug makes that impossible.

import { cp, readdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");

const [, , slug, title] = process.argv;

if (!slug) {
  console.error('Usage: node tools/new-app.mjs <slug> ["Title"]');
  process.exit(1);
}

if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(slug)) {
  console.error(
    `"${slug}" is not a usable slug. Use lower case words joined by hyphens, ` +
      "for example cell-atlas. The slug becomes a URL, a directory name and a " +
      "Python module name.",
  );
  process.exit(1);
}

const appPath = path.join(root, "apps", slug);
const templatePath = path.join(root, "templates", "app");
const moduleName = slug.replaceAll("-", "_");
const appTitle = title ?? slug;

async function exists(target) {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir, fn) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, fn);
    else await fn(full);
  }
}

async function replaceInFile(file, replacements) {
  const text = await readFile(file, "utf8");
  let next = text;
  for (const [from, to] of replacements) next = next.split(from).join(to);
  if (next !== text) await writeFile(file, next);
}

async function main() {
  if (await exists(appPath)) {
    console.error(`apps/${slug} already exists. Not overwriting it.`);
    process.exit(1);
  }

  await cp(templatePath, appPath, { recursive: true });

  // Rename before the text pass, so the placeholder in the file contents and
  // the name on disk cannot drift apart.
  await rename(
    path.join(appPath, "APP_MODULE.py"),
    path.join(appPath, `${moduleName}.py`),
  );
  await rename(
    path.join(appPath, "tests", "test_APP_MODULE.py"),
    path.join(appPath, "tests", `test_${moduleName}.py`),
  );

  const replacements = [
    ["APP_MODULE", moduleName],
    ["APP_TEST_PATH", `apps/${slug}`],
    ["APP_TITLE", appTitle],
    ["APP_NAME", slug],
  ];
  await walk(appPath, (file) => replaceInFile(file, replacements));

  console.log(`Scaffolded apps/${slug} from templates/app/.`);
  console.log("");
  console.log("Next:");
  console.log(`  1. Add a row for "${slug}" to catalog.yml, with all three claim fields.`);
  console.log("  2. npm install");
  console.log(`  3. npm run build -w apps/${slug}`);
  console.log(`  4. shiny run apps/${slug}/app.py`);
}

main();
