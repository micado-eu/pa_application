import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchEventCategory() {
    return axiosInstance
      .get('/event-categories?filter[include][0][relation]=translations')
      .then((response) => response.data)
      .catch(error_handler)
  },
  updateEventCategory(event_category) {
    return axiosInstance
      .patch(`/event-categories/${event_category.id}`, event_category)
      .then((response) => response.data)
      .catch(error_handler)
  },

  updateEventCategoryTranslation(translation) {
    const whereClause = {
      id: { eq: translation.id }, lang: { eq: translation.lang }, translated: { eq: translation.translated }
    }
    translation.translationDate =  new Date().toISOString()
    return axiosInstance
      .patch(`/event-categories/${translation.id}/event-category-translations?where=${JSON.stringify(whereClause)}`, translation)
      .then((response) => response.data)
      .catch(error_handler)
  },

  saveEventCategory(event_category) {
    return axiosInstance
      .post('/event-categories', event_category)
      .then((response) => response.data)
      .catch(error_handler)
  },
  saveEventCategoryTranslation(translation, id) {
    translation.id = id
    translation.translationDate = new Date().toISOString()
    return axiosInstance
      .post(`/event-categories/${id}/event-category-translations`, translation)
      .then((response) => response.data)
      .catch(error_handler)
  },
  saveEventCategoryTranslationProd(id) {
    return axiosInstance
      .get(`/event-categories/to-production?id=${id}`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  deleteEventCategoryTranslations(id) {
    return axiosInstance
      .delete(`/event-categories/${id}/event-category-translations`)
      .then((response) => response.data)
      .catch(error_handler)
  },

  deleteEventCategory(id) {
    return axiosInstance
      .delete(`/event-categories/${id}`)
      .then((response) => response.data)
      .catch(error_handler)
  },

  updatePublished(id, is_published){
    return axiosInstance
    .patch('/event-categories?[where][id]='+ id, {published: is_published})
    .then(response => response.data)
    .catch(error_handler)
  },
  deleteProdTranslations(id) {
    return axiosInstance
        .delete(`/event-categories/${id}/event-category-translation-prods`)
        .then((response) => response.data)
        .catch(error_handler)
  }
}
