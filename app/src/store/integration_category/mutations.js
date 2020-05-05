/*
export function someMutation (state) {
}
*/

export function setCategoryType(state, integration_category) {
  state.integration_category = integration_category
}

export function editCategoryTypeElement(state, integration_category_element) {
  const index = state.integration_category.findIndex(item => item.id === integration_category_element.id);
  if (index !== -1) state.integration_category.splice(index, 1, integration_category_element);
}

export function deleteIntegrationCategory(state, index){
  const idx = state.integration_category.findIndex(item => item.id === index);
  if (idx !== -1) state.integration_category.splice(idx, 1);
}
/*export function delete_document_type (state, document_typeId) {
  let document_types = state.document_type.filter(d => d.id != document_typeId)
  state.document_type = document_types
}*/
