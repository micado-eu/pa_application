export function setGlossary(state, glossary) {
  state.glossary = glossary
}

export function addNewGlossaryItem (state, glossaryItem) {
  state.glossary.push(glossaryItem)
}