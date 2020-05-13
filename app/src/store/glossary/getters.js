export function glossary (state) {
    return state.glossary
}

export function glossaryElemByTitle(state) {
    let getterFunc = function(title) {
        return state.glossary.filter(g => g.title === title)[0]
    }
    return getterFunc
}