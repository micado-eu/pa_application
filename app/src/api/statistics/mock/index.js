import statistics from './data/statistics'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchStatistics () {
    return fetch(statistics, 1000) // wait 1s before returning posts
  }
}
