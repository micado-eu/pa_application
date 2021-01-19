import client from 'api-information_category-client'

export function fetchInformationCategory(state, data) {
  return client
    .fetchInformationCategory()
    .then((information_category) => state.commit('setCategoryType', information_category))
}

export function editCategoryTypeElement(state, information_category) {
  const old_ic = state.information_category.filter(ic => ic.id === information_category.id)
  if (old_ic.published && information_category.translations[0].translationState === 0) {
    deleteProdTranslations(state, information_category.id).then(() => {
      console.log("Deleted prod translations")
    })
  }
  if (old_ic.published && !information_category.published) {
    // If published goes from true to false, all the content gets deleted from the translation prod table
    deleteProdTranslations(state, information_category.id).then(() => {
      console.log("Deleted prod translations")
    })
  }
  // update translations
  return client
    .updateInformationCategory({
      id: information_category.id,
      link_integration_plan: information_category.link_integration_plan,
      published: information_category.published
    }).then((update_return) => {
      // cycle in the translations and update each
      information_category.translations.forEach((aTranslation) => {
        aTranslation.informationCategory = aTranslation.category
        delete aTranslation.category
        client.updateInformationCategoryTranslation(aTranslation)
        if (!old_ic.published && information_category.published && aTranslation.translationState === 3) {
          // If published goes from false to true, all the content with the state "translated" must be copied into the prod table
          const prodTransl = Object.assign({}, aTranslation)
          delete prodTransl.translationState
          delete prodTransl.published
          saveInformationCategoryTranslationProd(prodTransl).then(() => { })
        }
      })
      fetchInformationCategory(state)
    })
}
export function saveInformationCategory(state, information_category) {
  return client.saveInformationCategory({
    link_integration_plan: information_category.link_integration_plan,
    published: information_category.published
  })
    .then((category_return) => {
      // in topic_return we have the ID that we need in the following cycle
      information_category.translations.forEach((transl, idx) => {
        transl.informationCategory = transl.category
        delete transl.category
        client.saveInformationCategoryTranslation(transl, category_return.id).then(() => {
          if (idx === information_category.translations.length - 1) {
            fetchInformationCategory(state)
          }
        })
      }, category_return.id)
    })
}

export function deleteInformationCategory(state, index) {
  return client.deleteInformationCategoryTranslations(index).then((translations_delete_return) => {
    client.deleteInformationCategory(index).then(() => {
      fetchInformationCategory(state)
    })
  })
}

export function updatePublished(state, data) {
  return client
    .updatePublished(data.id, data.published)
    .then(() => {
      state.commit("updatePublished", data)
    })
}

export function deleteProdTranslations(state, id) {
  return client.deleteProdTranslations(id)
}

export function saveInformationCategoryTranslationProd(state, data) {
  return this.saveInformationCategoryTranslationProd(data)
} 