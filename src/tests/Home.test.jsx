describe('Home button', () => {
  it('should exist and navigate to home page', () => {
    // Visit a page
    cy.visit('/some-page');

    // Find the home button and click it
    cy.get('.navbar')
      .contains('Home')
      .click();

    // Assert that the URL is the home page URL
    cy.url().should('include', '/');

    // Assert that the home page content is visible
    cy.get('h1')
      .should('be.visible')
      .and('have.text', 'Welcome to My Website');
  });
});
