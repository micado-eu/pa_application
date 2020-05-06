import client from 'api-integration_type-client'

/*
export function someAction (context) {
}
*/
export function fetchIntegrationType(state, data) {
  return client
    .fetchIntegrationType()
    .then(integration_type => state.commit('setIntegrationType', integration_type))
}

export function editIntegrationTypeElement(state, integration_type_element) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(integration_type_element)
  return client
    .updateIntegrationType(integration_type_element)
    .then(integration_type_return => state.commit('editIntegrationTypeElement', integration_type_return))
}

export function saveIntegrationTypeElement(state, integration_type_element) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(integration_type_element)
  return client
    .saveIntegrationType(integration_type_element)
    .then(integration_type_return => state.commit('saveIntegrationTypeElement', integration_type_return))
}

export function deleteIntegrationTypeElement(state, integration_type_element) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(integration_type_element)
  return client
    .deleteIntegrationType(integration_type_element)
    .then(integration_type_return => state.commit('deleteIntegrationTypeElement', integration_type_return))
}


/*export function deleteDocument({commit}, document_type) {

  commit(delete_document_type, document_type.id)
} */