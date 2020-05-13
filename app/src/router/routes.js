import MigrationSituation from '../components/MigrationSituation.vue'
import DataSettings from '../components/DataSettings.vue'
import Settings from '../components/Settings.vue'
import RequestMediation from '../components/ngo_user_management/MediationRequest.vue'
import ProcessEditor from '../components/ProcessEditor.vue'
import EditorTestPage from '../pages/EditorTestPage.vue'
import AddDocument from '../components/data_settings/AddDocument'
import MigrantManager from '../components/MigrantManager'
import NgoManager from '../components/NgoManager'
import InfoEditor from '../components/InfoEditor'

// import DataSettings from '../components/DataSettings.vue'
// import DataSettings from '../components/DataSettings.vue'
// import DataSettings from '../components/DataSettings.vue'
// import DataSettings from '../components/DataSettings.vue'
// import DataSettings from '../components/DataSettings.vue'
// import DataSettings from '../components/DataSettings.vue'
// import DataSettings from '../components/DataSettings.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/data_settings', component: DataSettings },
      { path: '/app_settings', component: Settings },

      { path: '/migrant', component: MigrantManager },
      { path: '/ngo', component: NgoManager },
      { path: '/info', component: InfoEditor },


      { path: '/adddocument', component: AddDocument },
      { path: '/adddocument/:id', component: AddDocument, props: true, name: document },
      { path: '/guided_process_editor', component: ProcessEditor },

      { path: '/guided_process_editor/edit/:id', component: () => import('components/EditProcess.vue'), props: true, name: process },
      { path: '/guided_process_editor/edit/', component: () => import('components/EditProcess.vue'), props: true, name: process },
      { path: '/guided_process_editor/edit/:id/steps', component: () => import('pages/StepManager.vue'), props: true, name: process },

      { path: '/edit_step/:id', component: () => import('components/EditStep.vue'), props: true, name: process },
      { path: '/edit_step', component: () => import('components/EditStep.vue'), props: true, name: process },

      { path: '/dashboard', component: () => import('components/Dashboard.vue') },
      { path: '/map', component: () => import('components/Map.vue') },
      { path: '/situation', component: MigrationSituation },
      { path: '/ngo/requestmediation', component: RequestMediation },
      { path: '/glossary', component: EditorTestPage }
    ]
  }
]/*
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/documents',
    //    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('components/Documents.vue') }
    ]
  },
  {
    path: '/dashboard',
    //    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('components/dashboard/home.vue') }
    ]
  },
  {
    path: '/flow',
    //    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('components/Flow.vue') }
    ]
  },
  {
    path: '/map',
    //    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('components/Map.vue') }
    ]
  },
  {
    path: '/requestmediation',
    //    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MediationRequest.vue') }
    ]
  }
]
*/
// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
