export function news (state) {
  return state.news
}

export function newsElemByTitle (state) {
  let getterFunc = function (title) {
    return state.news.filter(g => g.title === title)[0]
  }
  return getterFunc
}

export function newsElemById (state) {
  let getterFunc = function (id) {
    return state.news.filter(g => g.id == id)[0]
  }
  return getterFunc
}