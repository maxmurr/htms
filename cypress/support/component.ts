import { mount } from "cypress/react";
// Note: CSS import removed due to Next.js style-loader incompatibility with Cypress
// Styles are loaded via component-index.html instead

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", mount);
