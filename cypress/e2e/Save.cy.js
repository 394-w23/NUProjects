describe('Saving a job', () => {
  it('should add the job to the "Jobs Saved" page', () => {
    // Visit the job listing page
    cy.visit('/jobs');

    // Click on the first job listing
    cy.get('.job-listing')
      .first()
      .click();

    // Click the "Save Job" button
    cy.get('.save-job-btn')
      .click();

    // Navigate to the "Jobs Saved" page
    cy.get('.navbar')
      .contains('Jobs Saved')
      .click();

    // Assert that the saved job is on the page
    cy.get('.saved-job-listing')
      .should('have.length', 1)
      .and('contain', 'Job Title');
    
  });
});

describe('React CI', () => {
  it('should not fail after 1 minute of running', () => {
    // Set the timeout to 2 minutes
    cy.server({ timeout: 120000 });

    // Visit the CI page
    cy.visit('/ci');

    // Wait for the CI to complete
    cy.get('.ci-status')
      .should('not.contain', 'In Progress')
      .and('contain', 'Completed');

    // Check if the CI failed
    cy.get('.ci-status')
      .contains('Failed')
      .should('not.exist');
  });
});
