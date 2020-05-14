/*
export function someMutation (state) {
}
*/

export function setGraphs(state, graphs){
  state.graphs = graphs
}

export function editGraphs(state, graphs) {
  console.log("update the state")
  const index = state.graphs.findIndex(item => item.id === graphs.graph_id);
  if (index !== -1) state.graphs.splice(index, 1, graphs);
}

export function saveGraphs(state, graphs) {
  console.log("save to the state")
  console.log(graphs)

  state.graphs.push(graphs);
  console.log(state.graphs)
}

export function deleteGraphs(state, index){
  const idx = state.graphs.findIndex(item => item.id === index);
  if (idx !== -1) state.graphs.splice(idx, 1);
}
/*export function delete_document_type (state, document_typeId) {
  let document_types = state.document_type.filter(d => d.id != document_typeId)
  state.document_type = document_types
}*/
