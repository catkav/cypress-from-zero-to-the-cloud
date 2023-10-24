beforeEach(() => {
  cy.visit("./src/index.html");
});

describe("TAT Customer Service Center", () => {
  it("checks the application title", () => {
    cy.title().should("eq", "TAT Customer Service Center");
  });

  it("fills in the required fields and submits the form", () => {
    cy.get("#firstName").type("Cat");
    cy.get("#lastName").type("Kavanagh");
    cy.get("#email").type("cat@example.com");
    cy.get("#open-text-area").type(
      "Great course so far! Very interesting and insightful, good explanations as well as practical exercises and links to useful documentation.",
      { delay: 0 }
    );
    cy.contains("button", "Send").click();
    cy.get(".success").should("be.visible");
  });

  it("displays an error message when submitting the form with an email with invalid formatting", () => {
    cy.get("#firstName").type("Cat");
    cy.get("#lastName").type("Kavanagh");
    cy.get("#email").type("iamcatkav");
    cy.get("#phone-checkbox").click();
    cy.get("#open-text-area").type("Great course so far!");
    cy.contains("button", "Send").click();
    cy.get(".error").should("be.visible");
  });

  it("displays an error message when the phone becomes required but is not filled in before the form submission", () => {
    cy.get("#firstName").type("Cat");
    cy.get("#lastName").type("Kavanagh");
    cy.get("#email").type("cat@example.com");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("Great course so far!");
    cy.contains("button", "Send").click();
    cy.get(".error").should("be.visible");
  });

  it("only accepts numeric values in phone field", () => {
    cy.get("#phone").type("abcdef");
    cy.get("#phone").should("have.value", "");
  });

  it("fills and clears the first name, last name, email and phone fields", () => {
    cy.get("#firstName").type("Cat");
    cy.get("#firstName").should("have.value", "Cat");
    cy.get("#firstName").clear();
    cy.get("#firstName").should("have.value", "");

    cy.get("#lastName").type("Kavanagh");
    cy.get("#lastName").should("have.value", "Kavanagh");
    cy.get("#lastName").clear();
    cy.get("#lastName").should("have.value", "");

    cy.get("#email").type("cat@example.com");
    cy.get("#email").should("have.value", "cat@example.com");
    cy.get("#email").clear();
    cy.get("#email").should("have.value", "");

    cy.get("#phone").type("000111222");
    cy.get("#phone").should("have.value", "000111222");
    cy.get("#phone").clear();
    cy.get("#phone").should("have.value", "");
  });

  it("displays an error message when submitting the form without the required fields", () => {
    cy.get('button[type="submit"]').click();
    cy.get(".error").should("be.visible");
  });

  it("successfully submits the form using a custom command", () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });

  it("selects a product (YouTube) by its content", () => {
    cy.get("select").select("YouTube");
    cy.get("select").should("have.value", "youtube");
  });

  it("selects a product (Mentorship) by its value", () => {
    cy.get("select").select("mentorship");
    cy.get("select").should("have.value", "mentorship");
  });

  it("selects a product (Blog) by its index", () => {
    cy.get("select").select(1);
    cy.get("select").should("have.value", "blog");
  });

  it("checks the type of service 'Feedback'", () => {
    cy.get('input[value="feedback"]').check();
    cy.get('input[value="feedback"]').should("be.checked");
  });

  it("checks each type of service", () => {
    cy.get("#support-type")
      .find('input[type="radio"]')
      .each((typeOfService) => {
        cy.wrap(typeOfService).check();
        cy.wrap(typeOfService).should("be.checked");
      });
  });

  it("checks both checkboxes, then unchecks the last one", () => {
    cy.get('#check input[type="checkbox"]').as("checkboxes").check();
    cy.get("@checkboxes").each((checkbox) => {
      cy.wrap(checkbox).should("be.checked");
    });

    cy.get('#check input[type="checkbox"]').last().uncheck();
    cy.get('#check input[type="checkbox"]').last().should("not.be.checked");
  });

  it("selects a file from the fixtures folder", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json")
      .should((input) =>
        expect(input[0].files[0].name).to.equal("example.json")
      );
  });

  it("selects a file simulating a drag-and-drop", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json", {
        action: "drag-drop",
      })
      .should((input) =>
        expect(input[0].files[0].name).to.equal("example.json")
      );
  });

  it("selects a file using a fixture to which an alias was given", () => {
    cy.fixture("example.json", { encoding: null }).as("exampleFixture");
    cy.get("#file-upload")
      .selectFile("@exampleFixture")
      .should((input) =>
        expect(input[0].files[0].name).to.equal("example.json")
      );
  });

  it("verifies that the privacy policy page opens in another tab wihout the need for a click", () => {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  it("access the privacy policy page by removing the target, then clicking on the link", () => {
    cy.get("#privacy a").invoke("removeAttr", "target");
    cy.get("#privacy a").click();
    cy.get("#title").should("contain", "TAT CSC - Privacy Policy");
  });
});
