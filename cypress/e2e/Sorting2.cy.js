describe ('Sorting 2', () => {
    it ('launches', () => {
        cy.visit ('/');
    });

    it('cards should be sorted by start date (in increasing order) when "sort by start date" selected', () => {
        cy.visit("/");
        cy.get("[data-cy=sorting-button]").select('projectStartDate').invoke("val").should("eq", "projectStartDate");
        let start_dates = [];
        cy.get("[data-cy=see-more-button]").then(buttons => {
          buttons.click()
          cy.get("[data-cy=start-date]").then(start_dates_html => {
            for (let i = 0; i < start_dates_html.length; i++) {
              start_dates.push(new Date(start_dates_html[i].innerText.slice(20,30))); // get the start date
              console.log(start_dates_html[i].innerText)
            }
          })
        });
        console.log(start_dates) // changes everytime
        let sorted_start_dates = [...start_dates].sort(function(a,b) {
            return new Date(a) - new Date(b);
        });
        // ensure application_deadlines is sorted in increasing order
        cy.wrap(start_dates).should('eql',sorted_start_dates);
    });

      // it('failure for the previous start date test', () => {
      //   cy.visit("/");
      // });
});