export function setGlossary(state, glossary) {
  state.glossary = glossary
}

export function addNewGlossaryItem (state, glossaryItem) {
  state.glossary.push(glossaryItem)
}

export function editGlossaryItem (state, payload) {
  console.log(payload)
  let elem = state.glossary.filter(g => g.id == payload.id)[0]
  console.log(state.glossary.filter(g => g.id == payload.id))
  let elemIndex = state.glossary.indexOf(elem)
  console.log(elemIndex)
  state.glossary[elemIndex] = payload
}