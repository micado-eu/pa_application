import client from 'api-integration_category-client'

/*
export function someAction (context) {
}
*/
export function fetchIntegrationCategory(state, data) {
  return client
    .fetchIntegrationCategory()
    .then(integration_category => {
      state.commit('setCategoryType', integration_category)
      return integration_category
    })
}

export function editCategoryTypeElement (state, integration_category) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(integration_category)
  // update translations
  return client
    .updateIntegrationCategory(integration_category).then(function (update_return) {
      // cycle in the translations and update each
      console.log(update_return)
      integration_category.translations.forEach(function (aTranslation) {
        client.updateIntegrationCategoryTranslation(aTranslation).then(function (update_translation_return) {
          console.log(update_translation_return)
        })
      })
      state.commit('editCategoryTypeElement', integration_category)
    })
}
export function saveIntegrationCategory (state, integration_category) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log("in actions savec ategory:")
  console.log(integration_category)
  let savingCategory= JSON.parse(JSON.stringify(integration_category, ['']));
  console.log(savingCategory)


  // we need to save first the topic
  return client.saveIntegrationCategory(savingCategory)
    .then(function (category_return) {
      console.log("returned from saving category")
      console.log(category_return)
      // in topic_return we have the ID that we need in the following cycle
      integration_category.translations.forEach(function (transl) {
        client.saveIntegrationCategoryTranslation(transl, category_return.id)
      }, category_return.id)
      // here we need only to add the ID to the topic element since there are the tranlsations that in the topic_return are not present
      console.log("after foreach save translation")
      integration_category.id = category_return.id
      // now we need to set the id for all translations
      for (var i = 0; i < integration_category.translations.length; i++) {
        integration_category.translations[i].id = category_return.id
      }
      state.commit('saveCategoryTypeElement', integration_category)
    }
      // here we cycle for all translations to save each one

    )
}


export function deleteIntegrationCategory (state, category) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  var type_id = []
  if(category.linkedInterventionType){
    category.linkedInterventionType.forEach((type)=>{
      type_id.push(type.id)
    })
  }
  
  Promise.all(type_id.map(client.deleteInterventionByType)).then(()=>{
    console.log("inside itnervention")
    Promise.all(type_id.map(client.deleteInterventionTypeValidators)).then(()=>{
      console.log("inside validator")
      Promise.all(type_id.map(client.deleteIntegrationTypeTranslations)).then(()=>{
        console.log("inside transl")
        Promise.all(type_id.map(client.deleteIntegrationType)).then(()=>{
          console.log("inside result then")
          client.deleteIntegrationCategoryTranslations(category.id).then(() =>{
            client.deleteIntegrationCategory(category.id).then(function () {
              state.commit('deleteIntegrationCategory', category.id)
            })
          })
        })
      })
    })
  })
  

  /* client.deleteIntegrationCategoryTranslations(category.id).then(function (translations_delete_return) {
    console.log("deleted the translations")
    console.log(translations_delete_return)
    category.linkedInterventionType.forEach((type)=>{
      type_transl.push(client.deleteIntegrationTypeTranslations(type.id))
      Promise.all(type_transl).then(()=>{
        type_intervention.push(client.deleteInterventionByType(type.id))
        Promise.all(type_intervention).then(()=>{
          type_validator.push(client.deleteInterventionTypeValidators(type.id))
          Promise.all(type_validator).then(()=>{
            int_type.push(client.deleteIntegrationType(type.id))
          })
        })
      })
    })
    Promise.all(type_intervention, type_transl, type_validator, int_type).then(()=>{
      client.deleteIntegrationCategory(category.id).then(function () {
        state.commit('deleteIntegrationCategory', category.id)
      })
    })
    
  })*/
}

export function updatePublished(state, payload){
  client.updatePublished(payload.cat.id, payload.published).then(()=>{
    state.commit('editCategoryTypeElement', payload.cat)
  })
}

export function saveTranslationProd(state, id){
  client.deleteCategoryTranslationProd(id).then(()=>{
    console.log("deleted previous translations")
    client.saveCategoryTranslationProd(id)
   })
}

export function deleteTranslationProd(state, id){
  console.log("in delete transl prod")
  client.deleteCategoryTranslationProd(id)
}

