export function informationCategories(state) {
    return state.information_category
}

export function informationCategoryByName(state) {
    return function (title) {
        return state.information_category.filter(ic => ic.event_category === title)[0]
    }
}