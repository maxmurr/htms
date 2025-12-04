import Home from "../(home)/page";

describe("Home Page", () => {
  it("renders successfully", () => {
    cy.mount(<Home />);
    cy.get("h1").should("exist");
  });
});
