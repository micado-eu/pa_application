import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../utils/helper'


export default {
  fetchIntegrationType () {
    console.log("CALLING API!!!!")
    return axiosInstance
      //      .get('/db/v01/intervention_category?lang=eq.en')
      .get('/backend/1.0.0/intervention-types?filter[include][0][relation]=translations')
      .then(response => response.data)
      .catch(error_handler);
  },
  updateIntegrationType (integration_category) {

  }
}
