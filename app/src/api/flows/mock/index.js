import flows from './data/flows'
//import documents from './data/documents'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchFlows () {
    return fetch(flows, 1000) // wait 1s before returning posts
  },
  fetchDocuments () {
    return fetch(flows, 1000) // wait 1s before returning posts
  }
}
