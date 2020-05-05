import client from 'api-document_type-client'

/*
export function someAction (context) {
}
*/
export function fetchDocument_type (state, data) {
      return client
        .fetchDocument_type()
        .then(document_type => state.commit('setDocument_type', document_type))
    }

export function updateDoc({commit}, document_type) {
  
  commit('updateDoc', document_type.id)
} 