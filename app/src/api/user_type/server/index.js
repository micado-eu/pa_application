import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchUserType () {
    return axiosInstance
      .get('/backend/1.0.0/user-types?filter[include][0][relation]=translations')
      .then(response => { return response.data })
      .catch(error_handler);
  },
  updateIntegrationCategory (integration_category) {

  }
}
