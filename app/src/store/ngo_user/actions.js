import client from 'api-ngo_user-client'

/*
export function someAction (context) {
}
*/
export function fetchTenant(state, data) {
  return client
    .fetchTenant()
    .then(tenant => state.commit('setUser', tenant))
}

export function editUser(state, user) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(user)
  return client
    .updateUser(user)
    .then(user_return => state.commit('editUser', user_return))
}

export function saveUser(state, user) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(user)
  return client
    .saveUser(user)
    .then(user_return => state.commit('saveUser', user_return))
}

export function deleteUser(state, user) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(user)
  return client
    .deleteUser(user)
    .then(user_return => state.commit('deleteUser', user_return))
}


/*export function deleteDocument({commit}, document_type) {

  commit(delete_document_type, document_type.id)
} */