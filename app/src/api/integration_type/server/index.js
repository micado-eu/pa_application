import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchIntegrationType () {
    console.log('CALLING API!!!!')
    return axiosInstance
      //      .get('/db/v01/intervention_category?lang=eq.en')
      .get('/intervention-types?filter[include][0][relation]=translations&filter[include][1][relation]=interventionTypeValidators')
      .then((response) => response.data)
      .catch(error_handler)
  },

  updateIntegrationType (integration_type) {
    const whereClause = {
      id: { eq: integration_type.id }
    }
    const updatingCategory = JSON.parse(JSON.stringify(integration_type, ['id', 'categoryType', 'published']))

    return axiosInstance
      .patch(`/intervention-types?where=${JSON.stringify(whereClause)}`, updatingCategory)
      .then((response) => response.data)
      .catch(error_handler)
  },

  updateIntegrationTypeTranslation (translation) {
    const whereClause = {
      id: { eq: translation.id }, lang: { eq: translation.lang }, translated: {eq: translation.translated}
    }
    const updatingTranslation = (translation.translationDate == null) ? JSON.parse(JSON.stringify(translation, ['id', 'lang', 'interventionTitle', 'description', 'translationState', 'translationDate', 'translated'])) : translation

    return axiosInstance
      .patch(`/intervention-types/${translation.id}/intervention-types-translations?where=${JSON.stringify(whereClause)}`, updatingTranslation)
      .then((response) => response.data)
      .catch(error_handler)
  },

  saveIntegrationType (integration_type) {
    // create fake id here
    return axiosInstance
      .post('/intervention-types', integration_type)
      .then((response) => response.data)
      .catch(error_handler)
  },
  saveIntegrationTypeTranslation (translation, id) {
    translation.id = id
    const savingTranslation = JSON.parse(JSON.stringify(translation))

    // create fake id here
    return axiosInstance
      .post(`/intervention-types/${id}/intervention-types-translations`, savingTranslation)
      .then((response) => response.data)
      .catch(error_handler)
  },
  deleteIntegrationTypeTranslations (id) {
    return axiosInstance
      .delete(`/intervention-types/${id}/intervention-types-translations`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  deleteInterventionByType(id){
    return axiosInstance
    .delete('/intervention-types/' + id + '/individual-intervention-plan-interventions')
    .then(response => response.data)
    .catch(error_handler)
  },
  deleteInterventionTypeValidators(id){
    return axiosInstance
    .delete('/intervention-types/' + id + '/intervention-type-validators?[where][interventionTypeId]='+ id)
    .then(response => response.data)
    .catch(error_handler)
  },
  saveIntegrationTypeValidators (validator, id) {
    //  translation.id = id
    let savingValidator = { tenantId: validator, interventionTypeId: id }
    //   const savingTranslation = JSON.parse(JSON.stringify(translation))

    // create fake id here
    return axiosInstance
      .post(`/intervention-types/${id}/intervention-type-validators`, savingValidator)
      .then((response) => response.data)
      .catch(error_handler)
  },
  deleteIntegrationTypeValidators (id) {
    return axiosInstance
      .delete(`/intervention-types/${id}/intervention-type-validators`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  deleteIntegrationType (id) {
    return axiosInstance
      .delete(`/intervention-types/${id}`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  updatePublished(id, is_published){
    return axiosInstance
    .patch('/intervention-types?[where][id]='+ id, {published: is_published})
    .then(response => response.data)
    .catch(error_handler)

  }, 
  saveTypeTranslationProd (id) {

    // create fake id here
    return axiosInstance
      .get('/intervention-types/to-production?id=' + id)
      .then(response => response.data)
      .catch(error_handler)
  },
  deleteTypeTranslationProd (id) {
    // create fake id here
    return axiosInstance
      .delete('/intervention-types/' + id + '/intervention-types-translation-prods')
      .then(response => response.data)
      .catch(error_handler)
  },
  fetchTypeTranslated (id) {

    return axiosInstance
      .get('/intervention-types/' + id + '/intervention-types-translations')
      .then(response => response.data)
      .catch(error_handler)
  },
  exportType (id) {
    return axiosInstance
      .get('/intervention-types/' + id +'?filter[include][0][relation]=translations')
      .then(response => { return response.data })
      .catch(error_handler)
  }
}
