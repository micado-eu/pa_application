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
  let savingDoc = JSON.parse(JSON.stringify(doc_element, ['icon', 'issuer', 'validable', 'model']));
  console.log(savingDoc)
  var promiseValidators =[]
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
    doc_element.validators.forEach((validator)=>{
      promiseValidators.push(client.saveDocumentTypeValidators(doc_element.id, validator))
    })
    Promise.all(promiseValidators).then((validator_return)=>{
      console.log(validator_return)
    
    doc_element.translations.forEach((transl)=>{
      promiseTransl.push(client.saveDocumentTypeTranslation(transl,doc_element.id))
      console.log(transl)
    })
    Promise.all(promiseTransl).then(()=>{
      if(doc_element.pictures.length >0){
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
            if(spotvalues.length > 0){
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
            else {
              console.log("this is if there are no hotspots")
              state.commit('saveDocumentType',doc_element)
            }
              
                
              })
            
            
          })
        }
        else{
          console.log("This is if there are no pictures")
          state.commit('saveDocumentType',doc_element)
        }        
        })
      })
})
  }



export function deleteDocumentType (state, payload) {
  // we need BEFORE to call the API to do the save and if ok we update wuex state
  console.log("i am index")
  console.log(payload.index)
  console.log("I am hotspots")
  console.log(payload.hotspots)
  var promiseValidators= []
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
        promiseValidators.push(client.deleteDocumentTypeValidators(payload.index))
        Promise.all(promiseValidators).then((validator_return)=>{
          console.log(validator_return)
          promiseDoc.push(client.deleteDocumentType(payload.index))
          console.log("deleted doc")
          Promise.all(promiseDoc).then((valuedoc)=>{
            console.log("i am valuedoc")
            console.log(valuedoc)
            client.deleteProcessProducedDocument(payload.index)
            client.deleteStepDocument(payload.index)
            console.log("after promise all deleted doc")
            state.commit('deleteDocumentType', payload.index)
          })
        })
      
       
      })
      
    })
    
  })
  
  })

}

export function editDocumentType (state, payload) {
  // we need BEFORE to call the API to do the update and if ok we update wuex state
  console.log(payload.doc_element)
  var promiseTransl = []
  var spots =[]
  var promiseValidators=[]
  var promiseValidatorsDelete=[]
  var promisePicsDelete =[]
var promiseSpotsDelete = []
var promiseSpotsTranslDelete =[]
var promisePics =[]
var promiseSpot = []
var promiseSpotsTransl =[]
  // update translations
  return client
    .updateDocumentType(payload.doc_element).then(function (update_return) {
      // cycle in the translations and update each
      console.log(update_return)
      payload.doc_element.translations.forEach(function (aTranslation) {
        promiseTransl.push(client.updateDocumentTypeTranslation(aTranslation))
      })
        Promise.all(promiseTransl).then(function (update_translation_return) {
          console.log(update_translation_return)
          console.log("after promise all deleted doc tarnslations")
     

          payload.doc_element.pictures.forEach((pic)=>{
    pic.hotspots.forEach((spot) => {
      console.log("i am spot id in foreach")
      console.log(spot.id)
      if(spot.id != -1){
      
        spots.push(spot)
      }
    })
  })
  console.log(spots)
  console.log("after promise all deleted doc tarnslations")
  spots.forEach((spot)=>{
    promiseSpotsTranslDelete.push(client.deleteHotpotTranslation(spot.id))
    console.log("i am deleting translation for spot")
    console.log(spot)
    console.log("deleted transl")
  })
  console.log("deleted spot translation")
  Promise.all(promiseSpotsTranslDelete).then((valuesspottransl)=>{
    console.log("i am valuesspottransl")
    console.log(valuesspottransl)
    console.log("after promis all deleted spot translation")
    spots.forEach((spot)=>{
      promiseSpotsDelete.push(client.deleteHotspot(spot.id))
      console.log("i am deleting  spot")
    console.log(spot)
    console.log("deleted spot")
    })
    console.log("deleted spots")
    Promise.all(promiseSpotsDelete).then((valuesspots) =>{
      console.log("i am doc element hotspots")
      console.log(payload.doc_element.pictures)
      console.log("i am valuesspots")
      console.log(valuesspots)
      promiseValidatorsDelete.push(client.deleteDocumentTypeValidators(payload.doc_element.id))
      Promise.all(promiseValidatorsDelete).then((validator_return)=>{
        console.log(validator_return)
      promisePicsDelete.push(client.deleteDocumentTypePictures(payload.doc_element.id))
      Promise.all(promisePicsDelete).then((delete_pic)=>{
        payload.doc_element.validators.forEach((validator)=>{
          promiseValidators.push(client.saveDocumentTypeValidators(payload.doc_element.id, validator))
        })
        Promise.all(promiseValidators).then((validator_return)=>{
          console.log(validator_return)
        if(payload.doc_element.pictures.length >0){
          payload.doc_element.pictures.forEach((pic)=>{
            promisePics.push(client.saveDocumentTypePictures(pic, payload.doc_element.id, pic.order))
          })
          Promise.all(promisePics)
          .then((values)=>{
            //In order to give object the proper id I make a check on the picture
            console.log("inside firts promis all")
            console.log(values)
          values.forEach((value)=>{
            payload.doc_element.pictures.forEach((pic)=>{
              if(value.image == pic.image){
                pic.id = value.id
              }
            })
          })
          console.log("i am doc element picture")
          console.log(payload.doc_element.pictures)
          payload.doc_element.pictures.forEach((pic)=>{
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
              if(spotvalues.length > 0){
                console.log("i am spotvalues")
                console.log(spotvalues)
                payload.doc_element.pictures.forEach((pic)=>{
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
                
                payload.doc_element.pictures.forEach((pict)=>{
                  pict.hotspots.forEach((hspot)=>{
                    console.log("i am hspot")
                    console.log(hspot)
                    hspot.translations.forEach((transl)=>{
                      promiseSpotsTransl.push(client.saveHotspotTranslation(transl, hspot.id))
                    })
                    Promise.all(promiseSpotsTransl).then((translreturn)=>{
                      if(payload.doc_element.published != payload.publishedOrig){
                        if(payload.doc_element.published == true){
                          console.log("i am hspot INSIDE FOREACH")
                          console.log(hspot)
                         
                            client.deleteSpotTranslationProd(hspot.id).then(()=>{
                              client.saveSpotTranslationProd(hspot.id)
                             
                          })
                        }
                      }
                      console.log("in transl return")
                      console.log(translreturn)
                      console.log(spotvalues[spotvalues.length-1])
                      if(translreturn[0].phtId == spotvalues[spotvalues.length-1].id){
                        console.log("this is if there are hotspots")
                        state.commit('editDocumentType',payload.doc_element)
                        state.commit('picture_hotspots/setHotspots', spotvalues, { root: true })
                      }
                    })
                    promiseSpotsTransl = []
                    promiseSpot = []
                  })
                })
              }
              else {
                console.log("this is if there are no hotspots")
                state.commit('editDocumentType',payload.doc_element)
              }
                
                  
                })
              
              
            })
          }
          else{
            console.log("This is if there are no pictures")
            state.commit('editDocumentType',payload.doc_element)
          }
      })
      })
      
      
    })
    })
    
  })
  
})
      
    })
 
}

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export function updatePublished(state, payload){
  client.updatePublished(payload.doc.id, payload.published).then(()=>{
    payload.doc.published = payload.published
    state.commit('editDocumentType', payload.doc)
  })
}

export function saveTranslationProd(state, id){
  client.deleteDocTypeTranslationProd(id).then(()=>{
    console.log("deleted previous translations")
    client.saveDocTypeTranslationProd(id)
   })
}

export function deleteTranslationProd(state, id){
  console.log("in delete transl prod")
  client.deleteDocTypeTranslationProd(id)
}
