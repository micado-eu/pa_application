import client from 'api-integration_category-client'

/*
export function someAction (context) {
}
*/
export function fetchIntegrationCategory (state, data) {
      return client
        .fetchIntegrationCategory()
        .then(integration_category => state.commit('setCategoryType', integration_category))
    }

/*export function deleteDocument({commit}, document_type) {
  
  commit(delete_document_type, document_type.id)
} */