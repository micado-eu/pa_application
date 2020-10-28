import { axiosInstance } from 'boot/axios'

function error_handler (error) {
  console.log('ERROR IN CALLING API MANAGER')
  if (error.response) {
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    console.log(error.request)
  } else {
    console.log('Error', error.message)
  }
  console.log(error.config)
}

export default {
  fetchDocumentType () {
    return axiosInstance
      .get('/backend/1.0.0/document-types?filter[include][0][relation]=translations&filter[include][1][relation]=pictures&filter[include][2][relation]=validators')
      .then((response) => response.data)
      .catch(error_handler)
  },
  saveDocumentType (doc) {
    // create fake id here
    return axiosInstance
      .post('/backend/1.0.0/document-types', doc)
      .then((response) => response.data)
      .catch(error_handler)
  },
  saveDocumentTypeValidators(docid, validatorid){
    const doc_validator = {validableByTenant:validatorid }
    return axiosInstance
      .post(`/backend/1.0.0/document-types/${docid}/document-type-validators`, doc_validator)
      .then((response) => response.data)
      .catch(error_handler)
  },
  saveDocumentTypeTranslation (translation, id) {
    translation.id = id
    const savingTranslation = JSON.parse(JSON.stringify(translation, ['lang', 'document', 'description']))

    // create fake id here
    return axiosInstance
      .post(`/backend/1.0.0/document-types/${id}/document-type-translations`, savingTranslation)
      .then((response) => response.data)
      .catch(error_handler)
  },
  saveDocumentTypePictures (pictures, id, order) {
    pictures.documentTypeId = id
    pictures.order = order
    const savingPicture = JSON.parse(JSON.stringify(pictures, ['image', 'documentTypeId', 'order']))
    // create fake id here
    return axiosInstance
      .post(`/backend/1.0.0/document-types/${id}/document-type-pictures`, savingPicture)
      .then((response) => {return response.data})
      .catch(error_handler)
  },
  saveHotspots(spot){
    const savingSpot = JSON.parse(JSON.stringify(spot, ['x', 'y', 'pictureId']))
    return axiosInstance
    .post('/backend/1.0.0/picture-hotspots', savingSpot)
    .then(response => response.data)
    .catch(error_handler);
  },
  saveHotspotTranslation (translation, id) {
    translation.phtId = id
    const savingTranslation = JSON.parse(JSON.stringify(translation, ['lang', 'title', 'message']))

    // create fake id here
    return axiosInstance
      .post(`/backend/1.0.0/picture-hotspots/${id}/picture-hotspot-translations`, savingTranslation)
      .then((response) => response.data)
      .catch(error_handler)
  },
  deleteDocumentTypePicturesHotspotsTranslations(id) {
    return axiosInstance
      .delete(`/backend/1.0.0/picture-hotspots/${id}/picture-hotspot-translations`)
      .then(response => response.data)
      .catch(error_handler);
  },
  deleteDocumentTypePicturesHotspots(id) {
    return axiosInstance
      .delete(`/backend/1.0.0/picture-hotspots/${id}`)
      .then(response => response.data)
      .catch(error_handler);
  },
  deleteDocumentTypePictures (id) {
    return axiosInstance
      .delete(`/backend/1.0.0/document-types/${id}/document-type-pictures`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  deleteDocumentTypeTranslation (id) {
    return axiosInstance
      .delete(`/backend/1.0.0/document-types/${id}/document-type-translations`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  deleteDocumentTypeValidators (id) {
    return axiosInstance
      .delete(`/backend/1.0.0/document-types/${id}/document-type-validators`)
      .then((response) => response.data)
      .catch(error_handler)
  },

  deleteDocumentType (id) {
    return axiosInstance
      .delete(`/backend/1.0.0/document-types/${id}`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  deleteHotpotTranslation (id) {
    return axiosInstance
      .delete(`/backend/1.0.0/picture-hotspots/${id}/picture-hotspot-translations`)
      .then((response) => response.data)
      .catch(error_handler)
  },

  deleteHotspot (id) {
    return axiosInstance
      .delete(`/backend/1.0.0/picture-hotspots/${id}`)
      .then((response) => response.data)
      .catch(error_handler)
  },
  updateDocumentType (doc) {
    const whereClause = {
      id: { eq: doc.id }
    }
    const updatingDocumentType = JSON.parse(JSON.stringify(doc, ['id', 'icon']))

    return axiosInstance
      .patch(`/backend/1.0.0/document-types?where=${JSON.stringify(whereClause)}`, updatingDocumentType)
      .then((response) => response.data)
      .catch(error_handler)
  },

  updateDocumentTypeTranslation (translation) {
    const whereClause = {
      id: { eq: translation.id }, lang: { eq: translation.lang }
    }
    const updatingTranslation = (translation.translationDate == null) ? JSON.parse(JSON.stringify(translation, ['lang', 'document', 'description'])) : translation

    return axiosInstance
      .patch(`/backend/1.0.0/document-types/${translation.id}/document-type-translations?where=${JSON.stringify(whereClause)}`, updatingTranslation)
      .then((response) => response.data)
      .catch(error_handler)
  },
  updateDocumentTypePictures (picture) {
    const whereClause = {
      documentTypeId: { eq: picture.id }
    }
    const updatingDocumentTypePictures = JSON.parse(JSON.stringify(picture, ['image']))

    return axiosInstance
      .patch(`/backend/1.0.0/document-types/${picture.id}/document-type-pictures?where=${JSON.stringify(whereClause)}`, updatingDocumentTypePictures)
      .then((response) => response.data)
      .catch(error_handler)
  }
}
