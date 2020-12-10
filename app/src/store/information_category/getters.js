export function informationCategories(state) {
    return state.information_category
}

export function informationCategoryById (state) {
    let getterFunc = function (id) {
      return state.information_category.filter(ic => ic.id == id)[0]
    }
    return getterFunc
  }