/// <reference path="cypress" />
/// <reference path="../support/index.d.ts" />

describe("Events", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it(".should() - add, edit and delete events", () => {
    cy.title().should("include", "Micado app")
    cy.dataCy('menu_events')
      .should('contain', 'Events')
    // We present the feature
    cy.toast('The user wants to edit the events', {
      duration: 4000,
      blocking: true
    })
    cy.dataCy('menu_events')
      .arrow({
        duration: 3000,
        blocking: true,
        pointAt: 'bottomRight', // or "bottomRight"
        offsetX: 0, // move the tip by X pixels
        offsetY: 0, // move the tip by Y pixels
        strokeWidth: 5, // SVG line width, pixels
        color: 'orange' // color name or hex string like "#ff00ff"
      })
    cy.dataCy('menu_events')
      .click()
    cy.dataCy("menu_button").click()
    cy.toast('Click on add event', {
      duration: 4000,
      blocking: true
    })
    cy.dataCy('add_element')
      .should('contain', 'Add Event')
    cy.dataCy('add_element')
      .click()
    cy.toast('The user has to add the title and the description of the event', {
      duration: 4000,
      blocking: true
    })
    const typeOptions = {
      delay: 30
    }
    const title = "English course"
    cy.dataCy('title_input')
      .type(title, typeOptions)
    const description1 = 'Click on the link and enter your info to join the english course.'
    const description2 = 'http://example.com'
    cy.dataCy('description_input')
      .type(description1 + "\n" + description2, typeOptions)
    cy.toast('Tags can be added by writing the tag and clicking on Add tag', {
      duration: 4000,
      blocking: true
    })
    cy.dataCy("add_tag_input").type("courses", typeOptions)
    cy.dataCy("add_tag_button").click()
    cy.dataCy("add_tag_input").type("events", typeOptions)
    cy.dataCy("add_tag_button").click()
    cy.dataCy("tag_list").contains("courses").should("be.visible")
    cy.dataCy("tag_list").contains("events").should("be.visible")
    cy.toast('Select categories, topics and user types.', {
      duration: 4000,
      blocking: true
    })
    cy.dataCy("category_select").click()
    cy.get(".q-item").contains("course").click()
    cy.dataCy("topic_select").click()
    cy.get(".q-item").contains("Education").click()
    cy.dataCy("topic_select").click()
    cy.get(".q-item").contains("Cultural").click()
    cy.dataCy("topic_list").contains("Education").should("be.visible")
    cy.dataCy("topic_list").contains("Cultural").should("be.visible")
    cy.dataCy("user_types_select").click()
    cy.get(".q-item").contains("Refugee").click()
    cy.dataCy("user_types_select").click()
    cy.get(".q-item").contains("Asylum Seeker").click()
    cy.dataCy("user_types_list").contains("Refugee").should("be.visible")
    cy.dataCy("user_types_list").contains("Asylum Seeker").should("be.visible")
    cy.toast('Select the start and end date', {
      duration: 4000,
      blocking: true
    })

    cy.dataCy("start_date_icon").click()
    cy.get(".q-date__calendar-item .q-btn").contains("10").click()
    cy.dataCy("close_date_menu").click()

    cy.dataCy("start_time_icon").click()
    cy.get(".q-time__clock-position").contains("13").click()
    cy.get(".q-time__clock-position").contains("30").click()
    cy.dataCy("close_date_menu").click()

    cy.dataCy("end_date_icon").click()
    cy.get(".q-date__calendar-item .q-btn").contains("20").click()
    cy.dataCy("close_date_menu").click()

    cy.dataCy("end_time_icon").click()
    cy.get(".q-time__clock-position").contains("13").click()
    cy.get(".q-time__clock-position").contains("30").click()
    cy.dataCy("close_date_menu").click()

    cy.toast('Click save to add the information', {
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
        cy.log("id: " + id)
        cy.get('[id="' + id + '"] .viewer')
          .should("contain", description1)
        cy.get('[id="' + id + '"] .viewer')
          .should("contain", description2)
        cy.toast('The new event has been added', {
          duration: 4000,
          blocking: true
        })
        cy.toast('The user wants to edit the event. Mousing over the event shows the edit and delete options.', {
          duration: 4000,
          blocking: true
        })
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
        cy.toast('The user wants to delete the event. Mousing over the event shows the edit and delete options.', {
          duration: 4000,
          blocking: true
        })
        cy.get('[id="' + id + '"').trigger("mouseover")
        cy.dataCy('delete_button' + id)
          .click()
      })
  })
})
