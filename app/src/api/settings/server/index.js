import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'


export default {
    fetchSettings () {
        return axiosInstance
            .get('/backend/1.0.0/settings')
            .then((response) => {
                return response.data
            })
            .catch(error_handler)
    },
    updateSingleSetting (data) {
        console.log(data)
        return axiosInstance
            .patch('/backend/1.0.0/settings/' + data.key, data)
            .then((response) => {
                return response.data
            })
            .catch(error_handler)
    },
    saveSetting(data){
        return axiosInstance
        .post('/backend/1.0.0/settings/', data)
        .then((response) => {
            return response.data
        })
        .catch(error_handler)
    },
    savePolicy(data){
        const savinPolicy = JSON.parse(JSON.stringify(data, ['key', 'published']))
        return axiosInstance
        .post('/backend/1.0.0/t-settings/', savinPolicy)
        .then((response) => {
            return response.data
        })
        .catch(error_handler)
    },
    updatePolicy (data) {
        console.log(data)
        const updatingPolicy = JSON.parse(JSON.stringify(data, ['key', 'published']))

        return axiosInstance
            .patch('/backend/1.0.0/t-settings/' + data.id, updatingPolicy)
            .then((response) => {
                return response.data
            })
            .catch(error_handler)
    },
    savePolicyTranslations(translation, id){
        const savingTranslation = JSON.parse(JSON.stringify(translation, [ 'lang', 'value', 'translationState', 'translationDate', 'translated']))
        return axiosInstance
        .post('/backend/1.0.0/t-settings/' + id +'/t-settings-translations', savingTranslation)
        .then((response) => {
            return response.data
        })
        .catch(error_handler)
    },
    updatePolicyTranslations (translation) {
        const whereClause = {
            id: { eq: translation.id }, lang: { eq: translation.lang }, translated: {eq: translation.translated}
          }
          const savingTranslation = JSON.parse(JSON.stringify(translation, [ 'lang', 'value', 'translationState', 'translationDate', 'translated']))

          return axiosInstance
            .patch('/backend/1.0.0/t-settings/'+ translation.id + '/t-settings-translations?where='+JSON.stringify(whereClause), savingTranslation)
            .then((response) => {
                return response.data
            })
            .catch(error_handler)
    },
    fetchMixedSettings () {
        return axiosInstance
            .get('/backend/1.0.0/t-settings?filter[include][0][relation]=translations')
            .then((response) => {
                return response.data
            })
            .catch(error_handler)
    },
    updatePublished(id, is_published){
        return axiosInstance
        .patch('/backend/1.0.0/t-settings?[where][id]='+ id, {published: is_published})
        .then(response => response.data)
        .catch(error_handler)
    
      },
      saveSettingTranslationProd (id) {

        // create fake id here
        return axiosInstance
          .get('/backend/1.0.0/t-settings/to-production?id='+ id)
          .then(response => response.data)
          .catch(error_handler)
      },
      deleteSettingTranslationProd (id) {
        // create fake id here
        return axiosInstance
          .delete('/backend/1.0.0/t-settings/' + id + '/t-settings-translation-prods')
          .then(response => response.data)
          .catch(error_handler)
      }
}
