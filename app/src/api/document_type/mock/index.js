import document_type from './data/document_type'
//import documents from './data/documents'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchDocument_type () {
    return fetch(document_type, 1000) // wait 1s before returning posts
  }
}
