import client from 'api-glossary-client'

export function fetchGlossary(state, data) {
  return client
    .fetchGlossary()
    .then((glossary) => state.commit('setGlossary', glossary))
}

export function fetchGlossaryProd(state, data) {
  return client
    .fetchGlossaryProd(data.defaultLang, data.userLang)
    .then((glossary) => state.commit('setGlossaryProd', glossary))
}

export function fetchGlossaryTemp(state, data) {
  return client
    .fetchGlossaryTemp(data.defaultLang, data.userLang)
    .then((glossary) => state.commit('setGlossaryTemp', glossary))
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
  return client
    .editGlossaryItemTranslation(data)
}

export function addNewGlossaryItemTranslation(state, data) {
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

export function deleteProdTranslations(state, id) {
  return client.deleteProdTranslations(id)
}

export function addNewGlossaryItemTranslationProd(state, data) {
  return client
    .addNewGlossaryItemTranslationProd(data)
}