import { axiosInstance } from 'boot/axios'
import { error_handler } from '../../../helper/utility'


export default {
  fetchFlows () {
    return axiosInstance
      .get('/backend/1.0.0/processes?filter[include][0][relation]=translations&filter[include][1][relation]=processTopics&filter[include][2][relation]=applicableUsers')
      .then(response => { return response.data })
      .catch(error_handler);
  },
  fetchDocuments () {
    return fetch(flows, 1000) // wait 1s before returning posts
  },
  updateProcess (process) {
    console.log("fake call to update DB")
    console.log(process)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(process)
      }, 0)
    })
  },

  deleteProcessTranslations (id) {
    return axiosInstance
      .delete('/backend/1.0.0/processes/' + id + '/process-translations')
      .then(response => response.data)
      .catch(error_handler);
  },

  deleteProcess (id) {
    return axiosInstance
      .delete('/backend/1.0.0/processes/' + id)
      .then(response => response.data)
      .catch(error_handler);
  },
  deleteProcessTopic (id) {
    return axiosInstance
      .delete('/backend/1.0.0/processes/' + id + '/process-topics')
      .then(response => response.data)
      .catch(error_handler);
  },
  deleteProcessUser (id) {
    return axiosInstance
      .delete('/backend/1.0.0/processes/' + id + '/process-users')
      .then(response => response.data)
      .catch(error_handler);
  },
  saveProcess (process) {
    console.log("call to save to DB")
    console.log(process)
    // create fake id here

    return axiosInstance
      .post('/backend/1.0.0/processes', process)
      .then(response => response.data)
      .catch(error_handler);
  },
  saveProcessTranslation (translation, id) {
    translation.id = id
    const savingTranslation = JSON.parse(JSON.stringify(translation, ['id', 'lang', 'process', 'description']));

    // create fake id here
    return axiosInstance
      .post('/backend/1.0.0/processes/' + id + '/process-translations', savingTranslation)
      .then(response => response.data)
      .catch(error_handler);
  },
  saveProcessTopic (topic_id, id) {
    const savingTranslation = { idProcess: id, idTopic: topic_id }

    // create fake id here
    return axiosInstance
      .post('/backend/1.0.0/processes/' + id + '/process-topics', savingTranslation)
      .then(response => response.data)
      .catch(error_handler);
  },
  saveProcessUser (user_id, id) {
    const savingTranslation = { idProcess: id, idUserTypes: user_id }

    // create fake id here
    return axiosInstance
      .post('/backend/1.0.0/processes/' + id + '/process-users', savingTranslation)
      .then(response => response.data)
      .catch(error_handler);
  },

  updateProcess (process) {
    const whereClause = {
      id: { eq: process.id }
    },
      updatingProcess= (process.publicationDate == null) ? JSON.parse(JSON.stringify(process, ['id', 'link', 'published'])) : process

    return axiosInstance
      .patch('/backend/1.0.0/processes?where=' + JSON.stringify(whereClause), updatingProcess)
      .then(response => response.data)
      .catch(error_handler);
  },
  updateProcessUser (process) {
    const whereClause = {
      idProcess: { eq: process.id }
    },
      updatingProcessUser=  JSON.parse(JSON.stringify(process.applicableUsers, ['idProcess', 'idUserTypes']))

    return axiosInstance
      .patch('/backend/1.0.0/processes' + process.id + 'process-users?where=' + JSON.stringify(whereClause), updatingProcessUser)
      .then(response => response.data)
      .catch(error_handler);
  },
  updateProcessTopic (process) {
    const whereClause = {
      idProcess: { eq: process.id }
    },
      updatingProcessTopic=  JSON.parse(JSON.stringify(process.applicableUsers, ['idProcess', 'idTopic']))

    return axiosInstance
      .patch('/backend/1.0.0/processes' + process.id + 'process-topics?where=' + JSON.stringify(whereClause), updatingProcessTopic)
      .then(response => response.data)
      .catch(error_handler);
  },

  updateProcessTranslation (translation) {
    const whereClause = {
      id: { eq: translation.id }, lang: { eq: translation.lang }
    },
      updatingTranslation = (translation.translationDate == null) ? JSON.parse(JSON.stringify(translation, ['id', 'lang', 'prcess', 'description'])) : translation

    return axiosInstance
      .patch('/backend/1.0.0/processes/' + translation.id + '/process-translations?where=' + JSON.stringify(whereClause), updatingTranslation)
      .then(response => response.data)
      .catch(error_handler);
  }

}
