import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchIntegrationType () {
    console.log('CALLING API!!!!')
    return axiosInstance
      //      .get('/db/v01/intervention_category?lang=eq.en')
      .get('/backend/1.0.0/intervention-types?filter[include][0][relation]=translations&filter[include][1][relation]=interventionTypeValidators')
      .then((response) => response.data)
      .catch(error_handler)
  },

  updateIntegrationType (integration_type) {
    const whereClause = {
      id: { eq: integration_type.id }
    }
    const updatingCategory = JSON.parse(JSON.stringify(integration_type, ['id', 'categoryType']))

    return axiosInstance
      .patch(`/backend/1.0.0/intervention-types?where=${JSON.stringify(whereClause)}`, updatingCategory)
      .then((response) => response.data)
      .catch(error_handler)
  },

  updateIntegrationTypeTranslation (translation) {
    const whereClause = {
      id: { eq: translation.id }, lang: { eq: translation.lang }
    }
    const updatingTranslation = (translation.translationDate == null) ? JSON.parse(JSON.stringify(translation, ['id', 'lang', 'interventionTitle', 'description'])) : translation

    return axiosInstance
      .patch(`/backend/1.0.0/intervention-types/${translation.id}/intervention-types-translations?where=${JSON.stringify(whereClause)}`, updatingTranslation)
      .then((response) => response.data)
      .catch(error_handler)
  },

  saveIntegrationType (integration_type) {
    // create fake id here
    return axiosInstance
      .post('/backend/1.0.0/intervention-types', integration_type)
      .then((response) => response.data)
      .catch(error_handler)
  },
  saveIntegrationTypeTranslation (translation, id) {
    translation.id = id
    const savingTranslation = JSON.parse(JSON.stringify(translation))

    // create fake id here
    return axiosInstance
      .post(`/backend/1.0.0/intervention-types/${id}/intervention-types-translations`, savingTranslation)
      .then((response) => response.data)
      .catch(error_handler)
  },
  deleteIntegrationTypeTranslations (id) {
    return axiosInstance
      .delete(`/backend/1.0.0/intervention-types/${id}/intervention-types-translations`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  deleteInterventionByType(type){
    return axiosInstance
    .delete('/backend/1.0.0/individual-intervention-plan-interventions?[where][interventionType]='+ type)
    .then(response => response.data)
    .catch(error_handler);
  },
  deleteInterventionTypeValidators(id){
    return axiosInstance
    .delete('/backend/1.0.0/intervention-types/' + id + '/intervention-type-validators?[where][interventionTypeId]='+ id)
    .then(response => response.data)
    .catch(error_handler);
  },
  saveIntegrationTypeValidators (validator, id) {
    //  translation.id = id
    let savingValidator = { tenantId: validator, interventionTypeId: id }
    //   const savingTranslation = JSON.parse(JSON.stringify(translation))

    // create fake id here
    return axiosInstance
      .post(`/backend/1.0.0/intervention-types/${id}/intervention-type-validators`, savingValidator)
      .then((response) => response.data)
      .catch(error_handler)
  },
  deleteIntegrationTypeValidators (id) {
    return axiosInstance
      .delete(`/backend/1.0.0/intervention-types/${id}/intervention-type-validators`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  deleteIntegrationType (id) {
    return axiosInstance
      .delete(`/backend/1.0.0/intervention-types/${id}`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  updatePublished(id, is_published){
    return axiosInstance
    .patch('/backend/1.0.0/intervention-types?[where][id]='+ id, {published: is_published})
    .then(response => response.data)
    .catch(error_handler);

  }, 
  saveTypeTranslationProd (translation, id) {
    const savingTranslation = JSON.parse(JSON.stringify(translation, ['id', 'lang', 'interventionTitle', 'description']));

    // create fake id here
    return axiosInstance
      .post('/backend/1.0.0/intervention-types/' + id + '/intervention-types-translation-prods', savingTranslation)
      .then(response => response.data)
      .catch(error_handler);
  },
  deleteTypeTranslationProd (id) {
    // create fake id here
    return axiosInstance
      .delete('/backend/1.0.0/intervention-types/' + id + '/intervention-types-translation-prods')
      .then(response => response.data)
      .catch(error_handler);
  },
  fetchTypeTranslated (id) {

    return axiosInstance
      .get('/backend/1.0.0/intervention-types/' + id + '/intervention-types-translations')
      .then(response => response.data)
      .catch(error_handler);
  },
}
