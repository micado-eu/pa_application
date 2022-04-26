import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchFeaturesFlags () {
    console.log("sono il client di features")
    return axiosInstance
      .get('/active-features')
      .then(response => {
        console.log(response.data)
        return response.data
      })
      .catch(error_handler)
  },
  fetchFeatures () {
    console.log("sono il client di features")
    return axiosInstance
      .get('/features-flags?filter[include][0][relation]=translations')
      .then(
        response => {
          console.log("response from API features client")
          console.log(response)
          return response.data
        }
      )
      .catch(error_handler)

  },

  updateFeature (feature) {
    console.log("updating feature: " + feature.id)
    let updatingFeature = JSON.parse(JSON.stringify(feature, ['id', 'enabled']))
    console.log("the update is" + JSON.stringify(updatingFeature))
    let condition = { id: { eq: updatingFeature.id } }
    return axiosInstance
      .patch('/features-flags?where=' + JSON.stringify(condition), updatingFeature)
  }
}
