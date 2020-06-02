/*
export function someMutation (state) {
}
*/

export function setCategoryType(state, information_category) {
  state.information_category = information_category
}

export function editCategoryTypeElement(state, information_category_element) {
  console.log("update the state")
  const index = state.information_category.findIndex(item => item.id === information_category_element.id);
  if (index !== -1) state.information_category.splice(index, 1, information_category_element);
}

export function saveCategoryTypeElement(state, information_category_element) {
  console.log("save to the state")
  console.log(information_category_element)

  state.information_category.push(information_category_element);
  console.log(state.information_category)
}

export function deleteInformationCategory(state, index) {
  const idx = state.information_category.findIndex(item => item.id === index);
  if (idx !== -1) state.information_category.splice(idx, 1);
}
/*export function delete_document_type (state, document_typeId) {
  let document_types = state.document_type.filter(d => d.id != document_typeId)
  state.document_type = document_types
}*/
