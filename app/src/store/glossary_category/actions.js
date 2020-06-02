import client from 'api-glossary_category-client'

/*
export function someAction (context) {
}
*/
export function fetchGlossaryCategory(state, data) {
  return client
    .fetchGlossaryCategory()
    .then(glossary_category => state.commit('setCategoryType', glossary_category))
}

export function editCategoryTypeElement(state, glossary_category_element) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(glossary_category_element)
  return client
    .updateGlossaryCategory(glossary_category_element)
    .then(glossary_category_return => state.commit('editCategoryTypeElement', glossary_category_return))
}

export function saveCategoryTypeElement(state, glossary_category_element) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(glossary_category_element)
  return client
    .saveGlossaryCategory(glossary_category_element)
    .then(glossary_category_return => state.commit('saveCategoryTypeElement', glossary_category_return))
}

export function deleteGlossaryCategory(state, glossary_category_element) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(glossary_category_element)
  return client
    .deleteGlossaryCategory(glossary_category_element)
    .then(glossary_category_return => state.commit('deleteGlossaryCategory', glossary_category_return))
}


/*export function deleteDocument({commit}, document_type) {

  commit(delete_document_type, document_type.id)
} */