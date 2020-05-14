import graphs from './data/graphs'

const fetch = (mockData, time = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData)
    }, time)
  })
}

export default {
  fetchGraphs() {
    return fetch(graphs, 0) // wait 1s before returning posts
  },
  updateGraphs(graphs) {
    console.log("fake call to update DB")
    console.log(graphs)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(graphs)
      }, 0)
    })
  },
  saveGraphs(graphs) {
    console.log("fake call to save to DB")
    console.log(graphs)
    // create fake id here
    graphs.id_graph = "b"
    graphs.graph_process = 2
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(graphs)
      }, 0)
    })
  },
  deleteGraphs(graphs) {
    console.log("fake call to save to DB")
    console.log(graphs)
    // create fake id here
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(graphs)
      }, 0)
    })
  }
}
