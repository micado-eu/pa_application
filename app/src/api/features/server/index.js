import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchFeatures () {
    console.log("sono il client di features")
    return axiosInstance
      .get('/backend/1.0.0/features-flags?filter[include][0][relation]=translations')
      .then(
        response => {
          console.log("response from API features client")
          console.log(response)
          return response.data
        }
      )
      .catch(error_handler);

  }
}
