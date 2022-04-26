import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchConsent (tenant, principal) {
    return axiosInstance
      .get(`/consent/${tenant}/${principal}`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  fetchReceipt (receipt) {
    // create fake id here
    return axiosInstance
      .get(`/receipt/${receipt}`)
      .then((response) => response.data)
      .catch(error_handler)
  }

}
