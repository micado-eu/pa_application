export function setCategoryType(state, event_category) {
  for (let i = 0; i < event_category.length; i++) {
    if (event_category[i].translations) {
      for (let j = 0; j < event_category[i].translations.length; j++) {
        event_category[i].translations[j].category = event_category[i].translations[j].eventCategory
        delete event_category[i].translations[j].eventCategory
      }
    }
  }
  state.event_category = event_category
}

export function updatePublished(state, data) {
  let idx = state.event_category.findIndex((i) => i.id === data.id)
  if (idx !== -1) {
    state.event_category[idx].published = data.published
  }
}
