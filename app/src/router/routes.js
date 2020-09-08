import MigrationSituation from '../components/MigrationSituation.vue'
import DataSettings from '../components/DataSettings.vue'
import Settings from '../components/Settings.vue'
import RequestMediation from '../components/ngo_user_management/MediationRequest.vue'
import ProcessEditor from '../components/ProcessEditor.vue'
import AddDocument from '../components/data_settings/AddDocument'
import MigrantManager from '../components/MigrantManager'
import NgoManager from '../components/NgoManager'
import InfoEditor from '../components/InfoEditor'
import GlossaryListPage from '../pages/glossary/GlossaryListPage.vue'
import GlossaryNewPage from '../pages/glossary/GlossaryNewPage'
import GlossaryEditPage from '../pages/glossary/GlossaryEditPage'
import InformationListPage from '../pages/information_centre/InformationListPage.vue'
import InformationNewPage from '../pages/information_centre/InformationNewPage.vue'
import InformationEditPage from '../pages/information_centre/InformationEditPage.vue'
import MigrationSitMap from '../components/migration_monitor/map/Map.vue'
import Country from '../components/migration_monitor/Country.vue'
import Board from '../components/migration_monitor/Board.vue'
import MigrationSitEditor from '../components/migration_monitor/editor/Editor.vue'
import chatBot from '../components/ChatBot.vue'
import InformationCategory from '../components/information_centre/InformationCategory.vue'
import DocumentTypeManager from '../components/data_settings/DocumentTypeManager.vue'
import Topic from '../components/data_settings/Topic'
import UserType from '../components/data_settings/UserType'
import IntegrationCategory from '../components/data_settings/IntegrationCategory'
import IntegrationType from '../components/data_settings/IntegrationType'
import FunctionConfiguration from '../components/settings/FunctionConfiguration'
import ActiveLanguageSelector from '../components/settings/ActiveLanguageSelector'


const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/data_settings', component: DataSettings, children: [
        { path: 'document_types', component: DocumentTypeManager },
        { path: 'intervention_categories', component: IntegrationCategory },
        { path: 'intervention_types', component: IntegrationType },
        { path: 'topics', component: Topic },
        { path: 'user_types', component: UserType },
        { path: 'settings', component: FunctionConfiguration },
        { path: 'language', component: ActiveLanguageSelector }
      ] },
      { path: '/app_settings', component: Settings },

      { path: '/migrant', component: MigrantManager },
      { path: '/migrant/:theuserid', name: 'interventionplan', component: () => import('components/UserIntegration.vue'), props: (route) => ({ ...route.params })  },
      { path: '/migrant/:theuserid/add', name: 'addinterventionplan', component: () => import('components/AddInterventionPlan.vue'),  props: (route) => ({ ...route.params }) },
      { path: '/cso', component: NgoManager },
      { path: '/info', component: InfoEditor },
      { path: '/chatbot', component: chatBot },


      { path: '/adddocument', name: 'editdocumenttype', component: () => import('components/data_settings/AddDocument.vue'), props: (route) => ({ ...route.params }) },
      { path: '/adddocument/:id', component: AddDocument, props: true, name: document },
      { path: '/guided_process_editor', component: ProcessEditor, name: 'guidedprocesslist' },

      { path: '/guided_process_editor/edit/', component: () => import('components/EditProcess.vue'), props: true, name: process },
      { path: '/guided_process_editor/edit/:theprocess', name: 'editprocess', component: () => import('components/EditProcess.vue'), props: (route) => ({ ...route.params }) },
      { path: '/guided_process_editor/edit/:processId/steps', component: () => import('pages/StepManager.vue'), props: (route) => ({ ...route.params }), name: 'editstep' },

      { path: '/edit_step/:id', component: () => import('components/EditStep.vue'), props: true, name: process },
      { path: '/edit_step', component: () => import('components/EditStep.vue'), props: true, name: process },

      { path: '/dashboard', component: () => import('components/Dashboard.vue') },
      { path: '/map', component: () => import('components/Map.vue') },
      {
        path: '/situation', component: MigrationSituation, children: [
          { path: 'editor', component: MigrationSitEditor },
          { path: 'map', component: MigrationSitMap },
          { path: ':board', component: Board }
        ]
      },
      { path: '/ngo/requestmediation', component: RequestMediation },

      { path: '/glossary', component: GlossaryListPage },
      { path: '/glossary/new', component: GlossaryNewPage },
      { path: '/glossary/:id/edit/', component: GlossaryEditPage },

      { path: '/information', component: InformationListPage },
      { path: '/information/new', component: InformationNewPage },
      { path: '/information/:id/edit/', component: InformationEditPage },
      { path: '/information/categories', component: InformationCategory }
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
