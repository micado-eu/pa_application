import client from 'api-user-client'

/*
export function someAction (context) {
}
*/
export function fetchUser (state, data) {
  console.log(data)
  return client
    .fetchUser(data)
    .then((user) => {
      state.commit('setUser', user)
      return user
    })
}

export function fetchPAUser (state, data) {
  console.log(data)
  return client
    .fetchPAUser(data)
    .then((pauser) => {
      state.commit('setPAUser', pauser)
      return pauser
    })
}
export function fetchPAUseProfile (state, id) {
  console.log(id)
  return client
    .fetchPAUserProfile(id)
    .then((paUser) => {
      state.commit('setPAUserProfile', paUser)
      return paUser
    })
}

export function fetchSpecificUser (state, data) {
  console.log(data)
  // probably we could use the store and do a get but for now will do
  return client
    .fetchSpecificUser(data.tenantid, data.userid)
    .then((user) => {
      console.log('fetchSpecificUser - action')
      console.log(user)
      return user
    })
}

export function editUser (state, user) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(user)
  return client
    .updateUser(user)
    .then((user_return) => state.commit('editUser', user_return))
}

export function saveUser (state, user) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(user)
  return client
    .saveUser(user)
    .then((user_return) => state.commit('saveUser', user_return))
}

export function deleteUser (state, user) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(user)
  return client
    .deleteUser(user)
    .then((user_return) => state.commit('deleteUser', user_return))
}
export function saveUserPic (state, picture) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  return client
    .saveUserPicture(picture)
    .then((picture_return) => console.log(picture_return))
}
export function editUserPic (state, payload) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  return client
    .editUserPicture(payload.picture, payload.id)
    .then((picture_return) => console.log(picture_return))
}
export function editUserData (state, payload) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(payload)
  return client
    .editUserData(payload.user, payload.tenant, payload.token)
}
export function editUserPassword (state, payload) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(payload)
  return client
    .editUserPassword(payload.admin, payload.adminpwd, payload.payload, payload.tenant)
}
export function savePAUser (state, payload) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(payload)
  return client
    .savePAUser(payload.user, payload.roles, payload.tenant, payload.token)
}
/* export function deleteDocument({commit}, document_type) {

  commit(delete_document_type, document_type.id)
} */
