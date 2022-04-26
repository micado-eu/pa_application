import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'

export default {
  fetchGlossary() {
    return axiosInstance
      .get('/glossaries?filter[include][0][relation]=translations')
      .then(
        response => response.data
      ).catch(error_handler)
  },
  fetchGlossaryProd(defaultLang, userLang) {
    return axiosInstance
      .get(`/production-glossary?defaultlang=${defaultLang}&currentlang=${userLang}`, {
      })
      .then((response) => {
        return response.data
      })
      .catch(error_handler)
  },
  fetchGlossaryTemp(defaultLang, userLang) {
    return axiosInstance
      .get(`/temp-glossary?defaultlang=${defaultLang}&currentlang=${userLang}`, {
      })
      .then((response) => {
        return response.data
      })
      .catch(error_handler)
  },
  saveNewGlossaryItem(glossaryItem) {
    return axiosInstance
      .post('/glossaries', glossaryItem)
      .then(
        response => response.data
      ).catch(error_handler)
  },
  addNewGlossaryItemTranslation(translation) {
    if (!translation.translationDate) {
      translation.translationDate = new Date().toISOString()
    }
    return axiosInstance
      .post('/glossaries/' + translation.id + '/glossary-translations', translation)
      .then(response => response.data)
      .catch(error_handler)
  },
  saveGlossaryTranslationProd(id) {
    return axiosInstance
      .get(`/glossaries/to-production?id=${id}`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  editGlossaryItem(newItem) {
    return axiosInstance
      .patch('/glossaries/' + newItem.id, newItem)
      .then(
        response => response.data
      ).catch(error_handler)
  },
  editGlossaryItemTranslation(translation) {
    const whereClause = {
      id: { eq: translation.id }, lang: { eq: translation.lang }, translated: { eq: translation.translated }
    }
    if (!translation.translationDate) {
      translation.translationDate = new Date().toISOString()
    }
    return axiosInstance
      .patch('/glossaries/' + translation.id + '/glossary-translations?where=' + JSON.stringify(whereClause), translation)
      .then(response => response.data)
      .catch(error_handler)
  },
  deleteGlossaryItem(item) {
    // Delete translations then item
    return axiosInstance
      .delete('/glossaries/' + item.id + '/glossary-translations')
      .then(
        () => axiosInstance.delete(`/glossaries/${item.id}/glossary-translation-prods`)
      )
      .then(
        response => {
          return axiosInstance.delete('/glossaries/' + item.id)
        }
      ).then(response => response.data)
      .catch(error_handler)
  },
  deleteProdTranslations(id) {
    return axiosInstance
      .delete(`/glossaries/${id}/glossary-translation-prods`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  updatePublished(id, is_published){
    return axiosInstance
    .patch('/glossaries?[where][id]='+ id, {published: is_published})
    .then(response => response.data)
    .catch(error_handler)
  },
  import(file) {
    let formData = new FormData()
    formData.append('file', file)
    let postHeaders = axiosInstance.defaults.headers
    postHeaders['Content-Type'] = 'multipart/form-data'
    return axiosInstance.post('/glossaries/import',
      formData,
      {
        headers: postHeaders
      }
    )
    .then((response) => response.data)
    .catch(error_handler)
  },
  export(id) {
    return axiosInstance.get('/glossaries/export?id=' + id)
    .then((response) => {
      const blob = new Blob([response.data], { type: "text/csv;charset=utf-8" })
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", blobUrl)
      link.setAttribute("download", `glossary-${id}.csv`)
      document.body.appendChild(link) // Required for FF

      link.click()
      URL.revokeObjectURL(blobUrl) // Required for FF
    })
    .catch(error_handler)
  }
}
