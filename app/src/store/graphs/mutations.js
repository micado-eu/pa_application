/*
export function someMutation (state) {
}
*/

export function setGraphs (state, graphs) {
  state.graphs = graphs
}

export function addNode (state, node) {
  state.graphs.elements.push(node)
}

export function addEdge (state, edge) {
  state.graphs.elements.push(edge)
}

export function changeNode (state, payload) {
  //  state.graphs.elements.push(node)
  let workingNode = state.graphs.elements.filter(el => { return el.data.id == payload.id })[0]
  console.log(workingNode)
  workingNode.data.is_edited = true
  workingNode.data.title = payload.title
  let editingIndex = state.graphs.elements.findIndex(entry => entry.data.id == workingNode.data.id)
  console.log(editingIndex)
  state.graphs.elements.splice(editingIndex, 1, JSON.parse(JSON.stringify(workingNode)))

}

export function deleteNode (state, id) {
  const index = state.graphs.elements.findIndex(item => item.data.id === id);
  if (index !== -1) state.graphs.elements.splice(index, 1);

}
export function deleteEdge (state, id) {
  const index = state.graphs.elements.findIndex(item => item.data.id === id);
  if (index !== -1) state.graphs.elements.splice(index, 1);

}

export function editGraphs (state, graphs) {
  console.log("update the state")
  const index = state.graphs.findIndex(item => item.id === graphs.graph_id);
  if (index !== -1) state.graphs.splice(index, 1, graphs);
}

export function saveGraphs (state, graphs) {
  console.log("save to the state")
  console.log(graphs)

  state.graphs.push(graphs);
  console.log(state.graphs)
}

export function deleteGraphs (state, index) {
  const idx = state.graphs.findIndex(item => item.id === index);
  if (idx !== -1) state.graphs.splice(idx, 1);
}
/*export function delete_document_type (state, document_typeId) {
  let document_types = state.document_type.filter(d => d.id != document_typeId)
  state.document_type = document_types
}*/
