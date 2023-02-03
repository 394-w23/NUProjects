describe ('Sorting 1', () => {
    it ('launches', () => {
        cy.visit ('/');
    });

    it('cards should be sorted by date posted (in increasing order) by default', () => {
      cy.visit("/");
      cy.get("[data-cy=sorting-button]").invoke("val").should("eq", "datePosted");
      cy.get("[data-cy=card-info]").then(card_info => {
        let dates_posted = []
        for (let i = 0; i < card_info.length; i++) {
            dates_posted.push(new Date((card_info[i].innerHTML).slice(13,23)));
        }
        let sorted_dates_posted = [...dates_posted].sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
        });
        // ensure dates_posted is sorted in increasing order
        cy.wrap(dates_posted).should('eql',sorted_dates_posted);
      });
    });

    it(`cards should be sorted by application deadline (in increasing order) 
        when "sort by application deadline" selected`, () => {
        cy.visit("/");
        cy.get("[data-cy=sorting-button]").select('dateToSubmit').invoke("val").should("eq", "dateToSubmit");
        cy.get("[data-cy=card-info]").then(card_info => {
          let application_deadlines = []
          for (let i = 0; i < card_info.length; i++) {
            application_deadlines.push(new Date((card_info[i].innerHTML).slice(48,58)));
          }
          let sorted_application_deadlines = [...application_deadlines].sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
          });
          // ensure application_deadlines is sorted in increasing order
          cy.wrap(application_deadlines).should('eql',sorted_application_deadlines);
        });
      });
});