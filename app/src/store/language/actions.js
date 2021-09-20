import client from 'api-language-client'

export function fetchLanguages(state) {
  return client
    .fetchLanguages()
    .then(languages => state.commit('setLanguages', languages))
}

export function setLanguageActive(state, payload) {
  return client
    .setLanguage(payload)
    .then(newLanguage => state.commit('setLanguageActive', payload))
}

export function setLanguageDefault(state, payload) {
  return client
    .setLanguageDefault(payload)
}
export function saveLanguage(state, payload) {
  return client
    .saveLanguage(payload)
    .then(newLanguage => state.commit('saveLanguage', payload))
}
export function updateLanguage(state, payload) {
  return client
    .updateLanguage(payload)
    .then(newLanguage => state.commit('updateLanguage', payload))
}