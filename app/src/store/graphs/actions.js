import client from 'api-graphs-client'

/*
export function someAction (context) {
}
*/
export function fetchGraphs (state, payload) {
  return client
    .fetchGraphs(payload.id, payload.userLang)
    .then(graph => {
      graph.elements.forEach(element => {
        element.data.is_new = false
      });
      state.commit('setGraphs', graph)
      return graph
    })
}

export function saveGraph (state, payload) {
  return client
    .saveGraph(payload)
    .then(graph => {

      return graph
    })
}


export function addNode (state, payload) {
  state.commit('addNode', payload)
  return 1
}

export function addEdge (state, payload) {
  state.commit('addEdge', payload)
  return 1
}

export function changeNode (state, payload) {
  state.commit('changeNode', payload)
  return 1
}


export function deleteNode (state, payload) {
  state.commit('deleteNode', payload)
  return 1
}
export function deleteEdge (state, payload) {
  state.commit('deleteEdge', payload)
  return 1
}

export function editGraphs (state, graphs) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(graphs)
  return client
    .updateGraphs(graphs)
    .then(graphs_return => state.commit('editGraphs', graphs_return))
}

export function saveGraphs (state, graphs) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(graphs)
  return client
    .saveGraphs(graphs)
    .then(graphs_return => state.commit('saveGraphs', graphs_return))
}

export function deleteGraphs (state, graphs) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(graphs)
  return client
    .deleteGraphs(graphs)
    .then(graphs_return => state.commit('deleteGraphs', graphs_return))
}


/*export function deleteDocument({commit}, document_type) {

  commit(delete_document_type, document_type.id)
} */