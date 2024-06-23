import Vue from 'vue'
import VueMermaid from "vue-mermaid/src"
import VueCytoscape from 'vue-cytoscape'
import VueEdgeHandles from 'cytoscape-edgehandles'

Vue.use(VueCytoscape)
Vue.use(VueMermaid)


import { Icon } from 'leaflet'

import 'leaflet/dist/leaflet.css'
//import 'vue-cytoscape/dist/vue-cytoscape.css'


delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

import VueFriendlyIframe from 'vue-friendly-iframe'

Vue.component('vue-friendly-iframe', VueFriendlyIframe)

import VueFormJsonSchema from 'vue-form-json-schema'

Vue.component('vue-form-json-schema', VueFormJsonSchema)


import Croppa from 'vue-croppa'
Vue.use(Croppa)
// here we have to read from settings the various data and also the default lang so here we set the locale
