/*
export function someMutation (state) {
}
*/

export function setSteps(state, steps){
  state.steps = steps
}

export function editSteps(state, steps) {
  console.log("update the state")
  const index = state.steps.findIndex(item => item.id === steps.id);
  if (index !== -1) state.steps.splice(index, 1, steps);
}

export function saveSteps(state, steps) {
  console.log("save to the state")
  console.log(steps)

  state.steps.push(steps);
  console.log(state.steps)
}

export function deleteSteps(state, index){
  const idx = state.steps.findIndex(item => item.id === index);
  if (idx !== -1) state.steps.splice(idx, 1);
}
/*export function delete_document_type (state, document_typeId) {
  let document_types = state.document_type.filter(d => d.id != document_typeId)
  state.document_type = document_types
}*/
