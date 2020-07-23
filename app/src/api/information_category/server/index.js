import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'


export default {
  fetchInformationCategory() {
    return axiosInstance
      .get('/backend/1.0.0/event-categories?filter[include][0][relation]=translations')
      .then(response => { return response.data })
      .catch(error_handler);
  },
  updateInformationCategory(information_category) {
    const whereClause = {
      id: { eq: information_category.id }
    },
      updatingCategory = (information_category.publicationDate == null) ? JSON.parse(JSON.stringify(information_category, ['id', 'published'])) : information_category

    return axiosInstance
      .patch('/backend/1.0.0/event-categories?where=' + JSON.stringify(whereClause), updatingCategory)
      .then(response => response.data)
      .catch(error_handler);
  },

  updateInformationCategoryTranslation(translation) {
    const whereClause = {
      id: { eq: translation.id }, lang: { eq: translation.lang }
    },
      updatingTranslation = (translation.translationDate == null) ? JSON.parse(JSON.stringify(translation, ['id', 'lang', 'title'])) : translation

    return axiosInstance
      .patch('/backend/1.0.0/event-categories/' + translation.id + '/event-category-translations?where=' + JSON.stringify(whereClause), updatingTranslation)
      .then(response => response.data)
      .catch(error_handler);
  },

  saveInformationCategory(information_category) {
    return axiosInstance
      .post('/backend/1.0.0/event-categories', information_category)
      .then(response => response.data)
      .catch(error_handler);
  },
  saveInformationCategoryTranslation(translation, id) {
    translation.id = id

    return axiosInstance
      .post('/backend/1.0.0/event-categories/' + id + '/event-category-translations', translation)
      .then(response => response.data)
      .catch(error_handler);
  },
  deleteInformationCategoryTranslations(id) {
    return axiosInstance
      .delete('/backend/1.0.0/event-categories/' + id + '/event-category-translations')
      .then(response => response.data)
      .catch(error_handler);
  },

  deleteInformationCategory(id) {
    return axiosInstance
      .delete('/backend/1.0.0/event-categories/' + id)
      .then(response => response.data)
      .catch(error_handler);
  },
}
