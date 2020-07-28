import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchUser () {
    return axiosInstance
      .get('/backend/1.0.0/users?filter[include][0][relation]=attributes&filter[include][1][relation]=interventionPlans')
      .then(response => { return response.data })
      .catch(error_handler);
  },
}
