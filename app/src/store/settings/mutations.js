/*
export function someMutation (state) {
}
*/
export function setSettings (state, settings) {
  if (settings) {
    state.settings = settings
  }
}
export function setLastRefreshn (state, last_refresh) {
  if (last_refresh) {
    state.last_refresh = last_refresh
  }
}
