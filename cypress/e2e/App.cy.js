/* globals cy */
    
describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });

    it ('opens with page title', () => {
      cy.visit ('/');
      cy.get('[data-cy=pageTitle]').should('contain', 'NUProjects');
    });

    // it("'add new position listing' button shows modal", () => {
    //   cy.visit("/");
    //   cy.get("[data-cy=add-new-position-listing]").click();
    //   cy.get("[data-cy=modal-header]").should("contain", "Create new project");
    // });
  
    // it("sign out current user", () => {
    //   cy.visit("/");
    //   cy.get("[data-cy=sign-out]").click();
    //   cy.get("[data-cy=sign-in]").should("contain", "Sign in");
    // })
  });