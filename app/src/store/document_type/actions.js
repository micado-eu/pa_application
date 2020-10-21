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



export  function saveDocumentType (state, doc_element) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log("in actions saveDocumentType:")
  console.log(doc_element)
  let savingDoc = JSON.parse(JSON.stringify(doc_element, ['icon', 'issuer', 'validable']));
  console.log(savingDoc)

  var promiseDoc = []
  var promiseTransl =[]
  var promiseSpotsTransl=[]
  var promiseSpot =[]
  var promisePics =[]
  promiseDoc.push(client.saveDocumentType(savingDoc))
  Promise.all(promiseDoc).then((docvalue)=>{
    console.log("i am docvalue")
    console.log(docvalue)
    doc_element.id = docvalue[0].id
    doc_element.translations.forEach((transl)=>{
      promiseTransl.push(client.saveDocumentTypeTranslation(transl,doc_element.id))
      console.log(transl)
    })
    Promise.all(promiseTransl).then(()=>{
      if(doc_element.pictures){
        doc_element.pictures.forEach((pic)=>{
          promisePics.push(client.saveDocumentTypePictures(pic, doc_element.id, pic.order))
        })
        Promise.all(promisePics)
        .then((values)=>{
          //In order to give object the proper id I make a check on the picture
          console.log("inside firts promis all")
          console.log(values)
        values.forEach((value)=>{
          doc_element.pictures.forEach((pic)=>{
            if(value.image == pic.image){
              pic.id = value.id
            }
          })
        })
        console.log("i am doc element picture")
        console.log(doc_element.pictures)
        doc_element.pictures.forEach((pic)=>{
          if(pic.hotspots){
            pic.hotspots.forEach((spot) =>{
              spot.pictureId = pic.id
              console.log("I am the spot")
              console.log(spot)
              promiseSpot.push(client.saveHotspots(spot))
            })
          }
        })
          Promise.all(promiseSpot).then((spotvalues)=>{
            if(spotvalues != []){
              console.log("i am spotvalues")
              console.log(spotvalues)
              doc_element.pictures.forEach((pic)=>{
               //In order to give hotspots the proper id i check that the return elemnt from save and the element in the payload have same pictureId,
               //x, and y. Since on a single picture there is only one spot that can have these x and y, it should identify it uniquely
                for(var i = 0; i <spotvalues.length; i++){
                  for(var j = 0; j < pic.hotspots.length; j++){
                    if(spotvalues[i].pictureId == pic.hotspots[j].pictureId && spotvalues[i].x == pic.hotspots[j].x && spotvalues[i].y == pic.hotspots[j].y){
                      pic.hotspots[j].id = spotvalues[i].id
                    }
                  }
                }
              })
              
              doc_element.pictures.forEach((pict)=>{
                pict.hotspots.forEach((hspot)=>{
                  console.log("i am hspot")
                  console.log(hspot)
                  hspot.translations.forEach((transl)=>{
                    promiseSpotsTransl.push(client.saveHotspotTranslation(transl, hspot.id))
                  })
                  Promise.all(promiseSpotsTransl).then((translreturn)=>{
                    console.log("in transl return")
                    console.log(translreturn)
                    console.log(spotvalues[spotvalues.length-1])
                    if(translreturn[0].phtId == spotvalues[spotvalues.length-1].id){
                      state.commit('saveDocumentType',doc_element)
                      state.commit('picture_hotspots/setHotspots', spotvalues, { root: true })
                    }
                  })
                  promiseSpotsTransl = []
                  promiseSpot = []
                })
              })
            }
              
                
              })
            
            
          })
        }        
        })

})
  }



export function deleteDocumentType (state, payload) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log("i am index")
  console.log(payload.index)
  console.log("I am hotspots")
  console.log(payload.hotspots)
  var promiseTransl = []
  var promisePics =[]
  var promiseSpots = []
  var promiseSpotsTransl =[]
  var promiseDoc =[]
  promiseTransl.push(client.deleteDocumentTypeTranslation(payload.index))
  console.log("deleted doc tarnslations")
  Promise.all(promiseTransl).then((valuestransl)=>{
    console.log("i am valuestransl")
  console.log(valuestransl)
  console.log("after promise all deleted doc tarnslations")
  payload.hotspots.forEach((spot)=>{
    promiseSpotsTransl.push(client.deleteHotpotTranslation(spot.id))
    console.log("i am deleting translation for spot")
    console.log(spot)
    console.log("deleted transl")
  })
  console.log("deleted spot translation")
  Promise.all(promiseSpotsTransl).then((valuesspottransl)=>{
    console.log("i am valuesspottransl")
    console.log(valuesspottransl)
    console.log("after promis all deleted spot translation")
    payload.hotspots.forEach((spot)=>{
      promiseSpots.push(client.deleteHotspot(spot.id))
      console.log("i am deleting  spot")
    console.log(spot)
    console.log("deleted spot")
    })
    console.log("deleted spots")
    Promise.all(promiseSpots).then((valuesspots) =>{
      console.log("i am valuesspots")
      console.log(valuesspots)
      console.log("after promise all deleted spots")
      promisePics.push(client.deleteDocumentTypePictures(payload.index))
      console.log("deleted pictures")
      Promise.all(promisePics).then((valuepic)=>{
        console.log("i am valuepic")
        console.log(valuepic)
        console.log("after promise all deleted pictures")
        promiseDoc.push(client.deleteDocumentType(payload.index))
        console.log("deleted doc")
        Promise.all(promiseDoc).then((valuedoc)=>{
          console.log("i am valuedoc")
          console.log(valuedoc)
          console.log("after promise all deleted doc")
          state.commit('deleteDocumentType', payload.index)
        })
       
      })
      
    })
    
  })
  
  })

}

export function editDocumentType (state, doc_element) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(doc_element)
  // update translations
  return client
    .updateDocumentType(doc_element).then(function (update_return) {
      // cycle in the translations and update each
      console.log(update_return)
      doc_element.translations.forEach(function (aTranslation) {
        client.updateDocumentTypeTranslation(aTranslation).then(function (update_translation_return) {
          console.log(update_translation_return)
        })
      })
    })
}

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
