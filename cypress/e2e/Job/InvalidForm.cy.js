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

    // Fill out add job form
    cy.get('[data-cy="addmodal-projectname"]').type("Project Name");
    cy.get('[data-cy="addmodal-projecttype"]').select("Full-time");
    cy.get('[data-cy="addmodal-positionname"]').type("Position Name");
    cy.get('[data-cy="addmodal-deadline"]').type("2023-02-18");
    cy.get('[data-cy="addmodal-startdate"]').type("2023-05-01");
    cy.get('[data-cy="addmodal-enddate"]').type("2023-09-01");
    cy.get('[data-cy="addmodal-numpeople"]').clear().type("3");
    cy.get('[data-cy="addmodal-wage"]').clear().type("30");
    cy.get('[data-cy="addmodal-description"]').type("This is a description.");
    cy.get('[data-cy="addmodal-skills"').click().contains("Agile").click();
    cy.get('[data-cy="addmodal-hashtags"')
      .click()
      .contains("#WebDevelopment")
      .click();

    // Submit form
    cy.get('[data-cy="submitButton"').click();

    // Check toast
    cy.get('[data-cy="alert-toast"').should("be.visible");
  });
});
