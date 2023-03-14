// Note: for this to pass, you must uncomment the marked lines in firebase.js to run emulator and sign in to test account
describe ('Sorting 2', () => {
    it ('launches', () => {
        cy.visit ('/');
    });

    it('cards should be sorted by start date (in increasing order) when "sort by start date" selected', () => {
        cy.visit("/");
        cy.get("[data-cy=sorting-button]").select('projectStartDate').invoke("val").should("eq", "projectStartDate");
        cy.wait(1000); // wait 1 second to ensure projectStartDate has been selected and the cards have been reordered
        let start_dates = [];
        cy.get("[data-cy=see-more-button]").then(buttons => {
          buttons.click()
          cy.get("[data-cy=start-date]").then(start_dates_html => {
            for (let i = 0; i < start_dates_html.length; i++) {
              start_dates.push(new Date(start_dates_html[i].innerText.slice(20))); // get the start date
            }
            let sorted_start_dates = [...start_dates].sort(function(a,b) {
              return new Date(a) - new Date(b);
            });
          // ensure application_deadlines is sorted in increasing order
          cy.wrap(start_dates).should('eql',sorted_start_dates);
      });
    });
  });

  it('failure for the previous start date test', () => {
    cy.visit("/"); // closes all previously opened modals by reopening root page
    cy.get("[data-cy=sorting-button]").select('projectStartDate').invoke("val").should("eq", "projectStartDate");
    cy.wait(1000); // wait 1 second to ensure projectStartDate has been selected and the cards have been reordered
    let start_dates = [];
    cy.get("[data-cy=see-more-button]").then(buttons => {
      buttons.click()
      cy.get("[data-cy=start-date]").then(start_dates_html => {
        for (let i = 0; i < start_dates_html.length; i++) {
          start_dates.push(new Date(start_dates_html[i].innerText.slice(20))); // get the start date
          start_dates.push(new Date()); // broken code!!!
        }
        let sorted_start_dates = [...start_dates].sort(function(a,b) {
          return new Date(a) - new Date(b);
        });
      // ensure application_deadlines is sorted in increasing order
      cy.wrap(start_dates).should('not.eql',sorted_start_dates);
    });
   });
  });

  it('cards should be sorted by end date (in increasing order) when "sort by end date" selected', () => {
        cy.visit("/");
        cy.get("[data-cy=sorting-button]").select('projectEndDate').invoke("val").should("eq", "projectEndDate");
        cy.wait(1000); // wait 1 second to ensure projectEndDate has been selected and the cards have been reordered
        let end_dates = [];
        cy.get("[data-cy=see-more-button]").then(buttons => {
          buttons.click()
          cy.get("[data-cy=end-date]").then(end_dates_html => {
            for (let i = 0; i < end_dates_html.length; i++) {
              end_dates.push(new Date(end_dates_html[i].innerText.slice(18))); // get the start date
            }
            let sorted_end_dates = [...end_dates].sort(function(a,b) {
              return new Date(a) - new Date(b);
            });
          // ensure application_deadlines is sorted in increasing order
          cy.wrap(end_dates).should('eql',sorted_end_dates);
      });
    });
  });

  it('failure for the previous end date test', () => {
    cy.visit("/");
    cy.get("[data-cy=sorting-button]").select('projectEndDate').invoke("val").should("eq", "projectEndDate");
    cy.wait(1000); // wait 1 second to ensure projectEndDate has been selected and the cards have been reordered
    let end_dates = [];
    cy.get("[data-cy=see-more-button]").then(buttons => {
      buttons.click()
      cy.get("[data-cy=end-date]").then(end_dates_html => {
        for (let i = 0; i < end_dates_html.length; i++) {
          end_dates.push(new Date(end_dates_html[i].innerText.slice(18))); // get the start date
          end_dates.push(new Date()); // broken code!!!
        }
        let sorted_end_dates = [...end_dates].sort(function(a,b) {
          return new Date(a) - new Date(b);
        });
      // ensure application_deadlines is sorted in increasing order
      cy.wrap(end_dates).should('not.eql',sorted_end_dates);
  });
});
});

});