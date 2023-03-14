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
