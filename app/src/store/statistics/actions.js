import client from 'api-statistics-client'
/*
export function someAction (context) {
}
*/
export function fetchStatistics(state, data) {
  return client
    .fetchStatistics()
    .then(res => {
      state.commit('setCharts', res.charts)
      state.commit('setBoards', res.charts)
      state.commit('setCategories', res.charts)
    })
}

export function addChart(state, chart) {
  return client.addChart(chart)
    .then(res => {
      console.log("added chart: ", res)
      // state.commit('saveTopic', topic_element)
    })
}