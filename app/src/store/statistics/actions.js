import client from 'api-statistics-client'
/*
export function someAction (context) {
}
*/
export function fetchStatistics(state, data) {
  return client
    .fetchStatistics()
    .then(res => {
      state.commit('setTimeseries', res.timeseries)
      state.commit('setOrigin', res.origin)
      state.commit('setMigrants', res.migrants)
      state.commit('setCharts', res.charts)
      state.commit('setBoards', res.charts)
      state.commit('setCategories', res.charts)
    })
}
