export function processes(state) {
  return state.flows
}

export function processesProd(state) {
  return state.flowsProd
}

export function processProdById(state) {
  let getterFunc = function (id) {
    return state.flowsProd.filter(n => n.id == id)[0]
  }
  return getterFunc
}

export function flowsDocs(state) {
  return state.flowsDocs
}
