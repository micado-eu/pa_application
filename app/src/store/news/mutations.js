export function setNews(state, news) {
  state.news = news
}

export function addNewNewsItem (state, newsItem) {
  state.news.push(newsItem)
}

export function editNewsItem (state, payload) {
  console.log(payload)
  let elem = state.news.filter(g => g.id == payload.id)[0]
  console.log(state.news.filter(g => g.id == payload.id))
  let elemIndex = state.news.indexOf(elem)
  console.log(elemIndex)
  state.news[elemIndex] = payload
}