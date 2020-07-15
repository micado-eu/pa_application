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

export function addChart(state, chart) {
  console.log('action chart: ',chart)
  return client.addChart(chart)
    .then(res => {
      console.log("added chart: ", res)
      // state.commit('saveTopic', topic_element)
    })
}