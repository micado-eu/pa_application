import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchGraphs (id, userLang) {
    return axiosInstance
      .get('/backend/1.0.0/cytoscape?processid=' + id + '&lang=' + userLang)
      .then(response => { return response.data })
      .catch(error_handler);
  },
}
