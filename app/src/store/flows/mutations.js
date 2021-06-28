/*
export function someMutation (state) {
}
*/
export function setFlows (state, flows) {
  state.flows = flows
}

export function setFlowsProd (state, flows) {
  state.flowsProd = flows
}

export function setFlowsTemp (state, flows) {
  state.flowsTemp = flows
}

export function setFlowsDocs (state, flowsDocs) {
  state.flowsDocs = flowsDocs
}


export function setTheFlows (state, flows) {
  state.theFlow = flows
}

export function setNodePanelVisible (state, visible) {
  state.nodePanelVisible = visible
}

export function editProcess(state, process) {
  console.log("update the state")
  console.log(process)
  const index = state.flows.findIndex(item => item.id === process.id)
  if (index !== -1) state.flows.splice(index, 1, process)
}

export function saveProcess(state, data){
state.flows.push(data)
}

export function deleteProcess(state, id) {
var index = state.flows.findIndex(d => d.id == id)
state.flows.splice(index, 1)
console.log("deleted process at place " + index)
}
export function setFlowData(state, data) {
  state.flowdata = data
}
export function setShellData(state, data) {
  state.shell_data = data
}
export function setDocuments (state, documents) {
  state.documents = documents
}