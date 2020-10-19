import client from 'api-document_type-client'

/*
export function someAction (context) {
}
*/
export function fetchDocumentType (state, data) {
  return client
    .fetchDocumentType()
    .then(document_type => {
      state.commit('setDocument_type', document_type)
      return document_type
    })
}



export function saveDocumentType (state, doc_element) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log("in actions saveDocumentType:")
  console.log(doc_element)
  let savingDoc = JSON.parse(JSON.stringify(doc_element, ['icon', 'issuer', 'validable']));
  console.log(savingDoc)


  // we need to save first the topic
  return client.saveDocumentType(savingDoc)
    .then(function (doc_return) {
      console.log("returned from saving topic")
      console.log(doc_return)
      // in topic_return we have the ID that we need in the following cycle
      doc_element.translations.forEach(function (transl) {
        client.saveDocumentTypeTranslation(transl, doc_return.id)
      }, doc_return.id)
      // here we need only to add the ID to the topic element since there are the tranlsations that in the topic_return are not present
      console.log("after foreach save translation")
      doc_element.id = doc_return.id
      // now we need to set the id for all translations
      for (var i = 0; i < doc_element.translations.length; i++) {
        doc_element.translations[i].id = doc_return.id
      }
      var picture_length = doc_element.pictures
      for (let i = 0; i < doc_element.pictures.length; i++) {
        var pic_length = i
        console.log("saving pictures")
        client.saveDocumentTypePictures(doc_element.pictures[i], doc_return.id, i).then((picture_return)=>{
          doc_element.pictures[i].id = picture_return.id
          if(doc_element.pictures[i].hotspots){
            console.log("INSIDE PICTURE RETURN")
            var hotspots_lenght = doc_element.pictures[i].hotspots
            for(var j = 0; j <doc_element.pictures[i].hotspots.length; j++ ){
            var hot_length = j
          
            console.log("INSIDE SPOT FOREACH")
            doc_element.pictures[i].hotspots[j].pictureId = picture_return.id
            var temp = doc_element.pictures[i].hotspots[j]
              client.saveHotspots(doc_element.pictures[i].hotspots[j]).then((spot_return) =>{
                temp.id = spot_return.id
                for( var i = 0; i< temp.translations.length; i++){
                  console.log("INSIDE SPOT TRANSL")
                  client.saveHotspotTranslation(temp.translations[i], spot_return.id)
                  /*console.log("Temp.translation.length")
                  console.log(temp.translations.length)
                  console.log("hotspots_lenght.length")
                  console.log(hotspots_lenght.length)
                  console.log("picture_length.length")
                  console.log(picture_length.length)

                  console.log((i+1) == (temp.translations.length) && (hot_length+1) == (hotspots_lenght.length) && (pic_length+1)==(picture_length.length))*/
                  if((i+1) == (temp.translations.length) && (hot_length+1) == (hotspots_lenght.length) && (pic_length+1)==(picture_length.length)){
                    console.log("in committing to store")
                    state.commit('saveDocumentType', doc_element)
                  }
                }
                })
              }
            }
              })
            
        
        }
        })
      }

export function deleteDocumentType (state, payload) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log(payload.index)
  return client.deleteDocumentTypeTranslation(payload.index).then(function (translations_delete_return) {
    console.log("deleted the translations")
    console.log(translations_delete_return)
    const deleteHotspot = async () => {
      if(payload.hotspots.length != 0 ){
      await asyncForEach(payload.hotspots, async(spot)=>{
        await client.deleteHotpotTranslation(spot.id).then(()=>{
           client.deleteHotspot(spot.id)
        })
      }).then(()=>{
        client.deleteDocumentTypePictures(payload.index).then(function (picture_delete_return) {
          console.log("deleted the pictures")
          console.log(picture_delete_return)
          client.deleteDocumentType(payload.index).then(function () {
            state.commit('deleteDocumentType', payload.index)
          })
        })
      })
    }
    else{
      client.deleteDocumentTypePictures(payload.index).then(function (picture_delete_return) {
        console.log("deleted the pictures")
        console.log(picture_delete_return)
        client.deleteDocumentType(payload.index).then(function () {
          state.commit('deleteDocumentType', payload.index)
        })
      })
    }
  }
     deleteHotspot()
   
  })

}

export function editDocumentType (state, doc_element) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(doc_element)
  // update translations
   client
    .updateDocumentType(doc_element).then(function (update_return) {
      // cycle in the translations and update each
      console.log(update_return)
      doc_element.translations.forEach(function (aTranslation) {
        client.updateDocumentTypeTranslation(aTranslation).then(function (update_translation_return) {
          console.log(update_translation_return)
        })
      })
    })
      const deleteMedia = async () =>{
          await asyncForEach( doc_element.pictures, async (pic) =>{
          if((pic.id) != -1 && pic.hotspots){
         await asyncForEach(pic.hotspots, async (spot) =>{
            client.deleteHotpotTranslation(spot.id).then(()=>{
              console.log("in deleting spot")
              client.deleteHotspot(spot.id)
            })
          })
        }
      }).then(()=>{
        client.deleteDocumentTypePictures(doc_element.id).then((result)=>{
          console.log(result)
        })
      })
    }
    deleteMedia()
    //state.commit('saveDocumentType', doc_element)


    /*var picture_length = doc_element.pictures
    for (let i = 0; i < doc_element.pictures.length; i++) {
      var pic_length = i
      console.log("saving pictures")
      client.saveDocumentTypePictures(doc_element.pictures[i], doc_element.id, i).then((picture_return)=>{
        doc_element.pictures[i].id = picture_return.id
        if(doc_element.pictures[i].hotspots){
          console.log("INSIDE PICTURE RETURN")
          var hotspots_lenght = doc_element.pictures[i].hotspots
          for(var j = 0; j <doc_element.pictures[i].hotspots.length; j++ ){
          var hot_length = j
        
          console.log("INSIDE SPOT FOREACH")
          doc_element.pictures[i].hotspots[j].pictureId = picture_return.id
          var temp = doc_element.pictures[i].hotspots[j]
            client.saveHotspots(doc_element.pictures[i].hotspots[j]).then((spot_return) =>{
              temp.id = spot_return.id
              for( var i = 0; i< temp.translations.length; i++){
                console.log("INSIDE SPOT TRANSL")
                client.saveHotspotTranslation(temp.translations[i], spot_return.id)
                /*console.log("Temp.translation.length")
                console.log(temp.translations.length)
                console.log("hotspots_lenght.length")
                console.log(hotspots_lenght.length)
                console.log("picture_length.length")
                console.log(picture_length.length)

                console.log((i+1) == (temp.translations.length) && (hot_length+1) == (hotspots_lenght.length) && (pic_length+1)==(picture_length.length))
                if((i+1) == (temp.translations.length) && (hot_length+1) == (hotspots_lenght.length) && (pic_length+1)==(picture_length.length)){
                  console.log("in committing to store")
                  state.commit('saveDocumentType', doc_element)
                }
              }
              })
            }
          }
            })
          
      
      } */  

    }


async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}