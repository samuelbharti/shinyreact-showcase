#!/usr/bin/env node
// Rebuild every app and fail when the committed bundle does not match.
//
//   node tools/check-built.mjs
//
// Connect Cloud runs no Node at deploy time, so each app commits its own
// www/ui.js and www/ui.css. That only stays honest if something checks it.
// This is that check, and CI runs it on every pull request.
//
// It rebuilds, then asks git whether anything under www/ changed. A drift
// means the committed bundle was built from different source than what is in
// the tree, which is the bug that ships an app nobody can reproduce.

import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function git(args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" });
}

function run(command, args) {
  execFileSync(command, args, { cwd: root, stdio: "inherit", shell: true });
}

const dirty = git(["status", "--porcelain", "--", "*/www/ui.js", "*/www/ui.css"]).trim();
if (dirty) {
  console.error("Working tree already has uncommitted bundle changes:");
  console.error(dirty);
  console.error("");
  console.error("Commit or stash them first, otherwise this check cannot tell");
  console.error("your edits apart from a stale bundle.");
  process.exit(1);
}

console.log("Rebuilding every workspace...");
run("npm", ["run", "build", "--workspaces", "--if-present"]);

const drifted = git(["status", "--porcelain", "--", "*/www/ui.js", "*/www/ui.css"]).trim();

if (!drifted) {
  console.log("");
  console.log("Every committed bundle matches its source.");
  process.exit(0);
}

const apps = [
  ...new Set(
    drifted
      .split("\n")
      .map((line) => line.slice(3).replace(/^"|"$/g, ""))
      .map((file) => file.split("/").slice(0, 2).join("/")),
  ),
];

console.error("");
console.error("These bundles do not match their source:");
for (const app of apps) console.error(`  ${app}`);
console.error("");
console.error("Rebuild and commit the result:");
for (const app of apps) console.error(`  npm run build -w ${app}`);
process.exit(1);
