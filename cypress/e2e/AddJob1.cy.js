/* globals cy */
    
describe ('Adding Jobs 1', () => {

    it ('launches', () => {
      cy.visit ('/');
    });

    it ('opens with page title', () => {
      cy.visit ('/');
      cy.get('[data-cy=pageTitle]').should('contain', 'NUProjects');
    });

    it('displays AddModal on button click', () => {
        cy.visit('/');
        cy.get("[data-cy=addBtn]").should("contain", "Add New Position Listing")
        cy.get("[data-cy=addBtn]").click();
        cy.get("[data-cy=modal-header").should("contain", "Create new project")
    })

    it('submits form when all AddModal fields are filled', () => {
      cy.visit('/');
      cy.get("[data-cy=addBtn]").should("contain", "Add New Position Listing")
      cy.get("[data-cy=addBtn]").click();
      cy.get("[data-cy=modal-header]").should("contain", "Create new project")

      // fill out form
      cy.get("[data-cy=addmodal-projectname]").type("Project Name")
      cy.get("[data-cy=addmodal-projecttype]")
        .select("Full-time")
      cy.get("[data-cy=addmodal-positionname]").type("Position Name")
      cy.get("[data-cy=addmodal-deadline]").type("2023-02-18")
      cy.get("[data-cy=addmodal-startdate]").type("2023-05-01")
      cy.get("[data-cy=addmodal-enddate]").type("2023-09-01")
      cy.get("[data-cy=addmodal-numpeople]").clear().type("3")
      cy.get("[data-cy=addmodal-wage]").clear().type("30")
      cy.get("[data-cy=addmodal-description]").type("This is a description.")
      cy.get("[data-cy=addmodal-skills")
        .click()
        .contains("Agile").click()
      cy.get("[data-cy=modal-header]").click()
      cy.get("[data-cy=addmodal-hashtags")
      .click()
      .contains("#WebDevelopment").click()
      cy.get("[data-cy=modal-header]").click()
   })

  });