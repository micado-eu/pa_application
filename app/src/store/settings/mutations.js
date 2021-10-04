/*
export function someMutation (state) {
}
*/
export function setSettings (state, settings) {
  if (settings) {
    state.settings = settings
  }
}

export function setSetting (state, setting) {
  if (setting) {
    state.settings.find(set => set.key === setting.key).value = setting.value
  }
}
export function setNewSetting (state, setting) {
  
    state.settings.push(setting)
  
}
export function setLastRefreshn (state, last_refresh) {
  if (last_refresh) {
    state.last_refresh = last_refresh
  }
}

export function setMixedSetting(state, settings){
  state.mixed_settings = settings
}

export function editMixedSetting(state, setting) {
  console.log("update the state")
  const index = state.mixed_settings.findIndex(item => item.id === setting.id)
  if (index !== -1) state.mixed_settings.splice(index, 1, setting)
}