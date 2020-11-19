import client from 'api-integration_category-client'

/*
export function someAction (context) {
}
*/
export function fetchIntegrationCategory(state, data) {
  return client
    .fetchIntegrationCategory()
    .then(integration_category => state.commit('setCategoryType', integration_category))
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


export function deleteIntegrationCategory (state, index) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(index)
  return client.deleteIntegrationCategoryTranslations(index).then(function (translations_delete_return) {
    console.log("deleted the translations")
    console.log(translations_delete_return)
    client.deleteIntegrationCategory(index).then(function () {
      state.commit('deleteIntegrationCategory', index)
    })
  })
}

export function updatePublished(state, payload){
  client.updatePublished(payload.cat.id, payload.published).then(()=>{
    state.commit('editCategoryTypeElement', payload.cat)
  })
}

export function saveTranslationProd(state, id){
  client.fetchCategoryTranslated(id).then((translations)=>{
    console.log("i am the return from the fetch")
    console.log(translations)
    translations.forEach((transl)=>{
      if(transl.translationState == 3){
        console.log("inside if translated")
        client.saveCategoryTranslationProd(transl, id)
      }
    })
  })
}

export function deleteTranslationProd(state, id){
  console.log("in delete transl prod")
  client.deleteCategoryTranslationProd(id)
}

