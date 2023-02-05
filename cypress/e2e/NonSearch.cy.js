/* globals cy */

describe("Searching for positions that do not exist", () => {
  it("launches", () => {
    cy.visit("/");
  });

  beforeEach(() => {
    cy.visit("/");
  });

  // test that search works for positionName, 
  // description, projectName, skillsRequired, and hashtags
  it("searches for positionName", () => {
    cy.get('input[type="search"]').first().type('Middleend Developer');
    cy.get('body').should('not.contain', 'Middleend Developer');
  });

  it("searches for description", () => {
    cy.get('input[type="search"]').first().type('This is not a description');
    cy.get('body').should('not.contain', 'This is not a description');
  });

  it("searches for projectName", () => {
    cy.get('input[type="search"]').first().type('G-Commerce Project');
    cy.get('body').should('not.contain', 'G-Commerce Project');
  });

  it("searches for skillsRequired", () => {
    cy.get('input[type="search"]').first().type('Rython');
    cy.get('body').should('not.contain', 'Rython');
  });

  it("searches for hashtags", () => {
    cy.get('input[type="search"]').first().type('Peb Development');
    cy.get('body').should('not.contain', 'PebDevelopment');
  });
});
