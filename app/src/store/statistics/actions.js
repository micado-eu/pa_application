import client from 'api-statistics-client'
/*
export function someAction (context) {
}
*/
export function fetchStatistics(store, data) {
  const now = new Date().getTime()

  if ((now - store.state.last_refresh) > store.state.ttl) {
    return client
      .fetchStatistics()
      .then(res => {
        store.commit('setCharts', res.charts)
        store.commit('setBoards', res.charts)
        store.commit('setCategories', res.charts)
        store.commit('setLastRefresh', now)
      })
  }
  return store.getters.getStats
}

export function addChart(store, chart) {
  const now = new Date().getTime()
  return client.addChart(chart)
    .then((res) => {
      return client.fetchStatistics()
    })
    .then(res => {
      store.commit('setCharts', res.charts)
      store.commit('setBoards', res.charts)
      store.commit('setCategories', res.charts)
      store.commit('setLastRefresh', now)
    })
}