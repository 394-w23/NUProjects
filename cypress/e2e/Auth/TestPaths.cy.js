describe("Test Routes", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("redirects to login for protected routes when not logged in", () => {
      cy.visit("/profile");
      cy.url().should("include", "/login");
  
      cy.visit("/saved");
      cy.url().should("include", "/login");
  
      cy.visit("/applied");
      cy.url().should("include", "/login");
    });
  
    it("allows access to protected routes when logged in", () => {
      // Log in the user
      cy.sinIn();
  
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
  