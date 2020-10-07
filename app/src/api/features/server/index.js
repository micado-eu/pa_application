import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchFeatures () {
    console.log("sono il client di features")
    return axiosInstance
      .get('/backend/1.0.0/features-flags')
      .then(
        response => response.data[0].features
      )
      .catch(error_handler);

  }
}
