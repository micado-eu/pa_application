import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchTenant () {
    return axiosInstance
      .get('/backend/1.0.0/tenants')
      .then(response => { return response.data })
      .catch(error_handler);
  },
}
