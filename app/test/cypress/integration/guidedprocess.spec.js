/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

describe("Guided processes", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it(".should() - add, edit and delete guided processes", () => {
    //cy.title().should("include", "Micado app")
    cy.dataCy('menu_process')
      .should('contain', 'Guided processes')
    // We present the feature
    cy.toast('The user wants to edit the guided processes', {
      duration: 4000,
      blocking: true
    })
    cy.dataCy('menu_process')
      .arrow({
        duration: 3000,
        blocking: true,
        pointAt: 'bottomRight', // or "bottomRight"
        offsetX: 0, // move the tip by X pixels
        offsetY: 0, // move the tip by Y pixels
        strokeWidth: 5, // SVG line width, pixels
        color: 'orange' // color name or hex string like "#ff00ff"
      })
    cy.dataCy('menu_process')
      .click()
    cy.dataCy("menu_button").click()
    cy.toast('Click on add process', {
      duration: 4000,
      blocking: true
    })
    cy.dataCy('addprocess')
      .should('contain', 'Add process')
    cy.dataCy('addprocess')
      .click()
    cy.toast('The user has to add the name and the description of the process', {
      duration: 4000,
      blocking: true
    })
    const typeOptions = {
      delay: 30
    }
    const title = "Get ID card"
    cy.dataCy('title_input')
      .type(title, typeOptions)
    const description1 = 'In order to get your id you will need to follow many steps. For more info click on the link below'
    const description2 = 'http://example.com'
    cy.dataCy('description_input')
      .type(description1 + "\n" + description2, typeOptions)
    cy.toast('Select the document produced by the process.', {
      duration: 4000,
      blocking: true
    })
    cy.get('[data-cy=add_produced_doc]').click();
    cy.contains("Driver license").click()
    cy.get('[data-cy=add_produced_doc]').click();
    cy.toast('Then, select the topic and user tags, Tags can be added by clicking on the field and then on the desired tag', {
      duration: 4000,
      blocking: true
    })

    cy.get('[data-cy=add_topic]').click();
    cy.contains("Education").click()
    cy.contains("House").click()
    cy.get('[data-cy=add_topic]').click();
    
    cy.get('[data-cy=add_user]').click();
    cy.contains("Atlas Customer").click()
    cy.contains("Refugee").click()
    cy.get('[data-cy=add_user]').click();


    cy.toast('Click save to add the process', {
      duration: 4000,
      blocking: true
    })
    cy.dataCy('saveprocessundefined').click()
    cy.wait(2000)
    cy.contains(title).scrollIntoView()
    cy.wait(3000)

  })
})



