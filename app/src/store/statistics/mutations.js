/*
export function someMutation (state) {
}
*/
export function setTimeseries(state, timeseries) {
  if (timeseries) {
    state.timeseries = timeseries
  }
}
export function setOrigin(state, origin) {
  if (origin) {
    state.origin = origin
  }
}

export function setMigrants(state, migrants) {
  if (migrants) {
    state.migrants = migrants
  }
}
