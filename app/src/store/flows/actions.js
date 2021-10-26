import client from 'api-flows-client'
/*
export function someAction (context) {
}
*/
export function fetchFlows (state, data) {
  return client
    .fetchFlows()
    .then(flows => {
      state.commit('setFlows', flows)
      return flows
    })
}

export function fetchFlowsProd (state, data) {
  return client
    .fetchFlowsProd(data.defaultLang, data.userLang)
    .then(flows => {
      state.commit('setFlowsProd', flows)
      return flows
    })
}

export function fetchFlowsTemp (state, data) {
  return client
    .fetchFlowsTemp(data.defaultLang, data.userLang)
    .then(flows => {
      state.commit('setFlowsTemp', flows)
      return flows
    })
}

export function fetchFlowsDocs (state, data) {
  return client
    .fetchProcessProducedDocuments()
    .then(flows => {
      state.commit('setFlowsDocs', flows)
      return flows
    })
}

export function fetchDocuments (state, data) {
  return client
    .fetchDocuments()
    .then(flows => state.commit('setDocuments', flows))
}


export function saveProcess (state, payload) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(payload.process)
  let savingProcess = JSON.parse(JSON.stringify(payload.process, ['link']))
  console.log(savingProcess)

  return client
    .saveProcess(savingProcess)
    .then(async process_return => {
      console.log("SAVED")
      console.log("returned from saving process")
      console.log(process_return)
      for (var i = 0; i < payload.process.translations.length; i++) {
        payload.process.translations[i].id = process_return.id
      }
      payload.process.translations.forEach(function (transl) {
        client.saveProcessTranslation(transl, process_return.id)
      }, process_return.id)
      // here we need only to add the ID to the topic element since there are the tranlsations that in the topic_return are not present
      console.log("after foreach save translation")

      const saveTopics = async () => {
        await asyncForEach(payload.process.processTopics, async (topic) => {
          console.log(topic)
          await client.saveProcessTopic(topic, process_return.id)
        })
        console.log("after foreach save topics")
      }
      await saveTopics()

      const saveUsers = async () => {
        await asyncForEach(payload.process.applicableUsers, async (user) => {
          console.log("IL PROCESS ID È: " + process_return.id)
          console.log(process.applicableUsers)
          console.log(user)
          await client.saveProcessUser(user, process_return.id)
        })
        console.log('Dopo il applicableUsers')

      }
      await saveUsers()

      const saveProcessDocs = async () => {
        await asyncForEach(payload.process.producedDoc, async (doc) => {
          console.log("IL PROCESS ID È: " + process_return.id)
          console.log("this is produced docs")
          console.log(payload.process.producedDoc)
          console.log(doc)
          await client.saveProcessProducedDocs(doc, process_return.id)
        })
        console.log('Dopo il produced docs')

      }
      await saveProcessDocs()

      /*
      
             process.applicableUsers.asyncForEach(function (user) {
              client.saveProcessUser(user.value, process_return.id)
            }, process_return.id)
            */
      console.log("after foreach save users")

      payload.process.id = process_return.id
      // now we need to set the id for all translations
      
      state.commit('saveProcess', payload.process)
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
      await client.deleteProcessStepLinkTranslationProd(steplink.id)
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
      await client.deleteProcessStepTranslationProd(step.id)
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
  client.deleteProcessTranslationsProd(payload.process)
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

export function editProcess (state, payload) {
  var workingId = payload.process.id 
  var promiseProc =[]
  var promiseProcTransl =[]
  var promiseDeleteUser =[]
  var promiseDeleteTopic =[]
  var promiseDeleteDoc =[]
  var promiseSaveUser =[]
  var promiseSaveTopic =[]
  var promiseSaveDoc =[]
  promiseProc.push(client.updateProcess(payload.process))
  Promise.all(promiseProc).then(()=>{
    payload.process.translations.forEach((aTranslation)=>{
      promiseProcTransl.push(client.updateProcessTranslation(aTranslation))
    })
    Promise.all(promiseProcTransl).then(()=>{
      promiseDeleteUser.push(client.deleteProcessUser(payload.process.id))
      Promise.all(promiseDeleteUser).then(()=>{
        promiseDeleteTopic.push(client.deleteProcessTopic(payload.process.id))
        Promise.all(promiseDeleteTopic).then(()=>{
          promiseDeleteDoc.push(client.deleteProcessProducedDocs(payload.process.id))
          Promise.all(promiseDeleteDoc).then(()=>{
          if(payload.process.processTopics != null){
              payload.process.processTopics.forEach((topic) => {
              console.log("in saving topic")
              console.log(topic)
              promiseSaveTopic.push(client.saveProcessTopic(topic, workingId))
            })
          }
          Promise.all(promiseSaveTopic).then(()=>{
                if (payload.process.applicableUsers != null){
                  payload.process.applicableUsers.forEach((user) => {
                    console.log("in saving user")
                    promiseSaveUser.push(client.saveProcessUser(user, workingId)) 
                  }) 
                }
          Promise.all(promiseSaveUser).then(() =>{
            if (payload.process.producedDoc != null){
              payload.process.producedDoc.forEach((doc) => {
                console.log("in saving produced doc")
                promiseSaveDoc.push(client.saveProcessProducedDocs(doc, workingId))
              })
            }
            Promise.all(promiseSaveDoc).then(()=>{
              state.commit('editProcess', payload.process)
            })
          })   
              })
            
          })
        })
      })
    })
  })
}



/*export function editProcess (state, payload) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(payload.process)
  var workingId = payload.process.id 
  console.log("i am working id")
  console.log(workingId)
  // update translations
  client
    .updateProcess(payload.process).then(function (update_return) {
      // cycle in the translations and update each
      console.log(update_return)
      payload.process.translations.forEach(function (aTranslation) {
        client.updateProcessTranslation(aTranslation).then(function (update_translation_return) {
          console.log(update_translation_return)
        })
   })
     })

      client.deleteProcessUser(payload.process.id).then(function (param) {
      client.deleteProcessTopic(payload.process.id).then(function (param2) {
        client.deleteProcessProducedDocs(payload.process.id).then(function (param3) {
        if (payload.process.processTopics != null){
          payload.process.processTopics.forEach((topic) => {
            console.log("in saving topic")
          console.log(topic)
          client.saveProcessTopic(topic, workingId)
        })
      }
        if (payload.process.applicableUsers != null){
          payload.process.applicableUsers.forEach((user) => {
            console.log("in saving user")
            client.saveProcessUser(user, workingId)
          }) 
        }
        if (payload.process.producedDoc != null){
          payload.process.producedDoc.forEach((doc) => {
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
} 
console.log("i am process being sent to store")
console.log(payload.process)
state.commit('editProcess', payload.process)
}*/

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

export function updatePublished(state, payload){
  client.updatePublished(payload.process.id, payload.published, payload.publishedDate).then(()=>{
    state.commit('editProcess', payload.process)
  })
}

export function saveTranslationProd(state, id){
  client.deleteProcessTranslationProd(id).then(()=>{
    console.log("deleted previous translations")
    client.saveProcessTranslationProd(id)
   })
}

export function deleteTranslationProd(state, id){
  console.log("in delete transl prod")
  client.deleteProcessTranslationProd(id)
}
export function fetchGraph (state, payload) {
  return client
    .fetchGraph(payload.id, payload.userLang)
    .then(graph => {
      state.commit('graphs/setGraphs', graph, { root: true })
      return graph
    })
}
