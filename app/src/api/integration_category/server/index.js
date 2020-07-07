import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../utils/helper'

export default {
  fetchIntegrationCategory () {
    console.log("CALLING API!!!!")
    return axiosInstance
      //      .get('/db/v01/intervention_category?lang=eq.en')
      .get('/backend/1.0.0/intervention-category?filter[include][0][relation]=translations')
      .then(response => response.data)
      .catch(error_handler);
  },
  updateIntegrationCategory (integration_category) {
    console.log("fake call to update DB")
    console.log(integration_category)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(integration_category)
      }, 0)
    })
  },
  saveIntegrationCategory (integration_category) {
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
  deleteIntegrationCategory (integration_category) {
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
