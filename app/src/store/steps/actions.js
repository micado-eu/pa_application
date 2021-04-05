import client from 'api-steps-client'

/*
export function someAction (context) {
}
*/
export function fetchSteps (state, data) {
  return client
    .fetchSteps()
    .then(steps => {
      state.commit('setSteps', steps)
      return steps
    })
}

export function fetchStepsByProcessId (state, id) {
  return client
    .fetchStepsByProcessId(id)
    .then(steps => {
      state.commit('setSteps', steps)
      return steps
    })
}

export function addStep (state, step) {
  state.commit('addNode', step)
  return 1
}

export function changeStep (state, payload) {
  state.commit('changeStep', payload)
  return
}


export function deleteStep (state, payload) {
  state.commit('deleteStep', payload)
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

export function saveStep (state, step) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(step)
  let savingStep = JSON.parse(JSON.stringify(step, ['id', 'cost', 'locationSpecific', 'location', 'locationLon', 'locationLat', 'idProcess']));

  console.log("before calling save step api")

  return client
    .saveStep(savingStep)
    .then(steps_return => {
      //    state.commit('saveSteps', steps_return)
    })

}

export function deleteSteps (state, steps) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(steps)
  return client
    .deleteSteps(steps)
    .then(steps_return => state.commit('deleteSteps', steps_return))
}

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
export function saveTranslationProd(state, steps){
  var promise_delete = []
  steps.forEach((step)=>{
    console.log("deleting translation with id:" + step.id)
    promise_delete.push(client.deleteStepTranslationProd(step.id))
  })
  Promise.all(promise_delete).then(()=>{
    steps.forEach((step)=>{
      console.log("after deleting translation, saving new ones")
      client.saveStepTranslationProd(step.id)
    })
  })
}

export function deleteTranslationProd(state, steps){
  console.log("in delete transl prod")
  steps.forEach((step)=>{
    client.deleteStepTranslationProd(step.id)
  })
  
}
export function updateStepTranslation(state, payload){
  return client.updateStepTranslation(payload, payload.id)
}

export function fetchStepIcons (state, data) {
  return client
    .fetchStepIcons()
    .then(step_icons => {
      state.commit('setStepIcons', step_icons)
      return step_icons
    })
}
/*export function deleteDocument({commit}, document_type) {

  commit(delete_document_type, document_type.id)
} */