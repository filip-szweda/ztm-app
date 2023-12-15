const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080/register",
    specPattern: "tests/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
});
