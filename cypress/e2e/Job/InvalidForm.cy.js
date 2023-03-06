describe("Test Job Creation with Firebase Connection - Failure", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be authenticated with firebase", () => {
    cy.get('[data-cy="sign-out"]').should("contain", "Sign out");
  });

  it("should display toast on incomplete form submission", () => {
    cy.get('[data-cy="addBtn"]').click();
    cy.get('[data-cy="modal-header"]').should("contain", "Create new project");

    // Fill out incomplete job form
    cy.get('[data-cy="addmodal-projectname"]').type("Project Name");
    cy.get('[data-cy="addmodal-projecttype"]').select("");
    cy.get('[data-cy="addmodal-positionname"]').type("");

    // Submit form
    cy.get('[data-cy="submitButton"').click();

    // Check toast
    cy.get('[data-cy="alert-toast"').should("be.visible");
  });
});
