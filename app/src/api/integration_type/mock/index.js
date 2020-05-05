import integration_type from './data/integration_type'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchIntegrationType() {
    return fetch(integration_type, 1000) // wait 1s before returning posts
  },
  updateIntegrationType(integration_type) {
    console.log("fake call to update DB")
    console.log(integration_type)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(integration_type)
      }, 0)
    })
  },
  deleteIntegrationType(integration_type) {
    console.log("fake call to delete DB")
    console.log(integration_type)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(integration_type)
      }, 0)
    })
  },
  saveIntegrationType(integration_type) {
    console.log("fake call to save to DB")
    console.log(integration_type)
    // create fake id here
    integration_type.id = 999
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(integration_type)
      }, 0)
    })
  }
}
