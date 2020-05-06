import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import documents from './documents'
import features from './features'
import flows from './flows'
import topic from './topic'
import glossary from './glossary'
import statistics from './statistics'
import document_type from './document_type'
import integration_category from './integration_category'
import integration_type from './integration_type'
import language from './language'


Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      documents,
      features,
      glossary,
      flows,
      topic,
      statistics,
      document_type,
      integration_category,
      integration_type,
      language
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
