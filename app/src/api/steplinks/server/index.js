import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchSteplinks () {
    return axiosInstance
      .get('/backend/1.0.0/step-links?filter[include][0][relation]=translations')
      .then(response => response.data)
      .catch(error_handler);
  },
  fetchSteplinksByProcessId (id) {
    const whereClause = {
      idProcess: { eq: id }
    }
    return axiosInstance
      .get('/backend/1.0.0/step-links?filter[include][0][relation]=translations&where=' + JSON.stringify(whereClause))
      .then(response => response.data)
      .catch(error_handler);
  }
}
