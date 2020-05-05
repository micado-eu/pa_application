import client from 'api-integration_category-client'

/*
export function someAction (context) {
}
*/
export function fetchIntegrationCategory(state, data) {
  return client
    .fetchIntegrationCategory()
    .then(integration_category => state.commit('setCategoryType', integration_category))
}

export function editCategoryTypeElement(state, integration_category_element) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(integration_category_element)
  return client
    .updateIntegrationCategory(integration_category_element)
    .then(integration_category_return => state.commit('editCategoryTypeElement', integration_category_return))
}

export function saveCategoryTypeElement(state, integration_category_element) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(integration_category_element)
  return client
    .saveIntegrationCategory(integration_category_element)
    .then(integration_category_return => state.commit('saveCategoryTypeElement', integration_category_return))
}


/*export function deleteDocument({commit}, document_type) {

  commit(delete_document_type, document_type.id)
} */