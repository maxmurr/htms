import { defineConfig } from "cypress";

export default defineConfig({
  // numTestsKeptInMemory: 0,
  env: {
    uncaughtCypressException: false,
    hideXhr: true,
  },
  chromeWebSecurity: false,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  // blockHosts: ['!*localhost*'],
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: "**/*.test.tsx",
    supportFile: "cypress/support/component.ts",
    indexHtmlFile: "cypress/support/component-index.html",
    viewportWidth: 680,
    viewportHeight: 768,
  },
});
