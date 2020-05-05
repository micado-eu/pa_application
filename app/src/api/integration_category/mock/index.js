import integration_category from './data/integration_category'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchIntegrationCategory () {
    return fetch(integration_category, 1000) // wait 1s before returning posts
  }
}
