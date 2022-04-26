import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchTenant () {
    return axiosInstance
      .get('/tenants')
      .then(response => { return response.data })
      .catch(error_handler)
  }
}
