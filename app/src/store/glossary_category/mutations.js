/*
export function someMutation (state) {
}
*/

export function setCategoryType(state, glossary_category) {
  state.glossary_category = glossary_category
}

export function editCategoryTypeElement(state, glossary_category_element) {
  console.log("update the state")
  const index = state.glossary_category.findIndex(item => item.id === glossary_category_element.id);
  if (index !== -1) state.glossary_category.splice(index, 1, glossary_category_element);
}

export function saveCategoryTypeElement(state, glossary_category_element) {
  console.log("save to the state")
  console.log(glossary_category_element)

  state.glossary_category.push(glossary_category_element);
  console.log(state.glossary_category)
}

export function deleteGlossaryCategory(state, index) {
  const idx = state.glossary_category.findIndex(item => item.id === index);
  if (idx !== -1) state.glossary_category.splice(idx, 1);
}
/*export function delete_document_type (state, document_typeId) {
  let document_types = state.document_type.filter(d => d.id != document_typeId)
  state.document_type = document_types
}*/
