import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchUserType () {
    return axiosInstance
      .get('/user-types?filter[include][0][relation]=translations')
      .then(response => { return response.data })
      .catch(error_handler)
  },
  saveUserType (user_type) {
    // create fake id here
    return axiosInstance
      .post('/user-types', user_type)
      .then(response => response.data)
      .catch(error_handler)
  },
  saveUserTypeTranslation (translation, id) {
    translation.id = id
    const savingTranslation = JSON.parse(JSON.stringify(translation))

    // create fake id here
    return axiosInstance
      .post('/user-types/' + id + '/user-types-translations', savingTranslation)
      .then(response => response.data)
      .catch(error_handler)
  },

  deleteUserTypeTranslations (id) {
    return axiosInstance
      .delete('/user-types/' + id + '/user-types-translations')
      .then(response => response.data)
      .catch(error_handler)
  },
  deleteProcessUserType (id) {
    return axiosInstance
      .delete('/user-types/' + id + '/process-users')
      .then(response => response.data)
      .catch(error_handler)
  },

  deleteUserType (id) {
    return axiosInstance
      .delete('/user-types/' + id)
      .then(response => response.data)
      .catch(error_handler)
  },

  updateUserType (user_type) {
    const whereClause = {
      id: { eq: user_type.id }
    },
      updatingTopic =  JSON.parse(JSON.stringify(user_type, ['id', 'icon', 'published']))

    return axiosInstance
      .patch('/user-types?where=' + JSON.stringify(whereClause), updatingTopic)
      .then(response => response.data)
      .catch(error_handler)
  },

  updateUserTypeTranslation (translation) {
    const whereClause = {
      id: { eq: translation.id }, lang: { eq: translation.lang }, translated: {eq: translation.translated}
    },
      updatingTranslation = (translation.translationDate == null) ? JSON.parse(JSON.stringify(translation)) : translation

    return axiosInstance
      .patch('/user-types/' + translation.id + '/user-types-translations?where=' + JSON.stringify(whereClause), updatingTranslation)
      .then(response => response.data)
      .catch(error_handler)
  },
  updatePublished(id, is_published){
    return axiosInstance
    .patch('/user-types?[where][id]='+ id, {published: is_published})
    .then(response => response.data)
    .catch(error_handler)

  }, 
  saveUserTranslationProd (id) {
    return axiosInstance
      .get('/user-types/to-production?id=' + id)
      .then(response => response.data)
      .catch(error_handler)
  },
  deleteUserTranslationProd (id) {
    // create fake id here
    return axiosInstance
      .delete('/user-types/' + id + '/user-types-translation-prods')
      .then(response => response.data)
      .catch(error_handler)
  },
  fetchUserTranslated (id) {

    return axiosInstance
      .get('/user-types/' + id + '/user-types-translations')
      .then(response => response.data)
      .catch(error_handler)
  },
  exportUserType (id) {
    return axiosInstance
      .get('/user-types/' + id +'?filter[include][0][relation]=translations')
      .then(response => { return response.data })
      .catch(error_handler)
  }
}
