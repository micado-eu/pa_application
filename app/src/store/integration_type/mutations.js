/*
export function someMutation (state) {
}
*/

export function setIntegrationType(state, integration_type) {
  state.integration_type = integration_type
}

export function editIntegrationTypeElement(state, integration_type_element) {
  console.log("update the state")
  const index = state.integration_type.findIndex(item => item.id === integration_type_element.id);
  if (index !== -1) state.integration_type.splice(index, 1, integration_type_element);
}

export function saveIntegrationTypeElement(state, integration_type_element) {
  console.log("save to the state")
  console.log(integration_type_element)

  state.integration_type.push(integration_type_element);
  console.log(state.integration_type)
}

export function deleteIntegrationTypeElement(state, index){
  const idx = state.integration_type.findIndex(item => item.id === index);
  if (idx !== -1) state.integration_type.splice(idx, 1);
}
/*export function delete_document_type (state, document_typeId) {
  let document_types = state.document_type.filter(d => d.id != document_typeId)
  state.document_type = document_types
}*/
