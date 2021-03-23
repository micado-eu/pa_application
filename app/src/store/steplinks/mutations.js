/*
export function someMutation (state) {
}
*/

export function setSteplinks (state, steplinks) {
  state.steplinks = steplinks
}

export function addStepLink (state, steplink) {
  state.steplinks.push(steplink)
}

export function changeSteplink (state, steplink) {
  //  state.graphs.elements.push(node)
  steplink.is_edited = true
  let editingIndex = state.steplinks.findIndex(entry => entry.id == steplink.id)
  console.log(editingIndex)
  state.steplinks.splice(editingIndex, 1, JSON.parse(JSON.stringify(steplink)))

}

export function deleteStepLink (state, id) {
  const deletingStepLink = state.steplinks.filter(step => { return step.id === id })[0];
  const index = state.steplinks.findIndex(item => item.id === id);

  if (deletingStepLink.is_new) {
    // since it is new I can delete without problem bacause it is not in the DB
    state.steplinks.splice(index, 1)

  } else {
    // since is not new I wil have to keep it to delete it from the DB
    deletingStepLink.to_delete = true
    state.steplinks.splice(index, 1, JSON.parse(JSON.stringify(deletingStepLink)))
  }
}


export function editSteps (state, steps) {
  console.log("update the state")
  const index = state.steps.findIndex(item => item.id === steps.id);
  if (index !== -1) state.steps.splice(index, 1, steps);
}

export function saveSteps (state, steps) {
  console.log("save to the state")
  console.log(steps)

  state.steps.push(steps);
  console.log(state.steps)
}

export function deleteSteps (state, index) {
  const idx = state.steps.findIndex(item => item.id === index);
  if (idx !== -1) state.steps.splice(idx, 1);
}
/*export function delete_document_type (state, document_typeId) {
  let document_types = state.document_type.filter(d => d.id != document_typeId)
  state.document_type = document_types
}*/
