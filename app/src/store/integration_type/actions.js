import client from 'api-integration_type-client'

/*
export function someAction (context) {
}
*/
export function fetchIntegrationType (state, data) {
  return client
    .fetchIntegrationType()
    .then(integration_type => {
      state.commit('setIntegrationType', integration_type)
      return integration_type
    })
}

export async function editIntegrationTypeElement (state, integration_type_element) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log("in editIntegrationTypeElement")
  console.log(integration_type_element)
  // update translations
  return client
    .updateIntegrationType(integration_type_element).then(async function (update_return) {
      // cycle in the translations and update each
      console.log(update_return)
      console.log("in update translation")
      integration_type_element.translations.forEach(function (aTranslation) {
        client.updateIntegrationTypeTranslation(aTranslation).then(function (update_translation_return) {
          console.log(update_translation_return)
        })
      })
      // manage validators
      console.log("start managing validators")
      await client.deleteIntegrationTypeValidators(integration_type_element.id)
        .then(function () {
          let promises = []
          integration_type_element.interventionTypeValidators.forEach(function (validator) {
            promises.push(client.saveIntegrationTypeValidators(validator, integration_type_element.id))
            console.log("saved a validator: " + validator)

          }, integration_type_element.id)

          Promise.all(promises)
        })
      console.log("deleted and saved")

      let savedValidators = []

      integration_type_element.interventionTypeValidators.forEach(function (validator) {
        savedValidators.push({ interventionTypeId: integration_type_element.id, tenantId: validator })
        console.log("saved validators")
        console.log(savedValidators)
        integration_type_element.interventionTypeValidators = savedValidators
      })
      state.commit('editIntegrationTypeElement', integration_type_element)
    })
}

export function saveIntegrationTypeElement (state, integration_type_element) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log("in actions savec ategory:")
  console.log(integration_type_element)
  let savingCategory = JSON.parse(JSON.stringify(integration_type_element, ['categoryType']))
  console.log(savingCategory)


  // we need to save first the topic
  return client.saveIntegrationType(savingCategory)
    .then(function (type_return) {
      console.log("returned from saving category")
      console.log(type_return)
      // in topic_return we have the ID that we need in the following cycle
      integration_type_element.translations.forEach(function (transl) {
        client.saveIntegrationTypeTranslation(transl, type_return.id)
      }, type_return.id)
      // here we need only to add the ID to the topic element since there are the tranlsations that in the topic_return are not present
      console.log("after foreach save translation")
      integration_type_element.id = type_return.id
      // now we need to set the id for all translations
      for (var i = 0; i < integration_type_element.translations.length; i++) {
        integration_type_element.translations[i].id = type_return.id
      }
      // saving the validators
      let savedValidators = []
      integration_type_element.interventionTypeValidators.forEach(function (validator) {
        client.saveIntegrationTypeValidators(validator, type_return.id)
        savedValidators.push({ interventionTypeId: type_return.id, tenantId: validator })
      }, type_return.id)
      console.log("saved validators")
      console.log(savedValidators)
      integration_type_element.interventionTypeValidators = savedValidators
      state.commit('saveIntegrationTypeElement', integration_type_element)
    }
      // here we cycle for all translations to save each one

    )
}

export function deleteIntegrationTypeElement (state, index) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(index)
  return client.deleteIntegrationTypeTranslations(index).then(function (translations_delete_return) {
    console.log("deleted the translations")
    console.log(translations_delete_return)
    client.deleteIntegrationType(index).then(function () {
      state.commit('deleteIntegrationTypeElement', index)
    })
  })
}

/*export function deleteIntegrationTypeElement (state, index) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(index)
  var promise_type = []
  var promise_validators = []
  return client.deleteIntegrationTypeTranslations(index).then(function (translations_delete_return) {
    console.log("deleted the translations")
    console.log(translations_delete_return)
    promise_type.push(client.deleteInterventionByType(index))
    Promise.all(promise_type).then(()=>{
      console.log("deleted associated interventions")
      promise_validators.push(client.deleteInterventionTypeValidators(index))
      Promise.all(promise_validators).then(()=>{
        console.log("deleted validators")
        client.deleteIntegrationType(index).then(function () {
          state.commit('deleteIntegrationTypeElement', index)
        })
      })
     
    })
    
  })
}*/

export function updatePublished(state, payload){
  client.updatePublished(payload.type.id, payload.published).then(()=>{
    state.commit('editIntegrationTypeElement', payload.type)
  })
}

export function saveTranslationProd(state, id){
  client.fetchTypeTranslated(id).then((translations)=>{
    console.log("i am the return from the fetch")
    console.log(translations)
    translations.forEach((transl)=>{
      if(transl.translationState == 3){
        console.log("inside if translated")
        client.saveTypeTranslationProd(transl, id)
      }
    })
  })
}

export function deleteTranslationProd(state, id){
  console.log("in delete transl prod")
  client.deleteTypeTranslationProd(id)
}