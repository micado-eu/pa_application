import client from 'api-topic-client'

/*
export function someAction (context) {
}
*/
export function fetchTopic(state, data) {
  return client
    .fetchTopic()
    .then(topic => state.commit('setTopic', topic))
}

export function editTopic(state, topic_element) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(topic_element)
  return client
    .updateTopic(topic_element)
    .then(topic_return => state.commit('editTopic', topic_return))
}

export function saveTopic(state, topic_element) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(topic_element)
  return client
    .saveTopic(topic_element)
    .then(topic_return => state.commit('saveTopic', topic_return))
}

export function deleteTopic(state, topic_element) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(topic_element)
  return client
    .deleteTopic(topic_element)
    .then(topic_return => state.commit('deleteTopic', topic_return))
}


/*export function deleteDocument({commit}, document_type) {

  commit(delete_document_type, document_type.id)
} */