import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchSurvey () {
    return axiosInstance
      .get('/backend/1.0.0/surveys')
      .then(response => { return response.data })
      .catch(error_handler)
  }
}
