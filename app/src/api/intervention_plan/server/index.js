import { axiosInstance }  from 'boot/axios'

export default {
  fetchIntegrationCategory () {
    console.log("CALLING API!!!!")
    return axiosInstance
      .get('/db/v01/intervention_category?lang=eq.en')
      .then(response => response.data)
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
    },
    deleteIntegrationCategory(integration_category) {
      console.log("fake call to save to DB")
      console.log(integration_category)
      // create fake id here
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(integration_category)
        }, 0)
      })
    }
  }
