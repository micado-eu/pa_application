/*
export function someMutation (state) {
}
*/

export function setInterventionPlan(state, intervention_plan) {
  state.intervention_plan = intervention_plan
}

export function editInterventionPlan(state, intervention_plan) {
  console.log("update the state")
  const index = state.intervention_plan.findIndex(item => item.id === intervention_plan.id);
  if (index !== -1) state.intervention_plan.splice(index, 1, intervention_plan);
}
export function deleteIntervention(state, payload){
  const index = state.intervention_plan.findIndex(item => item.id === payload.plan_id);
  if (index !== -1){
    console.log("inside if")
    console.log(state.intervention_plan[index])
    console.log( state.intervention_plan[index].interventions)
    console.log(payload.intervention_id)
    const intervention_index = state.intervention_plan[index].interventions.findIndex(item => item.id === payload.intervention_id);
    console.log(intervention_index)
    if (intervention_index !== -1) state.intervention_plan[index].interventions.splice(intervention_index, 1);
    console.log(state.intervention_plan[index])

  }
}

export function saveInterventionPlan(state, intervention_plan) {
  console.log("save to the state")
  console.log(intervention_plan)

  state.intervention_plan.push(intervention_plan);
  console.log(state.intervention_plan)
}

export function deleteInterventionPlan(state, index){
  const idx = state.intervention_plan.findIndex(item => item.id === index);
  if (idx !== -1) state.intervention_plan.splice(idx, 1);
}
/*export function delete_document_type (state, document_typeId) {
  let document_types = state.document_type.filter(d => d.id != document_typeId)
  state.document_type = document_types
}*/
