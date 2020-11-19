/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

describe("Glossary", () => {
  beforeEach(() => {
    cy.visit("/glossary")
  })
  it(".should() - show mention", () => {
    cy.title().should("include", "Micado app")
    cy.dataCy('menu_glossary')
      .should('contain', 'Glossary')
    const title = "Residence permit"
    cy.get('.title-label')
      .contains(title)
      .then(($title) => {
        return $title.parent().parent()
      }).then(($item) => {
        const id = $item.attr("id")
        const description = "An Identity Card is usually needed for acquiring a Residence permit"
        cy.get('.viewer')
          .contains(description)
          .get('.q-item[id="' + id + '"] span[data-mention-id="56"]')
          .scrollIntoView().then(() => {
            cy.get('.viewer')
              .contains(description)
              .get('.q-item[id="' + id + '"] span[data-mention-id="56"]')
              .should('contain', 'Identity Card')
            cy.get('.viewer')
              .contains(description)
              .get('.q-item[id="' + id + '"] span[data-mention-id="56"]')
              .invoke('triggerHandler', 'mouseenter')
            const referenceDescription = "An identity document (also called a piece of identification or ID, or colloquially as papers) is any document that may be used to prove a person's identity"
            cy.get('.q-tooltip').should('contain', referenceDescription)
            cy.wait(2000)
            cy.get('.viewer')
              .contains(description)
              .get('.q-item[id="' + id + '"] span[data-mention-id="56"]')
              .invoke('trigger', 'mouseleave')
            cy.wait(2000)
          })
      })
  })
})
