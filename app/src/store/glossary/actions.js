import client from 'api-glossary-client'

export function fetchGlossary (state, data) {
  return client
    .fetchGlossary()
    .then(glossary => state.commit('setGlossary', glossary))
}

export function saveNewGlossaryItem (state, data) {
  return client
    .saveNewGlossaryItem(data)
    .then(glossaryItem => state.commit('addNewGlossaryItem', glossaryItem))
}