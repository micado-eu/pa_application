import client from 'api-settings-client'
/*
export function someAction (context) {
}
*/
export function fetchSettings (store, data) {
  const now = new Date().getTime()
  console.log(now)
  console.log(store.state.last_refresh)
  console.log(now - store.state.last_refresh)
  console.log(store.state.ttl)
  if ((now - store.state.last_refresh) > store.state.ttl) {
    console.log('i have to refresh')
    return client
      .fetchSettings()
      .then((settings) => {
        store.commit('setSettings', settings)
        store.commit('setLastRefreshn', now)
        return settings
      })
  }
  console.log('getting data from cache')
  console.log(store)
  return store.getters.settings
}

export function updateSetting (store, data) {
  console.log(data)
  client.updateSingleSetting(data)
    .then((res) => {
      console.log(res)
      //      console.log(store.state.settings)
      store.commit('setSetting', data)
      console.log(store.state.settings)

      return res
    })
}
export function saveSetting(store, data) {
  client.saveSetting(data).then((res) => {
    console.log(res)
    store.commit('setNewSetting', data)
    console.log(store.state.settings)

    return res

})
}