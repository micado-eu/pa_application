import { axiosInstance }  from 'boot/axios'
import { error_handler } from '../../../helper/utility'


export default {
  fetchIntegrationCategory () {
    return axiosInstance
      .get('/backend/1.0.0/intervention-categories?filter[include][0][relation]=translations')
      .then(response => { return response.data })
      .catch(error_handler);
  },
  

    updateIntegrationCategory (integration_category) {
      const whereClause = {
        id: { eq: integration_category.id }
      },
        updatingCategory =  JSON.parse(JSON.stringify(integration_category, ['id']))
  
      return axiosInstance
        .patch('/backend/1.0.0/intervention-categories?where=' + JSON.stringify(whereClause), updatingCategory)
        .then(response => response.data)
        .catch(error_handler);
    },
  
    updateIntegrationCategoryTranslation (translation) {
      const whereClause = {
        id: { eq: translation.id }, lang: { eq: translation.lang }
      },
        updatingTranslation = (translation.translationDate == null) ? JSON.parse(JSON.stringify(translation, ['id', 'lang', 'title'])) : translation
  
      return axiosInstance
        .patch('/backend/1.0.0/intervention-categories/' + translation.id + '/intervention-category-translations?where=' + JSON.stringify(whereClause), updatingTranslation)
        .then(response => response.data)
        .catch(error_handler);
    },
    
    saveIntegrationCategory (integration_category) {
      // create fake id here
      return axiosInstance
      .post('/backend/1.0.0/intervention-categories', integration_category)
      .then(response => response.data)
      .catch(error_handler);
    },
    saveIntegrationCategoryTranslation (translation, id) {
      translation.id = id
      const savingTranslation = JSON.parse(JSON.stringify(translation));
  
      // create fake id here
      return axiosInstance
        .post('/backend/1.0.0/intervention-categories/' + id + '/intervention-category-translations', savingTranslation)
        .then(response => response.data)
        .catch(error_handler);
    },
    deleteIntegrationCategoryTranslations (id) {
      return axiosInstance
        .delete('/backend/1.0.0/intervention-categories/' + id + '/intervention-category-translations')
        .then(response => response.data)
        .catch(error_handler);
    },
  
    deleteIntegrationCategory (id) {
      return axiosInstance
        .delete('/backend/1.0.0/intervention-categories/' + id)
        .then(response => response.data)
        .catch(error_handler);
    },
    updatePublished(id, is_published){
      return axiosInstance
      .patch('/backend/1.0.0/intervention-categories?[where][id]='+ id, {published: is_published})
      .then(response => response.data)
      .catch(error_handler);
  
    }, 
    saveCategoryTranslationProd (translation, id) {
      const savingTranslation = JSON.parse(JSON.stringify(translation, ['id', 'lang', 'title']));
  
      // create fake id here
      return axiosInstance
        .post('/backend/1.0.0/intervention-categories/' + id + '/intervention-category-translation-prods', savingTranslation)
        .then(response => response.data)
        .catch(error_handler);
    },
    deleteCategoryTranslationProd (id) {
      // create fake id here
      return axiosInstance
        .delete('/backend/1.0.0/intervention-categories/' + id + '/intervention-category-translation-prods')
        .then(response => response.data)
        .catch(error_handler);
    },
    fetchCategoryTranslated (id) {
  
      return axiosInstance
        .get('/backend/1.0.0/intervention-categories/' + id + '/intervention-category-translations')
        .then(response => response.data)
        .catch(error_handler);
    },
  }
