/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

describe("Glossary", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it(".should() - add, edit and delete terms", () => {
    cy.title().should("include", "Micado app")
    cy.dataCy('menu_glossary')
      .should('contain', 'Glossary')
    // We present the feature
    cy.toast('The user wants to edit the glossary', {
      duration: 4000,
      blocking: true
    })
    cy.dataCy('menu_glossary')
      .arrow({
        duration: 3000,
        blocking: true,
        pointAt: 'bottomRight', // or "bottomRight"
        offsetX: 0, // move the tip by X pixels
        offsetY: 0, // move the tip by Y pixels
        strokeWidth: 5, // SVG line width, pixels
        color: 'orange' // color name or hex string like "#ff00ff"
      })
    cy.dataCy('menu_glossary')
      .click()
    cy.dataCy("menu_button").click()
    cy.toast('Click on add term', {
      duration: 4000,
      blocking: true
    })
    cy.dataCy('add_element')
      .should('contain', 'Add Term')
    cy.dataCy('add_element')
      .click()
    cy.toast('The user has to add the title and the description of the term', {
      duration: 4000,
      blocking: true
    })
    const typeOptions = {
      delay: 30
    }
    const title = "House"
    cy.dataCy('title_input')
      .type(title, typeOptions)
    const description1 = 'A house is a single-unit residential building.'
    const description2 = 'A residence permit is necessary to own a house.'
    cy.dataCy('description_input')
      .type(description1 + "\n" + description2, typeOptions)
    cy.toast('Click save to add the term', {
      duration: 4000,
      blocking: true
    })
    cy.dataCy('save_button')
      .click()
    cy.get('.title-label')
      .contains(title)
      .then(($title) => {
        return $title.parent().parent()
      }).then(($item) => {
        const id = $item.attr("id")
        cy.get('[id="' + id + '"] .viewer')
          .should("contain", description1)
        cy.get('[id="' + id + '"] .viewer')
          .should("contain", description2)
        cy.toast('The new term has been added', {
          duration: 4000,
          blocking: true
        })
        // cy.toast('A reference to another term has been detected and marked. mousing over it shows a tooltip with its description.', {
        //   duration: 4000,
        //   blocking: true
        // })
        // cy.get('.viewer')
        //   .contains(description2)
        //   .get('.q-item[id="' + id + '"] span[data-mention-id="57"]')
        //   .should('contain', 'residence permit')
        // cy.get('.q-item[id="' + id + '"] span[data-mention-id="57"]').trigger("mouseenter")
        // const referenceDescription = "A residence permit (less commonly residency permit) is a document or card required in some regions, allowing a foreign national to reside in a country for a fixed or indefinite length of time."
        // cy.get('.q-tooltip').should('contain', referenceDescription)
        // cy.wait(4000)
        // cy.get('.q-item[id="' + id + '"] span[data-mention-id="57"]').trigger("mouseleave")
        // cy.toast('The user wants to edit the term. Mousing over the term shows the edit and delete options.', {
        //   duration: 4000,
        //   blocking: true
        // })
        cy.get('[id="' + id + '"').trigger("mouseover")
        cy.dataCy('edit_button' + id)
          .click()
        cy.toast('The user can add or review a translation by choosing the language.', {
          duration: 4000,
          blocking: true
        })
        cy.get(".q-tab").contains("español").click()
        cy.dataCy('title_input')
          .type("Casa", typeOptions)
        cy.dataCy('description_input')
          .type('Una casa es un edificio residencial de una sola unidad.\nUn permiso de residencia es necesario para tener una casa.', typeOptions)
        cy.toast('Click save to add the translation', {
          duration: 4000,
          blocking: true
        })
        cy.dataCy('save_button')
          .click()
        cy.toast('The user wants to delete the term. Mousing over the term shows the edit and delete options.', {
          duration: 4000,
          blocking: true
        })
        cy.get('[id="' + id + '"').trigger("mouseover")
        cy.dataCy('delete_button' + id)
          .click()
      })
  })
})
