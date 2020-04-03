import glossary from './data/glossary'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchGlossary() {
    return fetch(glossary, 0) // wait 1s before returning posts
  }
}
