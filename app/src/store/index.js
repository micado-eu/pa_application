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
import user_type from './user_type'
import integration_type from './integration_type'
import language from './language'
import steps from './steps'
import graphs from './graphs'
import user from './user'
import intervention_plan from './intervention_plan'
import news from './news'

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
      user_type,
      integration_type,
      language, 
      steps,
      graphs,
      user,
      intervention_plan,
      news
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
