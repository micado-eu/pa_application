import client from 'api-statistics-client'
/*
export function someAction (context) {
}
*/
export function fetchStatistics(state, data) {
  return client
    .fetchStatistics()
    .then(statistics => state.commit('setStatistics', statistics))
}
