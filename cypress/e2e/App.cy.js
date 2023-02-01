/* globals cy */

describe("Test App", () => {
  it("launches", () => {
    cy.visit("/");
  });

  it("opens with page title", () => {
    cy.visit("/");
    cy.get("[data-cy='page-title']").should("contain", "NUProjects");
  });

  it("'add new position listing' button shows modal", () => {
    cy.visit("/");
    cy.get("[data-cy='post-button']").should("be.disabled");
  });
});
