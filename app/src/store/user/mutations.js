/*
export function someMutation (state) {
}
*/

export function setUser (state, user) {
  state.user = user
}

export function setKeycloakMigrantUser (state, user) {
  state.keycloakMigrantUser = user
}

export function setPAUser (state, pauser) {
  state.pauser = pauser
}

export function setPAUserProfile (state, paUserProfile) {
  console.log("in pa user mutation")
  state.paUserProfile = paUserProfile
}
export function editUser (state, user) {
  console.log("update the state")
  const index = state.user.findIndex(item => item.id === user.id)
  if (index !== -1) state.user.splice(index, 1, user)
}

export function saveUser (state, user) {
  console.log("save to the state")
  console.log(user)

  state.user.push(user)
  console.log(state.user)
}

export function deleteUser (state, index) {
  const idx = state.user.findIndex(item => item.id === index)
  if (idx !== -1) state.user.splice(idx, 1)
}
export function setUserPic(state, userPic){
  state.userPic = userPic
}
/*export function delete_document_type (state, document_typeId) {
  let document_types = state.document_type.filter(d => d.id != document_typeId)
  state.document_type = document_types
}*/
