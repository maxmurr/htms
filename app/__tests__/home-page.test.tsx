import Home from "../page";

describe("Home Page", () => {
  it("renders the Next.js logo", () => {
    cy.mount(<Home />);
    cy.get('img[alt="Next.js logo"]').should("be.visible");
  });

  it("displays the getting started heading", () => {
    cy.mount(<Home />);
    cy.get("h1").should("contain.text", "To get started");
  });

  it("has links to Templates and Learning center", () => {
    cy.mount(<Home />);
    cy.contains("a", "Templates").should("have.attr", "href");
    cy.contains("a", "Learning").should("have.attr", "href");
  });

  it("has Deploy Now and Documentation buttons", () => {
    cy.mount(<Home />);
    cy.contains("a", "Deploy Now").should("be.visible");
    cy.contains("a", "Documentation").should("be.visible");
  });
});
