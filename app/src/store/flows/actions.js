import client from 'api-flows-client'
/*
export function someAction (context) {
}
*/
export function fetchFlows (state, data) {
  return client
    .fetchFlows()
    .then(flows => state.commit('setFlows', flows))
}

export function fetchDocuments (state, data) {
  return client
    .fetchDocuments()
    .then(flows => state.commit('setDocuments', flows))
}

export function editProcess (state, process) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(process)
  return client
    .updateProcess(process)
    .then(process_return => state.commit('editProcess', process_return))
}

export function saveProcess (state, process) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(process)
  let savingProcess = JSON.parse(JSON.stringify(process, ['link', 'published']));
  console.log(savingProcess)

  return client
    .saveProcess(savingProcess)
    .then(process_return => {
      console.log("SAVED")
      console.log("returned from saving process")
      console.log(process_return)
      process.translations.forEach(function (transl) {
        client.saveProcessTranslation(transl, process_return.id)
      }, process_return.id)
      // here we need only to add the ID to the topic element since there are the tranlsations that in the topic_return are not present
      console.log("after foreach save translation")
      process.id = process_return.id
      // now we need to set the id for all translations
      for (var i = 0; i < process.translations.length; i++) {
        process.translations[i].id = process_return.id
      }
      state.commit('saveProcess', process)
    })
}
