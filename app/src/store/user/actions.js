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
export function fetchKeycloakMigrantUser (state) {
  return client
    .fetchKeycloakMigrantUser()
    .then((user) => {
      state.commit('setKeycloakMigrantUser', user)
      return user
    })
}

export function fetchPAUser (state) {
  return client
    .fetchPAUser()
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

export function fetchSpecificUserMigrant (state, id) {
  console.log(id)
  // probably we could use the store and do a get but for now will do
  return client
    .fetchSpecificUserMigrant(id)
    .then((user) => {
      console.log('fetchSpecificUser - action')
      console.log(user)
      return user
    })
}

export function fetchSpecificKeycloakUserMigrant (state, id) {
  console.log("FETCHING A SINNGLE USER FROM KEYCLOAK")
  console.log(id)
  // probably we could use the store and do a get but for now will do
  return client
    .fetchSpecificKeycloakUserMigrant(id)
    .then((user) => {
      state.commit('setSpecificKeycloakUserMigrant', user)
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
    .editUserData(payload.userid, payload.firstName, payload.lastName, payload.email, payload.phoneNumber)
}

export function editUserDataWithRoles (state, payload) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(payload.user)
  return client
  .editUserDataByAdmin(payload.user).then((us)=>{
    console.log("editing roles")
    client.editUserRoles(payload.user.userid, payload.roles_to_add, payload.roles_to_delete)
  })
}
export function editUserPassword (state, payload) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(payload)
  return client
    .editUserPassword(payload.userid, payload.password)
}
export function savePAUser (state, payload) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(payload)
  return client
    .savePAUser(payload.user, payload.roles).then((user)=>{
      client.createUserDB({id:user[0].id, realm:'pa', group: ""})
      state.commit('addPaUser', user)

    })
}
export function fetchUserGroup (state, userid) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  return client
    .fetchUserGroup(userid)
}
export function getUserPic(state, userid){
  return client.fetchUserPic(userid).then((ret)=>{
    state.commit('setUserPic', ret)
    return ret
  })
}
/* export function deleteDocument({commit}, document_type) {
client.
  commit(delete_document_type, document_type.id)
} */
