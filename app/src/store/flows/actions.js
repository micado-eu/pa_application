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
  let savingProcess = JSON.parse(JSON.stringify(process, ['link']));
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
          console.log(process.applicableUsers)
          console.log(user)
          await client.saveProcessUser(user, process_return.id)
        })
        console.log('Dopo il applicableUsers');

      }
      await saveUsers()

      const saveProcessDocs = async () => {
        await asyncForEach(process.producedDoc, async (doc) => {
          console.log("IL PROCESS ID È: " + process_return.id)
          console.log("this is produced docs")
          console.log(process.producedDoc)
          console.log(doc)
          await client.saveProcessProducedDocs(doc, process_return.id)
        })
        console.log('Dopo il produced docs');

      }
      await saveProcessDocs()

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
export function deleteProcess (state, payload) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  state.commit('deleteProcess', payload.process)

  console.log(payload)
  return client.deleteProcessUser(payload.process).then(async process_return => {
    console.log(process_return)
  client.deleteProcessTopic(payload.process).then(function (topic_return) {
      console.log(topic_return)
    })
    client.deleteProcessProducedDocs(payload.process).then(function (doc_return) {
      console.log(doc_return)
    })
    
    if(payload.comments == null){
      payload.comments=[]
    }
    const deleteProcessCommentTranslation = async () => {
      await asyncForEach(payload.comments, async (comment) => {
        console.log(comment)
        await client.deleteProcessCommentTranslation(comment.idcomment)
      })
      console.log("after foreach delete process comment translation")
    }
    await deleteProcessCommentTranslation()

    const deleteProcessComment = async () => {
      await asyncForEach(payload.comments, async (comment) => {
        console.log(comment)
        await client.deleteProcessComment(comment.idprocess)
        await client.deleteComments(comment.idcomment)
      })
      console.log("after foreach delete process comment")
    }
    await deleteProcessComment()

  const deleteStepLinksTranslation = async () => {
    await asyncForEach(payload.steplinks, async (steplink) => {
      console.log(steplink)
      await client.deleteProcessStepLinkTranslation(steplink.id)
    })
    console.log("after foreach delete steplinks translation")
  }
  await deleteStepLinksTranslation()
  

  const deleteStepLinks = async () => {
    await asyncForEach(payload.steplinks, async (steplink) => {
      console.log(steplink)
      await client.deleteProcessStepLink(steplink.id)
    })
    console.log("after foreach delete steplinks ")
  }
  await deleteStepLinks()

  const deleteStepDocuments = async () => {
    await asyncForEach(payload.steps, async (step) => {
      console.log(step)
      await client.deleteProcessStepDocument(step.id)
    })
    console.log("after foreach delete step document")
  }
  await deleteStepDocuments()

  const deleteProcessStepTranslation = async () => {
    await asyncForEach(payload.steps, async (step) => {
      console.log(step)
      await client.deleteProcessStepTranslation(step.id)
    })
    console.log("after foreach delete step translation")
  }
  await deleteProcessStepTranslation()

  const deleteProcessStep = async () => {
    await asyncForEach(payload.steps, async (step) => {
      console.log(step)
      await client.deleteProcessStep(step.id)
    })
    console.log("after foreach delete step ")
  }
  await deleteProcessStep()

  
  client.deleteProcessTranslations(payload.process)
  client.deleteProcess(payload.process).then(function () {
  })


 





  /*payload.steps.forEach((step) =>{
    if(step.idProcess == payload.process){
      payload.steplinks.forEach((steplink)=>{
        if(steplink.fromStep == step.id || steplink.toStep == step.id){
          
          client.deleteProcessStepLinkTranslation(steplink.id).then(function (process_return) {
            client.deleteProcessStepLink(steplink.id).then(function(link_return){
              client.deleteProcessStepDocument(step.id)
            })
          })
          
        }
      })
      client.deleteProcessStepTranslation(step.id).then(function(transl_return){
        client.deleteProcessStep(step.id)
      })
    }
  })
   client.deleteProcessTranslations(payload.process).then(function (translations_delete_return) {
    console.log("deleted the translations")
    console.log(translations_delete_return)

    client.deleteProcessUser(payload.process).then(function (process_return) {
      console.log(process_return)
      client.deleteProcessTopic(payload.process).then(function (topic_return) {
        console.log(topic_return)
      })
    })
    client.deleteProcess(payload.process).then(function () {
      state.commit('deleteProcess', payload.process)
    })*/
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

      client.deleteProcessUser(process.id).then(function (param) {
      client.deleteProcessTopic(process.id).then(function (param2) {
        client.deleteProcessProducedDocs(process.id).then(function (param3) {
        if (process.processTopics != null){
          process.processTopics.forEach((topic) => {
            console.log("in saving topic")
          console.log(topic)
          client.saveProcessTopic(topic, workingId)
        })
      }
        if (process.applicableUsers != null){
          process.applicableUsers.forEach((user) => {
            console.log("in saving user")
            client.saveProcessUser(user, workingId)
          }) 
        }
        if (process.producedDoc != null){
          process.producedDoc.forEach((doc) => {
            console.log("in saving produced doc")
            client.saveProcessProducedDocs(doc, workingId)
          })
        }
      })
     })
    })

    /* const deleteUser = async () =>{ 
      await client.deleteProcessUser(process.id)
      console.log("finished deleting users")
     }
      deleteUser()
     
     const deleteTopic = async () =>{
      await client.deleteProcessTopic(process.id)
      console.log("finished deleting topic")

     }
      deleteTopic()

     if (process.processTopics != null){
      process.processTopics.forEach((topic) => {
        console.log("in saving topic")
      console.log(topic)
      client.saveProcessTopic(topic, workingId)
    })}
    if (process.applicableUsers != null){
      process.applicableUsers.forEach((user) => {
        console.log("in saving user")
        client.saveProcessUser(user, workingId)
      })
    }*/
/*if (process.processTopics != null){
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
} */
state.commit('editProcess', process)
}

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
