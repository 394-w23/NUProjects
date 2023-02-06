/* globals cy */
    
describe ('Test App', () => {

    beforeEach(() => {
      cy.visit("/");
    });

    it ('opens with page title', () => {
      cy.get('[data-cy=pageTitle]').should('contain', 'NUProjects');
    });

    it ('opens with home nav', () => {
      cy.get("[data-cy=home]").should("contain", "Home");
    });

    it ('opens with home nav', () => {
      cy.get("[data-cy=home]").should("contain", "Home");
    });

    it("opens with collapsible nav dropdown items", () => {
      cy.get("[id=collapsible-nav-dropdown]").click();
      cy.get("[data-cy=profile]").should("contain", "Profile");
      cy.get("[data-cy=saved]").should("contain", "Saved");
      cy.get("[data-cy=applied]").should("contain", "Applied");
      cy.get("[data-cy=sign-out]").should("contain", "Sign out");
    });

    it("opens with search, sort, and filter", () => {
      cy.get('input[type="search"]').should("have.value", "")

      cy.get("[data-cy=sorting-button]").invoke("val").should("eq", "datePosted");

      cy.get("[data-cy=filtering-button]").invoke("val").should("eq", "");
    });

    it("opens with add new posiiton listing button", () => {
      cy.get("[data-cy=add-button]").should("contain", "Add New Position Listing");
    });

    
  });