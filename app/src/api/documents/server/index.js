import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchDocuments (id) {
  return axiosInstance
    .get('/backend/1.0.0/documents?filter[include][0][relation]=pictures&filter[include][1][relation]=documentType&filter[where][userId]=' + id)
    .then(response => { return response.data })
    .catch(error_handler);
},
fetchCompletionDocuments () {
  return axiosInstance
    .get('/backend/1.0.0/completed-intervention-documents')
    .then(response => { return response.data })
    .catch(error_handler);
},
}
