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

describe("Searching for positions partially", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("searches for positionName (partial input)", () => {
    cy.get('input[type="search"]').first().type('Back');
    cy.contains('Backend Developer');
  });

  it("searches for description (partial input)", () => {
    cy.get('input[type="search"]').first().type('This');
    cy.contains('This is a description');
  });

  it("searches for projectName (partial input)", () => {
    cy.get('input[type="search"]').first().type('E-Com');
    cy.contains('E-Commerce Project');
  });

  it("searches for skillsRequired (partial input)", () => {
    cy.get('input[type="search"]').first().type('Py');
    cy.contains('Python');
  });

  it("searches for hashtags (partial input)", () => {
    cy.get('input[type="search"]').first().type('Web');
    cy.contains('WebDevelopment');
  });
});

describe("Full search bar functionality", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays correct cards when searching for a specific term", () => {
    cy.get('input[type="search"]').first().should('be.visible').type('Backend Developer');
    cy.get('.card').should('contain', 'Backend Developer');
  });

  it("updates the number of cards displayed correctly when search query is changed", () => {
    cy.get('input[type="search"]').first().should('be.visible').type('Frontend Developer');
    cy.get('.card').should('have.length', 2);
    cy.get('input[type="search"]').first().clear().should('be.visible').type('Backend Developer');
    cy.get('.card').should('have.length', 1);
  });

  it("filters cards correctly based on title, description, or tags", () => {
    cy.get('input[type="search"]').first().should('be.visible').type('Frontend Developer');
    cy.get('.card').should('contain', 'Frontend Developer');
    cy.get('input[type="search"]').first().clear().should('be.visible').type('React');
    cy.get('.card').should('contain', 'React');
  });

  it("correctly handles special characters and spaces in search query", () => {
    cy.get('input[type="search"]').first().should('be.visible').type(' Frontend Dev');
    cy.get('.card').should('contain', 'Frontend Dev');
    cy.get('input[type="search"]').first().clear().should('be.visible').type('Frontend Dev!');
    cy.get('.card').should('contain', 'Frontend Dev');
  });

  it("correctly handles case sensitivity in search query", () => {
    cy.get('input[type="search"]').first().should('be.visible').type('end developer');
    cy.get('.card').should('contain', 'end developer');
    cy.get('input[type="search"]').first().clear().should('be.visible').type('End Developer');
    cy.get('.card').should('contain', 'End Developer');
  });

  it("correctly handles partial match searches", () => {
    cy.get('input[type="search"]').first().should('be.visible').type('Web');
    cy.get('.card').should('contain', 'Web');
    cy.get('input[type="search"]').first().clear().should('be.visible').type('Dev');
    cy.get('.card').should('contain', 'Dev');
  });
});
