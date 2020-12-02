import client from 'api-glossary-client'

export function fetchGlossary(state, data) {
  return client
    .fetchGlossary()
    .then((glossary) => state.commit('setGlossary', glossary))
}

export function saveNewGlossaryItem(state, data) {
  return client
    .saveNewGlossaryItem(data)
    .then((newData) => newData)
}

export function editGlossaryItem(state, data) {
  return client
    .editGlossaryItem(data)
}

export function editGlossaryItemTranslation(state, data) {
  data.translationState = 0
  return client
    .editGlossaryItemTranslation(data)
}

export function addNewGlossaryItemTranslation(state, data) {
  data.translationState = 0
  return client
    .addNewGlossaryItemTranslation(data)
}

export function deleteGlossaryItem(state, data) {
  return client
    .deleteGlossaryItem(data)
}

export function updatePublished(state, data) {
  return client
    .updatePublished(data.id, data.published)
    .then(() => {
      state.commit("updatePublished", data)
    })
}