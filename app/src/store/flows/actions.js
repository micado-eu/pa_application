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


export function saveProcess (state, process) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(process)
  let savingProcess = JSON.parse(JSON.stringify(process, ['link', 'published']));
  console.log(savingProcess)

  return client
    .saveProcess(savingProcess)
    .then(async process_return => {
      console.log("SAVED")
      console.log("returned from saving process")
      console.log(process_return)
      process.translations.forEach(function (transl) {
        client.saveProcessTranslation(transl, process_return.id)
      }, process_return.id)
      // here we need only to add the ID to the topic element since there are the tranlsations that in the topic_return are not present
      console.log("after foreach save translation")

      const saveTopics = async () => {
        await asyncForEach(process.processTopics, async (topic) => {
          console.log(topic)
          await client.saveProcessTopic(topic, process_return.id)
        })
        console.log("after foreach save topics")
      }
      await saveTopics()

      const saveUsers = async () => {
        await asyncForEach(process.applicableUsers, async (user) => {
          console.log("IL PROCESS ID È: " + process_return.id)
          await client.saveProcessUser(user, process_return.id)
        })
        console.log('Dopo il applicableUsers');

      }
      await saveUsers()

      /*
      
             process.applicableUsers.asyncForEach(function (user) {
              client.saveProcessUser(user.value, process_return.id)
            }, process_return.id)
            */
      console.log("after foreach save users")

      process.id = process_return.id
      // now we need to set the id for all translations
      for (var i = 0; i < process.translations.length; i++) {
        process.translations[i].id = process_return.id
      }
      state.commit('saveProcess', process)
    })
}
export function deleteProcess (state, index) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(index)
  return client.deleteProcessTranslations(index).then(function (translations_delete_return) {
    console.log("deleted the translations")
    console.log(translations_delete_return)

    client.deleteProcessUser(index).then(function (process_return) {
      console.log(process_return)
      client.deleteProcessTopic(index).then(function (topic_return) {
        console.log(topic_return)
      })
    })
    client.deleteProcess(index).then(function () {
      state.commit('deleteProcess', index)
    })
  })
  /*
  return client
    .deleteTopic(topic_element)
    .then(topic_return => state.commit('deleteTopic', topic_return))
    */
}
export function editProcess (state, process) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(process)
  var workingId = process.id 
  console.log("i am working id")
  console.log(workingId)
  // update translations
  client
    .updateProcess(process).then(function (update_return) {
      // cycle in the translations and update each
      console.log(update_return)
      process.translations.forEach(function (aTranslation) {
        client.updateProcessTranslation(aTranslation).then(function (update_translation_return) {
          console.log(update_translation_return)
        })
   })
     })
if (process.processTopics != null){
  console.log("new")
  console.log(process.processTopics)
  console.log("original")

  console.log(process.processTopicsOrig)
  process.processTopics.forEach((topic) => {
    if(process.processTopicsOrig.includes(topic)){
      console.log("doing nothing")
    }
    else{
      console.log("in saving topic")
      console.log(topic)
      client.saveProcessTopic(topic, workingId)
    }
  })
}
if(process.processTopics == null){
  process.processTopicsOrig.forEach((starting_topic) => {
    client.deleteSingleProcessTopic(workingId, starting_topic)
  })
}
else if (process.processTopicsOrig != null){
  process.processTopicsOrig.forEach((starting_topic) => {
  if(!process.processTopics.includes(starting_topic)){
    console.log("in deleting topic")
    client.deleteSingleProcessTopic(workingId, starting_topic)
  }
  })
}



if (process.applicableUsers != null){
  process.applicableUsers.forEach((user) => {
    if(process.applicableUsersOrig.includes(user)){
      console.log("doing nothing")
    }
    else{
      console.log("in saving user")
      client.saveProcessUser(user, workingId)
    }
  })
}
if(process.applicableUsers == null){
  process.applicableUsersOrig.forEach((starting_user) => {
    client.deleteSingleProcessUser(workingId, starting_user)  })
}
else if (process.applicableUsersOrig != null){
  process.applicableUsersOrig.forEach((starting_user) => {
  if(!process.applicableUsers.includes(starting_user)){
    console.log("in deleting user")
    client.deleteSingleProcessUser(workingId, starting_user)
  }
  })
}
state.commit('editProcess', process)
}

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
