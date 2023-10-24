it.only("idependently test the privacy policy page", () => {
  cy.visit("./src/privacy.html");
  cy.get("#title").should("contain", "TAT CSC - Privacy Policy");
  cy.get("#white-background p").should("have.length", 4);
});
