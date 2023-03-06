describe ('Filtering 2', () => {

    it ('launches', () => {
        cy.visit ('/');
    });

    it('cards should be filtered based on the multiple skills selected in the "filter by skills" dropdown menu', () => {
        cy.visit("/");
        // get all cards with the skill agile without using the filter
        let application_C_SQL_unfiltered=[]
        
        cy.get("[data-cy=card_skills]").then(card_info => {
            
            for (let j = 0; j < card_info.length; j++) {
                if(card_info[j].innerText.includes("C++") || card_info[j].innerText.includes("SQL")){
                    application_C_SQL_unfiltered.push(card_info[j].innerText)
                }
            }
        })
        // get all the cards with the skill agile after using the filter
        let application_C_SQL_filtered=[]
        cy.get('[data-cy="filtering-button"]').click();
        cy.wait(1000);
        cy.get('[data-value="C++"]').click()
        cy.wait(1000);
        cy.get('[data-value="SQL"]').click()
        cy.get("[data-cy=card_skills]").then(card_info => {
            
            for (let j = 0; j < card_info.length; j++) {
                application_C_SQL_filtered.push(card_info[j].innerText)
            }
        })
        cy.wait(1000);
        // ensure that all application with agile as a skill are displayed
        cy.wrap(application_C_SQL_unfiltered).should('eql',application_C_SQL_filtered);
      });

})