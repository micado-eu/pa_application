import client from 'api-information_category-client'

/*
export function someAction (context) {
}
*/
export function fetchInformationCategory(state, data) {
  return client
    .fetchInformationCategory()
    .then(information_category => state.commit('setCategoryType', information_category))
}

export function editCategoryTypeElement(state, information_category_element) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(information_category_element)
  return client
    .updateInformationCategory(information_category_element)
    .then(information_category_return => state.commit('editCategoryTypeElement', information_category_return))
}

export function saveCategoryTypeElement(state, information_category_element) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(information_category_element)
  return client
    .saveInformationCategory(information_category_element)
    .then(information_category_return => state.commit('saveCategoryTypeElement', information_category_return))
}

export function deleteInformationCategory(state, information_category_element) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(information_category_element)
  return client
    .deleteInformationCategory(information_category_element)
    .then(information_category_return => state.commit('deleteInformationCategory', information_category_return))
}


/*export function deleteDocument({commit}, document_type) {

  commit(delete_document_type, document_type.id)
} */