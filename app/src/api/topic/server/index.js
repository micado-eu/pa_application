import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'


export default {
  fetchTopic () {
    return axiosInstance
      .get('/topics?filter[include][0][relation]=translations')
      .then(response => response.data)
      .catch(error_handler)
  },
  saveTopic (topic) {
    // create fake id here
    return axiosInstance
      .post('/topics', topic)
      .then(response => response.data)
      .catch(error_handler)
  },
  saveTopicTranslation (translation, id) {
    translation.id = id
    const savingTranslation = JSON.parse(JSON.stringify(translation, ['id', 'lang', 'topic','description', 'translationState', 'translationDate', 'translated']))

    // create fake id here
    return axiosInstance
      .post('/topics/' + id + '/topic-translations', savingTranslation)
      .then(response => response.data)
      .catch(error_handler)
  },
  saveTopicTranslationProd (id) {

    // create fake id here
    return axiosInstance
      .get('/topics/to-production?id='+ id)
      .then(response => response.data)
      .catch(error_handler)
  },
  deleteTopicTranslationProd (id) {
    // create fake id here
    return axiosInstance
      .delete('/topics/' + id + '/topic-translation-prods')
      .then(response => response.data)
      .catch(error_handler)
  },
  fetchTopicTranslated (id) {

    return axiosInstance
      .get('/topics/' + id + '/topic-translations')
      .then(response => response.data)
      .catch(error_handler)
  },

  deleteTopicTranslations (id) {
    return axiosInstance
      .delete('/topics/' + id + '/topic-translations')
      .then(response => response.data)
      .catch(error_handler)
  },

  deleteTopic (id) {
    return axiosInstance
      .delete('/topics/' + id)
      .then(response => response.data)
      .catch(error_handler)
  },
  deleteProcessTopic (id) {
    return axiosInstance
      .delete('/topics/' + id + '/process-topics')
      .then(response => response.data)
      .catch(error_handler)
  },

  updateTopic (topic) {
    const whereClause = {
      id: { eq: topic.id }
    },
      updatingTopic = JSON.parse(JSON.stringify(topic, ['id', 'icon', 'published', 'father']))

    return axiosInstance
      .patch('/topics?where=' + JSON.stringify(whereClause), updatingTopic)
      .then(response => response.data)
      .catch(error_handler)
  },

  updateTopicTranslation (translation) {
    const whereClause = {
      id: { eq: translation.id }, lang: { eq: translation.lang }, translated: {eq: translation.translated}
    },
      updatingTranslation = (translation.translationDate == null) ? JSON.parse(JSON.stringify(translation, ['id', 'lang', 'topic', 'description', 'translationState', 'translationDate', 'translated'])) : translation

    return axiosInstance
      .patch('/topics/' + translation.id + '/topic-translations?where=' + JSON.stringify(whereClause), updatingTranslation)
      .then(response => response.data)
      .catch(error_handler)
  }, 
  updatePublished(id, is_published){
    return axiosInstance
    .patch('/topics?[where][id]='+ id, {published: is_published})
    .then(response => response.data)
    .catch(error_handler)

  },
  exportTopic (id) {
    return axiosInstance
      .get('/topics/' + id +'?filter[include][0][relation]=translations')
      .then(response => { return response.data })
      .catch(error_handler)
  }
}
