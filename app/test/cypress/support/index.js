/// <reference types="cypress" />

import './commands'
//import 'cypress-movie/commands'
import './clear-viewport'
import './toast'
import './arrow'

import { slowDownCommands } from './slow-down'
import { cursorTrackingCommands } from './cursor-tracking'

// use Cypress._.get to safely get nested property
const cursorEnabled = Cypress._.get(Cypress.env(), 'cypress-movie.cursorTracking.enabled')
if (cursorEnabled) {
  cursorTrackingCommands()
} else {
  slowDownCommands()
}

before(() => {
  if (Cypress.browser.isHeadless) {
    cy.clearViewport()
  }
})
