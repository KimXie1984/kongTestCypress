const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:8002",
    fixturesFolder: "cypress/fixtures",
    slowTestThreshold: 10000,
    screenshotOnRunFailure: true,
  }
});
