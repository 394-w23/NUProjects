describe("Searching for positions", () => {
  it("launches", () => {
    cy.visit("/");
  });

  // test that search works positionName, 
  // description, projectName, skillsRequired, and hashtags
  it("searches for positionName", () => {
    cy.get('input[name="search-input"]').type('Backend Developer');
    cy.contains('Backend Developer');
  });

  it("searches for description", () => {
    cy.get('input[name="search-input"]').type('This is a description');
    cy.contains('This is a description');
  });

  it("searches for projectName", () => {
    cy.get('input[name="search-input"]').type('E-Commerce Project');
    cy.contains('E-Commerce Project');
  });

  it("searches for skillsRequired", () => {
    cy.get('input[name="search-input"]').type('Python');
    cy.contains('Python');
  });

  it("searches for hashtags", () => {
    cy.get('input[name="search-input"]').type('Web Development');
    cy.contains('Web Development');
  });
});
