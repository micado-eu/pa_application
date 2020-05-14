import client from 'api-graphs-client'

/*
export function someAction (context) {
}
*/
export function fetchGraphs(state, data) {
  return client
    .fetchGraphs()
    .then(graphs => state.commit('setGraphs', graphs))
}

export function editGraphs(state, graphs) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(graphs)
  return client
    .updateGraphs(graphs)
    .then(graphs_return => state.commit('editGraphs', graphs_return))
}

export function saveGraphs(state, graphs) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(graphs)
  return client
    .saveGraphs(graphs)
    .then(graphs_return => state.commit('saveGraphs', graphs_return))
}

export function deleteGraphs(state, graphs) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(graphs)
  return client
    .deleteGraphs(graphs)
    .then(graphs_return => state.commit('deleteGraphs', graphs_return))
}


/*export function deleteDocument({commit}, document_type) {

  commit(delete_document_type, document_type.id)
} */