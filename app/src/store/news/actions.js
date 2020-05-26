import client from 'api-news-client'

export function fetchNews(state, data) {
  return client
    .fetchNews()
    .then(news => state.commit('setNews', news))
}

export function saveNewNewsItem(state, data) {
  return client
    .saveNewNewsItem(data)
    .then(newsItem => state.commit('addNewNewsItem', newsItem))
}

export function editNewsItem(state, data) {
  return client
    .editNewsItem(data)
    .then(newsItem => state.commit('editNewsItem', newsItem))
}

export function deleteNewsItem(state, data) {
  return client
    .deleteNewsItem(data)
    .then(() => state.commit('deleteNewsItem', data))
}