// Note: for this to pass, you must uncomment the marked lines in firebase.js to run emulator and sign in to test account
describe ('Sorting 1', () => {

    it ('launches', () => {
        cy.visit ('/');
    });

    it('cards should be sorted by date posted (in increasing order) by default', () => {
      cy.visit("/");
      cy.get("[data-cy=sorting-button]").invoke("val").should("eq", "datePosted");
      cy.get("[data-cy=card-info]").then(card_info => {
        let dates_posted = [];
        for (let i = 0; i < card_info.length; i++) {
            dates_posted.push(new Date((card_info[i].innerHTML).slice(13,23))); // get the date posted
        }
        let sorted_dates_posted = [...dates_posted].sort(function(a,b) {
            return new Date(a) - new Date(b);
        });
        // ensure dates_posted is sorted in increasing order
        cy.wrap(dates_posted).should('eql',sorted_dates_posted);
      });
    });

    it('failure for the previous date posted test', () => {
        cy.visit("/");
        cy.get("[data-cy=sorting-button]").invoke("val").should("eq", "datePosted");
        cy.get("[data-cy=card-info]").then(card_info => {
          let dates_posted = [];
          for (let i = 0; i < card_info.length; i++) {
              dates_posted.push(new Date((card_info[i].innerHTML).slice(13,23)));
              dates_posted.push(new Date()) // broken code!!!
          }
          let sorted_dates_posted = [...dates_posted].sort(function(a,b) {
              return new Date(a) - new Date(b);
          });
          // ensure dates_posted is sorted in increasing order
          cy.wrap(dates_posted).should('not.eql',sorted_dates_posted); // not equal
        });
      });

    it('cards should be sorted by application deadline (in increasing order) when "sort by application deadline" selected', () => {
        cy.visit("/");
        cy.get("[data-cy=sorting-button]").select('dateToSubmit').invoke("val").should("eq", "dateToSubmit");
        cy.wait(1000); // wait 1 second to ensure dateToSubmit has been selected and the cards have been reordered
        cy.get("[data-cy=card-info]").then(card_info => {
          let application_deadlines = [];
          for (let j = 0; j < card_info.length; j++) {
            application_deadlines.push(new Date((card_info[j].innerText).slice(48,58))); // get the application deadline
          }
          let sorted_application_deadlines = [...application_deadlines].sort(function(a,b) {
            return new Date(a) - new Date(b);
          });
          // ensure application_deadlines is sorted in increasing order
          cy.wrap(application_deadlines).should('eql',sorted_application_deadlines);
        });
      });

      it('failure for the previous application deadline test', () => {
        cy.visit("/");
        cy.get("[data-cy=sorting-button]").select('dateToSubmit').invoke("val").should("eq", "dateToSubmit");
        cy.wait(1000); // wait 1 second to ensure dateToSubmit has been selected and the cards have been reordered
        cy.get("[data-cy=card-info]").then(card_info => {
          let application_deadlines = [];
          for (let j = 0; j < card_info.length; j++) {
            application_deadlines.push(new Date((card_info[j].innerHTML).slice(49,59))); // get the application deadline
            application_deadlines.push(new Date()); // broken code!!!
          }
          let sorted_application_deadlines = [...application_deadlines].sort(function(a,b) {
            return new Date(a) - new Date(b);
          });
          // ensure application_deadlines is sorted in increasing order
          cy.wrap(application_deadlines).should('not.eql',sorted_application_deadlines); // not equal
        });
      });
});