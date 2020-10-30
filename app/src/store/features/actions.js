import client from 'api-features-client'
/*
export function someAction (context) {
}
*/
export function fetchFeatures (state, data) {
  return client
    .fetchFeatures()
    .then(features => state.commit('setFeatures', features))
}

export async function updateAllFeatures (state, features) {
  let calls = []
  features.forEach(feature => {
    calls.push(client.updateFeature(feature))
  })
  Promise.all(calls)
  state.commit('setFeatures', features)
}

export function fetchFeaturesFlags (state, data) {
  return client
    .fetchFeaturesFlags()
    .then(features => state.commit('setFeaturesFlag', features[0].features))
}
