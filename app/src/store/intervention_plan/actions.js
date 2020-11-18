import client from 'api-intervention_plan-client'

/*
export function someAction (context) {
}
*/
export function fetchInterventionPlan(state, id) {
  return client
    .fetchInterventionPlan(id)
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
export function deleteIntervention(state, payload){
  return client
    .deleteIntervention(payload.intervention_id)
    .then(intervention_plan_return => state.commit('deleteIntervention', {plan_id:payload.plan_id, intervention_id:payload.intevention_id}))
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


export function saveInterventionPlan (state, intervention_plan) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(intervention_plan)
  let savingPlan = JSON.parse(JSON.stringify(intervention_plan, ['title', 'creationDate', 'endDate', 'caseManager', 'userId', 'userTenant', 'completed']));
  console.log(savingPlan)

  return client
    .saveInterventionPlan(savingPlan)
    .then(async plan_return => {
      console.log("SAVED")
      console.log("returned from saving intervention_plan")
      console.log(plan_return)
      const saveIntervent = async () => {
        await asyncForEach(intervention_plan.interventions, async (intervent) => {
          intervent.listId = plan_return.id
          console.log(intervent)
          await client.saveIntervention(plan_return.id,intervent ).then(intervent_return =>{
            intervent.id = intervent_return.id
          })
        })
        console.log("after foreach save intervent")
      }
      await saveIntervent()
      // here we need only to add the ID to the topic element since there are the tranlsations that in the topic_return are not present

      
      console.log("after foreach save users this is the intervention plan")
      console.log(intervention_plan)
      intervention_plan.id = plan_return.id
     
      state.commit('saveInterventionPlan', intervention_plan)
    })
}

export function deleteInterventionPlan(state, plan_id) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  var promise_intervention = []
  var promise_plan = []
  promise_intervention.push(client.deleteInterventionByPlan(plan_id))
  Promise.all(promise_intervention).then(intervention_plan_return => {
    promise_plan.push(client.deleteInterventionPlan(plan_id))
    Promise.all(promise_plan).then(() =>{
      state.commit('deleteInterventionPlan', plan_id)})

    })
}

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
/*export function deleteDocument({commit}, document_type) {

  commit(delete_document_type, document_type.id)
} */