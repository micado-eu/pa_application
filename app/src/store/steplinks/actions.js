import client from 'api-steplinks-client'

/*
export function someAction (context) {
}
*/
export function fetchSteplinks (state, data) {
  return client
    .fetchSteplinks()
    .then(steplinks => {
      state.commit('setSteplinks', steplinks)
      return steplinks
    })
}

export function fetchSteplinksByProcessId (state, id) {
  return client
    .fetchSteplinksByProcessId(id)
    .then(steplinks => {
      state.commit('setSteplinks', steplinks)
      return steplinks
    })
}

export function addStepLink (state, steplink) {
  state.commit('addStepLink', steplink)
  return 1
}

export function changeSteplink (state, payload) {
  state.commit('changeSteplink', payload)
  return
}


export function deleteStepLink (state, payload) {
  state.commit('deleteStepLink', payload)
  return
}

export function addSteps (state, data) {
  return client
    .fetchSteps()
    .then(steps => state.commit('setSteps', steps))
}

export function editSteps (state, steps) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(steps)
  return client
    .updateSteps(steps)
    .then(steps_return => state.commit('editSteps', steps_return))
}

export function saveSteps (state, steps) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(steps)
  return client
    .saveSteps(steps)
    .then(steps_return => state.commit('saveSteps', steps_return))
}

export function deleteSteps (state, steps) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(steps)
  return client
    .deleteSteps(steps)
    .then(steps_return => state.commit('deleteSteps', steps_return))
}

export function updateSteplinkTranslation(state, payload){
  return client.updateSteplinkTranslation(payload, payload.id)
}

export function saveTranslationProd(state, steplinks){
  steplinks.forEach((steplink)=>{
    console.log("deleting translation with id:" + steplink.id)
    client.saveSteplinkTranslationProd(steplink.id)
  })
}

export function deleteTranslationProd(state, steplinks){
  console.log("in delete transl prod")
  steplinks.forEach((steplink)=>{
    client.deleteSteplinkTranslationProd(steplink.id)
  })
}


/*export function deleteDocument({commit}, document_type) {

  commit(delete_document_type, document_type.id)
} */