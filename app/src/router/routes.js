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
import BoardContainer from '../components/migration_monitor/BoardContainer.vue'
import MigrationSitEditor from '../components/migration_monitor/editor/Editor.vue'
import MigrationSitOverview from '../components/migration_monitor/overview/Overview.vue'
import MigrationSitMain from '../components/migration_monitor/Main.vue'
import chatBot from '../components/ChatBot.vue'
import InformationCategory from '../components/information_centre/InformationCategory.vue'
import EventCategory from '../components/events/EventCategory.vue'
import DocumentTypeManager from '../components/data_settings/DocumentTypeManager.vue'
import Topic from '../components/data_settings/Topic'
import UserType from '../components/data_settings/UserType'
import IntegrationCategory from '../components/data_settings/IntegrationCategory'
import IntegrationType from '../components/data_settings/IntegrationType'
import FunctionConfiguration from '../pages/settings/FunctionConfiguration'
import UserManagement from '../pages/settings/UserManagement'
import ActiveLanguageSelector from '../components/settings/ActiveLanguageSelector'
import SurveyCreator from '../components/SurveyCreator'
import TranslationManager from '../components/settings/TranslationManager'
import ProfileSettings from '../pages/ProfileSettings'
import TestMarkdownConverter from '../pages/TestMarkdownConverter'

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
          { path: 'document_types', meta: { auth: ["Application/micado_admin"] }, component: DocumentTypeManager },
          { path: 'intervention_categories', meta: { auth: ["Application/micado_admin"] }, component: IntegrationCategory },
          { path: 'intervention_types', meta: { auth: ["Application/micado_admin"] }, component: IntegrationType },
          { path: 'topics', meta: { auth: ["Application/micado_admin"] }, component: Topic },
          { path: 'user_types', meta: { auth: ["Application/micado_admin"] }, component: UserType },
          { path: 'settings', meta: { auth: ["Application/micado_superadmin"] }, component: FunctionConfiguration },
          { path: 'survey', meta: { auth: ["Application/micado_superadmin"] }, component: SurveyCreator },
          { path: 'usermgmt', meta: { auth: ["Application/micado_superadmin"] }, component: UserManagement },
          { path: 'profile_settings', meta: { auth: ["Application/micado_migrant_manager", "Application/micado_admin", "Application/micado_superadmin"] }, component: ProfileSettings },
          { path: 'language', meta: { auth: ["Application/micado_admin"] }, component: TranslationManager }
        ]
      },
      { path: '/app_settings', meta: { auth: ["Application/micado_superadmin"] }, component: Settings },

      { path: '/migrant', meta: { auth: ["Application/micado_migrant_manager"] }, component: MigrantManager },
      {
        path: '/migrant/data/:theuserid', meta: { auth: ["Application/micado_migrant_manager"] }, name: 'migrantdata', component: () => import('pages/MigrantData.vue'), props: (route) => ({ ...route.params })
      },
      {
        path: '/migrant/:theuserid', meta: { auth: ["Application/micado_migrant_manager"] }, name: 'interventionplan', component: () => import('pages/UserIntegration.vue'), props: (route) => ({ ...route.params })
      },
      {
        path: '/migrant/:theuserid/add', meta: { auth: ["Application/micado_migrant_manager"] }, name: 'addinterventionplan', component: () => import('pages/AddInterventionPlan.vue'), props: (route) => ({ ...route.params })
      },
      { path: '/cso', meta: { auth: ["Application/micado_superadmin"] }, component: NgoManager },
      { path: '/info', meta: { auth: ["Application/micado_admin"] }, component: InfoEditor },
      {
        path: '/adddocument', meta: { auth: ["Application/micado_admin"] }, component: AddDocument, props: true, name: document
      },
      {
        path: '/adddocument/:thedocumenttypeid', meta: { auth: ["Application/micado_admin"] }, name: 'editdocumenttype', component: () => import('components/data_settings/AddDocument.vue'), props: (route) => ({ ...route.params })
      },
      { path: '/guided_process_editor', meta: { auth: ["Application/micado_admin"] }, component: ProcessManager, name: 'guidedprocesslist' },

      {
        path: '/guided_process_editor/edit/', meta: { auth: ["Application/micado_admin"] }, component: () => import('pages/EditProcess.vue'), props: true, name: process
      },
      {
        path: '/guided_process_editor/edit/:theprocessid', meta: { auth: ["Application/micado_admin"] }, name: 'editprocess', component: () => import('pages/EditProcess.vue'), props: (route) => ({ ...route.params })
      },
      {
        path: '/guided_process_editor/edit/:processId/steps', meta: { auth: ["Application/micado_admin"] }, component: () => import('pages/StepManager.vue'), props: (route) => ({ ...route.params }), name: 'editstep'
      },

      {
        path: '/edit_step/:id', meta: { auth: ["Application/micado_admin"] }, component: () => import('components/EditStep.vue'), props: true, name: process
      },
      {
        path: '/edit_step', meta: { auth: ["Application/micado_admin"] }, component: () => import('components/EditStep.vue'), props: true, name: process
      },

      { path: '/dashboard', meta: { auth: ["Application/micado_admin"] }, component: () => import('pages/Stats.vue') },
      { path: '/map', meta: { auth: ["Application/micado_admin"] }, component: () => import('components/Map.vue') },
      {
        path: '/situation', meta: { auth: ["Application/micado_admin"] },
        component: MigrationSituation,
        children: [
          { path: 'main', component: MigrationSitMain },
          { path: 'editor', component: MigrationSitEditor },
          { path: 'overview', component: MigrationSitOverview },
          { path: 'map', component: MasterPortal },
          {
            path: 'board', component: BoardContainer,
            children: [
              { path: ':board', component: Board }
            ]
          }
        ]
      },
      { path: '/ngo/requestmediation', component: RequestMediation },

      { path: '/glossary', meta: { auth: ["Application/micado_admin"] }, component: GlossaryListPage },
      { path: '/glossary/new', meta: { auth: ["Application/micado_admin"] }, component: GlossaryNewPage },
      { path: '/glossary/:id/edit/', meta: { auth: ["Application/micado_admin"] }, component: GlossaryEditPage },

      { path: '/information', meta: { auth: ["Application/micado_admin"] }, component: InformationListPage },
      { path: '/information/new', meta: { auth: ["Application/micado_admin"] }, component: InformationNewPage },
      { path: '/information/:id/edit/', meta: { auth: ["Application/micado_admin"] }, component: InformationEditPage },
      { path: '/information/categories', meta: { auth: ["Application/micado_admin"] }, component: InformationCategory },

      { path: '/events', meta: { auth: ["Application/micado_admin"] }, component: EventListPage },
      { path: '/events/new', meta: { auth: ["Application/micado_admin"] }, component: EventNewPage },
      { path: '/events/:id/edit/', meta: { auth: ["Application/micado_admin"] }, component: EventEditPage },
      { path: '/events/categories', meta: { auth: ["Application/micado_admin"] }, component: EventCategory }
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
