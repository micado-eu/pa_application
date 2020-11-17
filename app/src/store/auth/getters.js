export function user (state) {
  return state.user
}

export function token (state) {
  console.log("TOKEN GETTER")
  console.log(state)
  return state.token
}

export function loggedIn (state) {
  return state.user !== null
}

export const check = state => roles => {
  const user = state.user
  console.log("getter check")
  console.log(roles)
  if (user) {
    if (Array.isArray(roles) && roles.length) {
      for (let role of roles) {
        if (!user.roleNames.includes(role)) {
          console.log("returning false")
          return false
        }
      }
    } else if (roles) {
      if (!user.roleNames.includes(roles)) {
        console.log("returning false")
        return false
      }
    }
    console.log("returning true")
    return true
  }
  return false
}
