import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchSteps () {
    return axiosInstance
      .get('/backend/1.0.0/steps?filter[include][0][relation]=translations&filter[include][1][relation]=documents')
      .then(response => response.data)
      .catch(error_handler);
  },
  fetchStepsByProcessId (id) {
    const whereClause = {
      idProcess: { eq: id }
    }
    return axiosInstance
      .get('/backend/1.0.0/steps?filter[include][0][relation]=translations&filter[include][1][relation]=documents&where=' + JSON.stringify(whereClause))
      .then(response => response.data)
      .catch(error_handler);
  }
}
