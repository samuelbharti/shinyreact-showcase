import { existsSync } from "node:fs";
import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vitest/config";

/**
 * Resolve each app's own `@/` alias.
 *
 * Every app maps `@/` to its own `src/`, in its own vite.config.ts. One
 * vitest run covers all of them from the repo root, where that alias means
 * nothing, so resolve it per file instead: walk up from whoever did the
 * importing until the app directory turns up, then look in its `src/`.
 *
 * The alternative is a vitest project per app, which is more configuration
 * and one more file per app to keep in step.
 */
function appSrcAlias(): Plugin {
  return {
    name: "app-src-alias",
    async resolveId(source, importer, options) {
      if (!source.startsWith("@/") || !importer) return null;

      let dir = path.dirname(importer);
      while (dir !== path.dirname(dir)) {
        if (existsSync(path.join(dir, "package.json"))) {
          const target = path.resolve(dir, "src", source.slice(2));
          return this.resolve(target, importer, { ...options, skipSelf: true });
        }
        dir = path.dirname(dir);
      }
      return null;
    },
  };
}

export default defineConfig({
  plugins: [appSrcAlias(), react()],
  test: {
    environment: "jsdom",
    globals: false,
    include: ["{apps,gallery}/**/tests/**/*.test.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/www/**", "templates/**", "docs/local/**"],
  },
});
