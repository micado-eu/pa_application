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

export function setCharts(state, charts) {
  if (charts) {
    charts.forEach(c => {
      /**
       * format all strings
       */
      Object.keys(c).forEach(key => {
        if (typeof c[key] === "string") {
          c[key] = c[key].trim();
        }
      });
      if (typeof c.content === "string") {
        c.content = JSON.parse(c.content);
      }
      if (c.board) c.board = c.board.toLowerCase();
      if (c.category) c.category = c.category.toLowerCase();
      /**
       * process individual rows of data
       */
      c.content.forEach(item => {
        if (Array.isArray(item[c.x])) item[c.x] = item[c.x][0];
        if (Array.isArray(item[c.y])) item[c.y] = item[c.y][0];

        item[c.x] = c.xistime ? new Date(item[c.x]).getTime() : item[c.x];
        item[c.y] = typeof item[c.y] === "number" ? item[c.y] : parseInt(item[c.y]);
      });
      /**
       * sort x-axis values if x is time
       */
      if (c.xistime) {
        c.content = c.content.sort(
          (a, b) => b[c.x] - a[c.x]
        );
      }
    })
    state.charts = charts
  }
}

export function setBoards(state, charts) {
  if (charts) {
    state.boards = Array.from(new Set(charts.map(g => g.board)))
  }
}

export function setCategories(state, charts) {
  if (charts) {
    const list = charts.map(g => { return { "category": g.category, "board": g.board } });
    const uniqueList = Array.from(new Set(list.map(d => JSON.stringify(d))))
    state.categories = uniqueList.map(d => JSON.parse(d));
  }
}