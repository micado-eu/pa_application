/*
export function someMutation (state) {
}
*/

export function setDocuments (state, documents) {
      state.documents = documents
    }
export function setCompletionDocuments (state, documents) {
      state.completion_documents = documents
    }
export function saveCompletionDoc(state, doc){
  state.completion_documents.push(doc)
}

