import client from 'api-picture_hotspots-client'

/*
export function someAction (context) {
}
*/
export function fetchHotspots(state, data) {
  return client
    .fetchDocumentTypePictures()
    .then(picture_hotspots => state.commit('setHotspots', picture_hotspots))
}
export function fetchHotspotsById(state, pic_id) {
  return client
    .fetchDocumentTypePicturesById(pic_id)
    .then(picture_hotspots => {
      state.commit('setHotspots', picture_hotspots)
      return picture_hotspots
    })
}

export function saveTranslationProd(state, spots){
  spots.forEach((spot)=>{
    client.fetchSpotTranslated(spot.id).then((translations)=>{
      console.log("i am the return from the fetch")
      console.log(translations)
      translations.forEach((transl)=>{
        if(transl.translationState == 3){
          console.log("inside if translated")
          client.saveSpotTranslationProd(transl, spot.id)
        }
      })
    })
  })
  
}

export function deleteTranslationProd(state, spots){
  console.log("in delete transl prod")
  spots.forEach((spot)=>{
    client.deleteSpotTranslationProd(spot.id)
  })
  
}