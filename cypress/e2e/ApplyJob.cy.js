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
This test assumes that the job listing page has a list of job listings with a job-listing class, and that each job listing has an "Apply" button with an apply-btn class. It also assumes that clicking the "Apply" button opens an application form with an application-form id, and that submitting the form sends the application data to the server and redirects to the "Jobs Applied" page, which displays applied jobs with an applied-job-listing class.

You'll need to customize this test to match your specific application's UI and functionality.





