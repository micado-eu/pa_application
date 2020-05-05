import client from 'api-document_type-client'

/*
export function someAction (context) {
}
*/
export function fetchDocument_type (state, data) {
      return client
        .fetchDocument_type()
        .then(document_type => state.commit('setDocument_type', document_type))
    }

    export function editDocumentType(state, document_type) {
      // we need BEFORE to call the API to do the update and if ok we update wuex state
      console.log(document_type)
      return client
        .updateDocumentType(document_type)
        .then(document_type_return => state.commit('editDocumentType', document_type_return))
    }
    
    export function saveDocumentType(state, document_type) {
      // we need BEFORE to call the API to do the save and if ok we update wuex state
      console.log(document_type)
      return client
        .saveDocumentType(document_type)
        .then(document_type_return => state.commit('saveDocumentType', document_type_return))
    }