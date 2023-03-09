describe("Test Routes", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("returns correct content for protected routes when not logged in", () => {
    cy.visit("/profile");
    cy.get("div#root").should("exist").and("be.empty");

    cy.visit("/saved");
    cy.get("div").should("exist").and("have.length", 10);

    cy.visit("/applied");
    cy.get("div").should("exist").and("have.length", 10);
  });

  it("allows access to protected routes when logged in", () => {
    // Log in the user
    // cy.sinIn();

    cy.visit("/profile");
    cy.url().should("include", "/profile");

    cy.visit("/saved");
    cy.url().should("include", "/saved");

    cy.visit("/applied");
    cy.url().should("include", "/applied");
  });

  it("redirects to homepage for non-existing routes", () => {
    cy.visit("/nonexistingroute");
    cy.url().should("include", "/");
  });
});

