/*
export function someMutation (state) {
}
*/

export function setIntervention(state, intervention) {
  state.intervention = intervention
}

export function editIntervention(state, intervention) {
  console.log("update the state")
  const index = state.intervention.findIndex(item => item.id === intervention.id);
  if (index !== -1) state.intervention.splice(index, 1, intervention);
}

export function saveIntervention(state, intervention) {
  console.log("save to the state")
  console.log(intervention)

  state.intervention.push(intervention);
  console.log(state.intervention)
}

export function deleteIntervention(state, index){
  const idx = state.intervention.findIndex(item => item.id === index);
  if (idx !== -1) state.intervention.splice(idx, 1);
}
/*export function delete_document_type (state, document_typeId) {
  let document_types = state.document_type.filter(d => d.id != document_typeId)
  state.document_type = document_types
}*/
