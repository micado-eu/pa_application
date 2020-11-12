import MigrationSituation from '../components/MigrationSituation.vue'
import DataSettings from '../components/DataSettings.vue'
import Settings from '../components/Settings.vue'
import RequestMediation from '../components/ngo_user_management/MediationRequest.vue'
import ProcessManager from '../pages/ProcessManager.vue'
import AddDocument from '../components/data_settings/AddDocument'
import MigrantManager from '../pages/MigrantManager'
import NgoManager from '../pages/NgoManager'
import InfoEditor from '../components/InfoEditor'
import GlossaryListPage from '../pages/glossary/GlossaryListPage.vue'
import GlossaryNewPage from '../pages/glossary/GlossaryNewPage'
import GlossaryEditPage from '../pages/glossary/GlossaryEditPage'
import InformationListPage from '../pages/information_centre/InformationListPage.vue'
import InformationNewPage from '../pages/information_centre/InformationNewPage.vue'
import InformationEditPage from '../pages/information_centre/InformationEditPage.vue'
import EventListPage from '../pages/events/EventListPage.vue'
import EventNewPage from '../pages/events/EventNewPage.vue'
import EventEditPage from '../pages/events/EventEditPage.vue'
import MasterPortal from '../components/migration_monitor/map/MasterPortal.vue'
import Country from '../components/migration_monitor/Country.vue'
import Board from '../components/migration_monitor/Board.vue'
import MigrationSitEditor from '../components/migration_monitor/editor/Editor.vue'
import MigrationSitOverview from '../components/migration_monitor/overview/Overview.vue'
import chatBot from '../components/ChatBot.vue'
import InformationCategory from '../components/information_centre/InformationCategory.vue'
import EventCategory from '../components/events/EventCategory.vue'
import DocumentTypeManager from '../components/data_settings/DocumentTypeManager.vue'
import Topic from '../components/data_settings/Topic'
import UserType from '../components/data_settings/UserType'
import IntegrationCategory from '../components/data_settings/IntegrationCategory'
import IntegrationType from '../components/data_settings/IntegrationType'
import FunctionConfiguration from '../pages/settings/FunctionConfiguration'
import ActiveLanguageSelector from '../components/settings/ActiveLanguageSelector'

const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: '/data_settings',
        component: DataSettings,
        children: [
          { path: 'document_types', component: DocumentTypeManager },
          { path: 'intervention_categories', component: IntegrationCategory },
          { path: 'intervention_types', component: IntegrationType },
          { path: 'topics', component: Topic },
          { path: 'user_types', component: UserType },
          { path: 'settings', component: FunctionConfiguration },
          { path: 'language', component: ActiveLanguageSelector }
        ]
      },
      { path: '/app_settings', component: Settings },

      { path: '/migrant', component: MigrantManager },
      {
        path: '/migrant/data/:theuserid', name: 'migrantdata', component: () => import('pages/MigrantData.vue'), props: (route) => ({ ...route.params })
      },
      {
        path: '/migrant/:theuserid', name: 'interventionplan', component: () => import('pages/UserIntegration.vue'), props: (route) => ({ ...route.params })
      },
      {
        path: '/migrant/:theuserid/add', name: 'addinterventionplan', component: () => import('pages/AddInterventionPlan.vue'), props: (route) => ({ ...route.params })
      },
      { path: '/cso', component: NgoManager },
      { path: '/info', component: InfoEditor },
      { path: '/chatbot', component: chatBot },

      {
        path: '/adddocument', component: AddDocument, props: true, name: document
      },
      {
        path: '/adddocument/:thedocumenttypeid', name: 'editdocumenttype', component: () => import('components/data_settings/AddDocument.vue'), props: (route) => ({ ...route.params })
      },
      { path: '/guided_process_editor', component: ProcessManager, name: 'guidedprocesslist' },

      {
        path: '/guided_process_editor/edit/', component: () => import('pages/EditProcess.vue'), props: true, name: process
      },
      {
        path: '/guided_process_editor/edit/:theprocessid', name: 'editprocess', component: () => import('pages/EditProcess.vue'), props: (route) => ({ ...route.params })
      },
      {
        path: '/guided_process_editor/edit/:processId/steps', component: () => import('pages/StepManager.vue'), props: (route) => ({ ...route.params }), name: 'editstep'
      },

      {
        path: '/edit_step/:id', component: () => import('components/EditStep.vue'), props: true, name: process
      },
      {
        path: '/edit_step', component: () => import('components/EditStep.vue'), props: true, name: process
      },

      { path: '/dashboard', component: () => import('pages/Stats.vue') },
      { path: '/map', component: () => import('components/Map.vue') },
      {
        path: '/situation',
        component: MigrationSituation,
        children: [
          { path: 'editor', component: MigrationSitEditor },
          { path: 'overview', component: MigrationSitOverview },
          { path: 'map', component: MasterPortal },
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
      { path: '/information/categories', component: InformationCategory },

      { path: '/events', component: EventListPage },
      { path: '/events/new', component: EventNewPage },
      { path: '/events/:id/edit/', component: EventEditPage },
      { path: '/events/categories', component: EventCategory }
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
