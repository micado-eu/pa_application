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
  /*  const whereClause = {
      idProcess: { eq: id }
    }*/
    return axiosInstance
      .get('/backend/1.0.0/step-links?filter[include][0][relation]=translations&filter[where][idProcess]=' + id)
      .then(response => response.data)
      .catch(error_handler);
  },
  updateSteplinkTranslation (translation, id) {
    translation.id = id
    const savingTranslation = JSON.parse(JSON.stringify(translation, ['id','translationState']));

    // create fake id here
    return axiosInstance
      .patch('/backend/1.0.0/step-links/' +id +'/step-link-translations', savingTranslation)
      .then(response => response.data)
      .catch(error_handler);
  },
  saveSteplinkTranslationProd (id) {
    // create fake id here
    return axiosInstance
      .get('/backend/1.0.0/step-links/to-production?id=' + id)
      .then(response => response.data)
      .catch(error_handler);
  },
  deleteSteplinkTranslationProd (id) {
    // create fake id here
    return axiosInstance
      .delete('/backend/1.0.0/step-links/' + id + '/step-link-translation-prods')
      .then(response => response.data)
      .catch(error_handler);
  },
}
