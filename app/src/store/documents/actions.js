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
