import client from 'api-event_category-client'

export function fetchEventCategory(state, data) {
  return client
    .fetchEventCategory()
    .then((event_category) => state.commit('setCategoryType', event_category))
}

export function editCategoryTypeElement(state, event_category) {
  const old_ec = state.event_category.filter(ic => ic.id === event_category.id)
  if (old_ec.published && event_category.translations[0].translationState === 0) {
    deleteProdTranslations(state, event_category.id).then(() => {
      console.log("Deleted prod translations")
    })
  }
  if (old_ec.published && !event_category.published) {
    // If published goes from true to false, all the content gets deleted from the translation prod table
    deleteProdTranslations(state, event_category.id).then(() => {
      console.log("Deleted prod translations")
    })
  }
  // update translations
  return client
    .updateEventCategory({
      id: event_category.id,
      link_integration_plan: event_category.link_integration_plan,
      published: event_category.published
    }).then((update_return) => {
      // cycle in the translations and update each
      event_category.translations.forEach((aTranslation) => {
        aTranslation.eventCategory = aTranslation.category
        delete aTranslation.category
        client.updateEventCategoryTranslation(aTranslation)
        if (!old_ec.published && event_category.published && aTranslation.translationState === 4) {
          // If published goes from false to true, all the content with the state "translated" must be copied into the prod table
          const prodTransl = Object.assign({}, aTranslation)
          delete prodTransl.translationState
          delete prodTransl.published
          saveEventCategoryTranslationProd(prodTransl).then(() => { })
        }
      })
      fetchEventCategory(state)
    })
}
export function saveEventCategory(state, event_category) {
  return client.saveEventCategory({
    link_integration_plan: event_category.link_integration_plan,
    published: event_category.published
  })
    .then((category_return) => {
      // in topic_return we have the ID that we need in the following cycle
      event_category.translations.forEach((transl, idx) => {
        transl.eventCategory = transl.category
        delete transl.category
        client.saveEventCategoryTranslation(transl, category_return.id).then(() => {
          if (idx === event_category.translations.length - 1) {
            fetchEventCategory(state)
          }
        })
      }, category_return.id)
    })
}

export function deleteEventCategory(state, index) {
  return client.deleteEventCategoryTranslations(index).then((translations_delete_return) => {
    client.deleteEventCategory(index).then(() => {
      fetchEventCategory(state)
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

export function saveEventCategoryTranslationProd(state, data) {
  return this.saveEventCategoryTranslationProd(data)
} 