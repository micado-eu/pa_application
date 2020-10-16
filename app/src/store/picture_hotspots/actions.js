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

