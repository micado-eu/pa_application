import client from 'api-user_type-client'

/*
export function someAction (context) {
}
*/
export function fetchUserType(state, data) {
  return client
    .fetchUserType()
    .then(user_type => state.commit('setUserType', user_type))
}

export function editUserTypeElement(state, user_type_element) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(user_type_element)
  return client
    .updateUserType(user_type_element)
    .then(user_type_return => state.commit('editUserTypeElement', user_type_return))
}

export function saveUserTypeElement(state, user_type_element) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(user_type_element)
  return client
    .saveUserType(user_type_element)
    .then(user_type_return => state.commit('saveUserTypeElement', user_type_return))
}

export function deleteUserType(state, user_type_element) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(user_type_element)
  return client
    .deleteUserType(user_type_element)
    .then(user_type_return => state.commit('deleteUserType', user_type_return))
}


/*export function deleteDocument({commit}, document_type) {

  commit(delete_document_type, document_type.id)
} */