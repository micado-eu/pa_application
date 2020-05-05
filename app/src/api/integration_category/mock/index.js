import integration_category from './data/integration_category'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchIntegrationCategory() {
    return fetch(integration_category, 1000) // wait 1s before returning posts
  },
  updateIntegrationCategory(integration_category) {
    console.log("fake call to update DB")
    console.log(integration_category)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(integration_category)
      }, 0)
    })
  },
  saveIntegrationCategory(integration_category) {
    console.log("fake call to save to DB")
    console.log(integration_category)
    // create fake id here
    integration_category.id = 999
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(integration_category)
      }, 0)
    })
  }
}
