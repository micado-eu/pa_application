import client from 'api-documents-client'

/*
export function someAction (context) {
}
*/
export function fetchDocuments(state, id) {
  return client
    .fetchDocuments(id)
    .then(documents => {
      state.commit('setDocuments', documents)
      return documents
    })
}
export function fetchCompletionDocuments(state, id) {
  return client
    .fetchCompletionDocuments()
    .then(documents => {
      state.commit('setCompletionDocuments', documents)
      return documents
    })
}

export function fetchShareableDocuments(state, id) {
  return client
    .fetchShareableDocuments(id)
    .then(documents => {
      state.commit('setDocuments', documents)
      return documents
    })
}

