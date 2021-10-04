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
export function savePolicy(store, data) {
  client.savePolicy(data).then((res) => {
    console.log(res)
    var savingId= res.id
    data.translations.forEach((transl)=>{
      client.savePolicyTranslations(transl, savingId)
    })
    store.commit('setNewSetting', data)
    return res

})
}
export function updatePolicy (store, data) {
  console.log(data)
  client.updatePolicy(data)
    .then((res) => {
      console.log(res)
      data.translations.forEach((transl)=>{
        client.updatePolicyTranslations(transl)
      })
      //store.commit('setSetting', data)
      console.log(store.state.settings)

      return res
    })
}
export function fetchMixedSettings(store, data){
  return client.fetchMixedSettings().then((ret)=>{
    console.log("I AM THE PRIVACY POLICY")
    console.log(ret)
    store.commit('setMixedSetting', ret)
    return ret
  })
}

export function updatePublished(state, payload){
  client.updatePublished(payload.setting.id, payload.published).then(()=>{
    payload.setting.published = payload.published
    state.commit('editMixedSetting', payload.setting)
  })
}
export function saveTranslationProd(state, id){
  client.deleteSettingTranslationProd(id).then(()=>{
    console.log("deleted previous translations")
    client.saveSettingTranslationProd(id)
   })
}
export function deleteTranslationProd(state, id){
  console.log("in delete transl prod")
  client.deleteSettingTranslationProd(id)
}