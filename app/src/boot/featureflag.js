//import Vue from 'vue'
import { featureFlippingDirective, featureFlippingGuard, isEnabled, setEnabledFeatures } from '../directive/FeatureFlip'

// We globally register our directive with Vue;
// Remember that all directives in Vue will start with 'v-'
// but that should not be part of your directive name
// https://vuejs.org/v2/guide/custom-directive.html
// 'my-directive' will be used as 'v-my-directive'



export default async ({ app, router, store, Vue }) => {
  try {

    Vue.directive('feature-flipping', featureFlippingDirective)
    Vue.mixin({ beforeRouteEnter: featureFlippingGuard })

    console.log("siamo in FEATURE flag boot")
    console.log(Vue)

    await store.dispatch('features/fetchFeaturesFlags')
    //   .then()
    console.log("before enabledfeatures")
    setEnabledFeatures(store.state.features.featuresFlag)
  } catch (err) {
    console.error('Quasar failed to load FeaturesFlags with the error message: ', err)
  }
}
