import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'


export default {
  fetchFlows () {
    return axiosInstance
      .get('/backend/1.0.0/processes?filter[include][0][relation]=translations&filter[include][1][relation]=processTopics&filter[include][2][relation]=applicableUsers')
      .then(response => response.data)
      .catch(error_handler);
  }
}
