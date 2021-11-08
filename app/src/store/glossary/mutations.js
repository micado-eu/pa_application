export function setGlossary(state, glossary) {
  state.glossary = glossary
}

export function setGlossaryProd(state, glossary) {
  state.glossaryProd = glossary.filter(t => t.translated)
}

export function setGlossaryTemp(state, glossary) {
  state.glossaryTemp = glossary.filter(t => !t.translated)
}

export function updatePublished(state, data) {
  let idx = state.glossary.findIndex((i) => i.id === data.id)
  if (idx !== -1) {
    state.glossary[idx].published = data.published
  }
}