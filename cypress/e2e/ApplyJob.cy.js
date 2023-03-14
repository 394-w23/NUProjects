describe('Applying to a job', () => {
  it('should add the job to the "Jobs Applied" page', () => {
    // Visit the job listing page
    cy.visit('/jobs');

    // Click on the first job listing
    cy.get('.job-listing')
      .first()
      .click();

    // Click the "Apply" button
    cy.get('.apply-btn')
      .click();

    // Fill out and submit the application form
    cy.get('#application-form')
      .find('[name="name"]')
      .type('John Doe');
    cy.get('#application-form')
      .find('[name="email"]')
      .type('johndoe@example.com');
    cy.get('#application-form')
      .find('[name="resume"]')
      .attachFile('resume.pdf');
    cy.get('#application-form')
      .find('[type="submit"]')
      .click();

    // Navigate to the "Jobs Applied" page
    cy.get('.navbar')
      .contains('Jobs Applied')
      .click();

    // Assert that the applied job is on the page
    cy.get('.applied-job-listing')
      .should('have.length', 1)
      .and('contain', 'Job Title');
  });
});





