export function setCategoryType(state, information_category) {
  for (let i = 0; i < information_category.length; i++) {
    if (information_category[i].translations) {
      for (let j = 0; j < information_category[i].translations.length; j++) {
        information_category[i].translations[j].category = information_category[i].translations[j].informationCategory
        delete information_category[i].translations[j].informationCategory
      }
    }
  }
  state.information_category = information_category
}

export function updatePublished(state, data) {
  let idx = state.information_category.findIndex((i) => i.id === data.id)
  if (idx !== -1) {
    state.information_category[idx].published = data.published
  }
}
