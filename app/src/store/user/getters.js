export function UserById (state) {
  let getterFunc = function (id) {
    return state.user.filter(user => user.umId == id)[0]
  }
  return getterFunc
}

export function users (state) {
  return state.user
}
export function paUserProfile (state) {
  console.log("aske for pa user profile")
  return state.paUserProfile
}

export function pausers (state) {
  return state.pauser
}