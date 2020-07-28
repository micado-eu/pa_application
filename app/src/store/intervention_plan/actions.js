import client from 'api-intervention_plan-client'

/*
export function someAction (context) {
}
*/
export function fetchInterventionPlan(state, data) {
  return client
    .fetchInterventionPlan(data)
    .then(intervention_plan => {
      state.commit('setInterventionPlan', intervention_plan)
      return intervention_plan
    })
}

export function saveIntervention(state, payload) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log( payload.intervention)
  return client
    .saveIntervention(payload.plan.id,payload.intervention)
    .then(intervention_plan_return => state.commit('editInterventionPlan', payload.plan))
}
export function editIntervention(state, payload) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log( payload.intervention)
  return client
    .editIntervention(payload.plan.id,payload.intervention)
    .then(intervention_plan_return => state.commit('editInterventionPlan', payload.plan))
}

export function editInterventionPlan(state, intervention_plan) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(intervention_plan)
  return client
    .updateInterventionPlan(intervention_plan)
    .then(intervention_plan_return => state.commit('editInterventionPlan', intervention_plan_return))
}

export function saveInterventionPlan(state, intervention_plan) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(intervention_plan)
  return client
    .saveInterventionPlan(intervention_plan)
    .then(intervention_plan_return => state.commit('saveInterventionPlan', intervention_plan_return))
}

export function deleteInterventionPlan(state, intervention_plan) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(intervention_plan)
  return client
    .deleteInterventionPlan(intervention_plan)
    .then(intervention_plan_return => state.commit('deleteInterventionPlan', intervention_plan_return))
}


/*export function deleteDocument({commit}, document_type) {

  commit(delete_document_type, document_type.id)
} */