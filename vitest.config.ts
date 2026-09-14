import { defineConfig } from "vitest/config";

// One config for every workspace. Each app keeps its tests beside itself, and
// `npx vitest run apps/<slug>` narrows to one app.
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: false,
    include: ["{apps,gallery}/**/tests/**/*.test.{ts,tsx}"],
    exclude: ["**/node_modules/**", "**/www/**", "templates/**", "docs/local/**"],
  },
});
