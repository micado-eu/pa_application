import { axiosInstance } from 'boot/axios'

function error_handler(error) {
  console.log("ERROR IN CALLING API MANAGER")
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
  console.log(error.config);
}

export default {
  fetchTopic() {
    return axiosInstance
      .get('/backend/1.0.0/topics?filter[include][0][relation]=translations')
      .then(response => response.data)
      .catch(error_handler);
  },
  saveTopic(topic) {
    // create fake id here
    return axiosInstance
      .post('/backend/1.0.0/topics', topic)
      .then(response => response.data)
      .catch(error_handler);
  },
  saveTopicTranslation(translation, id) {
    translation.id = id
    const savingTranslation = JSON.parse(JSON.stringify(translation, ['id', 'lang', 'topic']));
    
    // create fake id here
    return axiosInstance
      .post('/backend/1.0.0/topics/' + id + '/topic-translations', savingTranslation)
      .then(response => response.data)
      .catch(error_handler);
  },

  deleteTopicTranslations(id) {
    return axiosInstance
      .delete('/backend/1.0.0/topics/' + id + '/topic-translations')
      .then(response => response.data)
      .catch(error_handler);
  },

  deleteTopic(id) {
    return axiosInstance
      .delete('/backend/1.0.0/topics/' + id)
      .then(response => response.data)
      .catch(error_handler);
  },

  updateTopic(topic) {
    const whereClause = {
      id: { eq: topic.id }
    },
      updatingTopic = (topic.publicationDate == null) ? JSON.parse(JSON.stringify(topic, ['id', 'icon', 'published'])) : topic

    return axiosInstance
      .patch('/backend/1.0.0/topics?where=' + JSON.stringify(whereClause), updatingTopic)
      .then(response => response.data)
      .catch(error_handler);
  },

  updateTopicTranslation(translation) {
    const whereClause = {
      id: { eq: translation.id }, lang: { eq: translation.lang }
    },
      updatingTranslation = (translation.translationDate == null) ? JSON.parse(JSON.stringify(translation, ['id', 'lang', 'topic'])) : translation

    return axiosInstance
      .patch('/backend/1.0.0/topics/' + translation.id + '/topic-translations?where=' + JSON.stringify(whereClause), updatingTranslation)
      .then(response => response.data)
      .catch(error_handler);
  }
}
