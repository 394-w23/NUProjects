/* globals cy */

describe("Searching for positions", () => {
  it("launches", () => {
    cy.visit("/");
  });

  beforeEach(() => {
    cy.visit("/");
  });

  // test that search works positionName, 
  // description, projectName, skillsRequired, and hashtags
  it("searches for positionName", () => {
    cy.get('input[type="search"]').first().type('Backend Developer');
    cy.contains('Backend Developer');
  });

  it("searches for description", () => {
    cy.get('input[type="search"]').first().type('This is a description');
    cy.contains('This is a description');
  });

  it("searches for projectName", () => {
    cy.get('input[type="search"]').first().type('E-Commerce Project');
    cy.contains('E-Commerce Project');
  });

  it("searches for skillsRequired", () => {
    cy.get('input[type="search"]').first().type('Python');
    cy.contains('Python');
  });

  it("searches for hashtags", () => {
    cy.get('input[type="search"]').first().type('Web Development');
    cy.contains('WebDevelopment');
  });
});
