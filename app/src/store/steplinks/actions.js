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


/*export function deleteDocument({commit}, document_type) {

  commit(delete_document_type, document_type.id)
} */