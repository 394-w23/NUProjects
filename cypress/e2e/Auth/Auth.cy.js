import { signInCy } from "../../../src/utilities/firebase";

describe("Test Auth", () => {
    it("signs out", () => {
        cy.visit("/");
        cy.get("[id=collapsible-nav-dropdown]").click();
        cy.get("[data-cy=sign-out]").click();
        cy.get("[data-cy=sign-in]").should("contain", "Sign in");
    });

    it("signs in", () => {
        // cy.get("[id=collapsible-nav-dropdown]").click();
        cy.visit("/login");
        cy.get("[id=collapsible-nav-dropdown]").click();
        cy.get("[data-cy=sign-out]").click();
        cy.get ("[data-cy=sign-in]").should("contain", "Sign in");
        // cy.get("[data-cy=sign-in]").click();
        // sign in should have disappeared
        //execute function signInCy() from firebase.js
        cy.signIn();
        cy.get("[data-cy=sign-in]").should("not.exist");

        //sign in link doesn't exist 
    });

});
        