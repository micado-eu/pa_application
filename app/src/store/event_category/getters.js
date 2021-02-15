export function eventCategories(state) {
  return state.event_category
}

export function eventCategoryById (state) {
  let getterFunc = function (id) {
    return state.event_category.filter(ic => ic.id == id)[0]
  }
  return getterFunc
}