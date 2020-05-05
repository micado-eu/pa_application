/*
export function someMutation (state) {
}
*/

export function setDocument_type (state, document_type) {
      state.document_type = document_type
    }


export function updateStore (state,payload) {
      let updatedDoc = state.document_type.map(document => {
          if(document.id === payload.id){
              return Object.assign({}, document, payload);
          }
          return document;
      })
      state.document_type = updatedDoc;
  }

export function addDocumentStore(state, data){
  state.document_type.push(data)
}

export function deleteDoc(state, document_type) {
  var index = state.document_type.findIndex(d => d.id == document_type.id);
  state.document_type.splice(index, 1);
  console.log("deleted document at place " + index)
}