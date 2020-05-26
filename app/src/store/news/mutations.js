export function setNews(state, news) {
  state.news = news
}

export function addNewNewsItem(state, newsItem) {
  state.news.push(newsItem)
}

export function editNewsItem(state, payload) {
  let elem = state.news.filter(g => g.id == payload.id)[0]
  let elemIndex = state.news.indexOf(elem)
  state.news[elemIndex] = payload
}

export function deleteNewsItem(state, newsItem) {
  let index = state.news.indexOf(newsItem)
  if (index !== -1) {
    state.news.splice(index, 1);
  }
}