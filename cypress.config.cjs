const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureCypress(on, {
        resultsDir: "./allure-results",
        links: [
          { type: "issue", urlTemplate: "https://issues.example.com/%s" },
          { type: "tms", urlTemplate: "https://tms.example.com/%s" },
        ],
      });
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:8002",
    fixturesFolder: "cypress/fixtures",
    slowTestThreshold: 10000,
    screenshotOnRunFailure: true,
  }
});
