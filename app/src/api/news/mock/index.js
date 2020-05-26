import news from './data/news'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

let i = 99999999999

export default {
  fetchNews() {
    return fetch(news, 1000) // wait 1s before returning posts
  },
  saveNewNewsItem(newsItem) {
    let aux = Object.assign(newsItem, { id: i })
    i--
    return fetch(aux, 1000)
  },
  editNewsItem(newItem) {
    return fetch(newItem, 1000)
  },
  deleteNewsItem(item) {
    return fetch(item, 1000)
  }
}
