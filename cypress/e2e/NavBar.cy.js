/* globals cy */
    
describe ('Test NavBar', () => {

    it ('clicking page NUProjects from home page navigates to home page', () => {
        cy.visit("/");
        cy.get('[data-cy=pageTitle]').click();
        cy.url().should("include", "/");
    });

    it ('clicking NUProjects from profile page navigates to home page', () => {
        cy.visit("/profile");
        cy.get('[data-cy=pageTitle]').click();
        cy.url().should("include", "/");
    });

    it ('clicking NUProjects from saved page navigates to home page', () => {
        cy.visit("/saved");
        cy.get('[data-cy=pageTitle]').click();
        cy.url().should("include", "/");
    });

    it ('clicking NUProjects from applied page navigates to home page', () => {
        cy.visit("/applied");
        cy.get('[data-cy=pageTitle]').click();
        cy.url().should("include", "/");
    });




    it ('clicking home button from profile page navigates to home page', () => {
        cy.visit("/profile");
        cy.get('[data-cy=home]').click();
        cy.url().should("include", "/");
    });

    it ('clicking home button from saved page navigates to home page', () => {
        cy.visit("/saved");
        cy.get('[data-cy=home]').click();
        cy.url().should("include", "/");
    });

    it ('clicking home button from applied page navigates to home page', () => {
        cy.visit("/applied");
        cy.get('[data-cy=home]').click();
        cy.url().should("include", "/");
    });

    it ('clicking home button on home page navigates to home page', () => {
        cy.visit("/");
        cy.get('[data-cy=home]').click();
        cy.url().should("include", "/");
    });





    it ('clicking profile on home page navigates to profile page with correct components', () => {
        cy.visit("/");
        cy.get("[id=collapsible-nav-dropdown]").click();
        cy.get("[data-cy=profile]").click();
        cy.url().should("include", "/profile");

        cy.get("[data-cy=profile-pic]").should('not.eql', "");
        cy.get("[data-cy=profile-name]").should('not.eql', "");
        cy.get("[data-cy=profile-email]").should('not.eql', "");
    });

    it ('clicking profile on profile page navigates to profile page with correct components', () => {
        cy.visit("/profile");
        cy.get("[id=collapsible-nav-dropdown]").click();
        cy.get("[data-cy=profile]").click();
        cy.url().should("include", "/profile");

        cy.get("[data-cy=profile-pic]").should('not.eql', "");
        cy.get("[data-cy=profile-name]").should('not.eql', "");
        cy.get("[data-cy=profile-email]").should('not.eql', "");
    });

    it ('clicking profile on saved page navigates to profile page with correct components', () => {
        cy.visit("/saved");
        cy.get("[id=collapsible-nav-dropdown]").click();
        cy.get("[data-cy=profile]").click();
        cy.url().should("include", "/profile");

        cy.get("[data-cy=profile-pic]").should('not.eql', "");
        cy.get("[data-cy=profile-name]").should('not.eql', "");
        cy.get("[data-cy=profile-email]").should('not.eql', "");
    });

    it ('clicking profile on applied page navigates to profile page with correct components', () => {
        cy.visit("/applied");
        cy.get("[id=collapsible-nav-dropdown]").click();
        cy.get("[data-cy=profile]").click();
        cy.url().should("include", "/profile");

        cy.get("[data-cy=profile-pic]").should('not.eql', "");
        cy.get("[data-cy=profile-name]").should('not.eql', "");
        cy.get("[data-cy=profile-email]").should('not.eql', "");
    });




    it ('clicking saved on home page navigates to saved page with correct components', () => {
        cy.visit("/");
        cy.get("[id=collapsible-nav-dropdown]").click();
        cy.get("[data-cy=saved]").click();
        cy.url().should("include", "/saved");
        cy.get("[data-cy=saved-page-title]").contains("Saved");
    });

    it ('clicking saved on profile page navigates to saved page with correct components', () => {
        cy.visit("/profile");
        cy.get("[id=collapsible-nav-dropdown]").click();
        cy.get("[data-cy=saved]").click();
        cy.url().should("include", "/saved");
        cy.get("[data-cy=saved-page-title]").contains("Saved");
    });

    it ('clicking saved on saved page navigates to saved page with correct components', () => {
        cy.visit("/saved");
        cy.get("[id=collapsible-nav-dropdown]").click();
        cy.get("[data-cy=saved]").click();
        cy.url().should("include", "/saved");
        cy.get("[data-cy=saved-page-title]").contains("Saved");
    });

    it ('clicking saved on applied page navigates to saved page with correct components', () => {
        cy.visit("/applied");
        cy.get("[id=collapsible-nav-dropdown]").click();
        cy.get("[data-cy=saved]").click();
        cy.url().should("include", "/saved");
        cy.get("[data-cy=saved-page-title]").contains("Saved");
    });




    it ('clicking applied on home page navigates to applied page with correct components', () => {
        cy.visit("/");
        cy.get("[id=collapsible-nav-dropdown]").click();
        cy.get("[data-cy=applied]").click();
        cy.url().should("include", "/applied");
        cy.get("[data-cy=applied-page-title]").contains("Applied");
    });
    
    it ('clicking applied on profile page navigates to applied page with correct components', () => {
        cy.visit("/profile");
        cy.get("[id=collapsible-nav-dropdown]").click();
        cy.get("[data-cy=applied]").click();
        cy.url().should("include", "/applied");
        cy.get("[data-cy=applied-page-title]").contains("Applied");
    });
    
    it ('clicking applied on saved page navigates to applied page with correct components', () => {
        cy.visit("/saved");
        cy.get("[id=collapsible-nav-dropdown]").click();
        cy.get("[data-cy=applied]").click();
        cy.url().should("include", "/applied");
        cy.get("[data-cy=applied-page-title]").contains("Applied");
    });

    it ('clicking applied on applied page navigates to applied page with correct components', () => {
        cy.visit("/applied");
        cy.get("[id=collapsible-nav-dropdown]").click();
        cy.get("[data-cy=applied]").click();
        cy.url().should("include", "/applied");
        cy.get("[data-cy=applied-page-title]").contains("Applied");
    });
    
  });