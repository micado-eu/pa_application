/**
 * FIXME: handle exceptions in JSON parsing
 */
export function setCharts(state, charts) {
  if (charts) {
    state.charts = []
    charts.forEach((c) => {
      /**
       * format all strings
       */
      Object.keys(c).forEach((key) => {
        c[key] = typeof c[key] === 'string' ? c[key].trim() : c[key]
      })
      if (typeof c.content === 'string') {
        try {
          c.content = JSON.parse(c.content)

          /**
           * process individual rows of data
           */
          c.content.forEach((item) => {
            if (Array.isArray(item[c.x])) item[c.x] = item[c.x][0]
            if (Array.isArray(item[c.y])) item[c.y] = item[c.y][0]

            item[c.y] = typeof item[c.y] === 'number' ? item[c.y] : parseInt(item[c.y], 10)
          })
          /**
           * sort x-axis values if xistime
           */
          // Removed Bar chart
          //  if ((c.type === 'LINE' || c.type === 'BAR') && c.xistime) {

           if ((c.type === 'LINE' || c.type === 'BAR') && c.xistime) {
            c.content.forEach((item) => {
              item[c.time] = new Date(item[c.x]).getTime()
            })
            c.content = c.content.sort(
              (a, b) => a[c.time] - b[c.time]
            )
          }
          state.charts.push(c)
        } catch (err) {
          console.log(err)
        }
      }
    })
  }
}

export function setBoards(state, charts) {
  if (charts) {
    state.boards = Array.from(new Set(charts.map((g) => g.board)))
  }
}

export function setCategories(state, charts) {
  if (charts) {
    const list = charts.map((g) => ({ category: g.category, board: g.board }))
    const uniqueList = Array.from(new Set(list.map((d) => JSON.stringify(d))))
    state.categories = uniqueList.map((d) => JSON.parse(d))
  }
}

export function setLastRefresh(state, last_refresh) {
  if (last_refresh) {
    state.last_refresh = last_refresh
  }
}

export function deleteChart(state, index) {
  const idx = state.charts.findIndex(chart => chart.id === index)
  console.log("found ID: ", idx)
  console.log("found ID: ", state.charts[idx])
  if (idx !== -1) state.charts.splice(idx, 1)
}