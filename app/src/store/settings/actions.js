import client from 'api-settings-client'
/*
export function someAction (context) {
}
*/
export function fetchSettings (store, data) {
  let now = new Date().getTime()
  console.log(now)
  console.log(store.state.last_refresh)
  console.log(now - store.state.last_refresh)
  console.log(store.state.ttl)
  if ((now - store.state.last_refresh) > store.state.ttl) {
    console.log("i have to refresh")
    return client
      .fetchSettings()
      .then(settings => {
        store.commit('setSettings', settings)
        store.commit('setLastRefreshn', now)
        return settings
      })
  } else {
    console.log("getting data from cache")
    console.log(store)
    return store.getters["settings"]
  }
}
