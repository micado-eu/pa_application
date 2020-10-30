/*
export function someMutation (state) {
}
*/
export function setFeatures (state, features) {
  if (features) {
    state.features = features
  }
}

export function setFeaturesFlag (state, features) {
  console.log("state setFeaturesFlag")
  console.log(features)
  if (features) {
    state.featuresFlag = features
  }
}
