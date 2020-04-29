import MpMap from '../components/MpMap.vue'
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
//      { path: '/documents', component: () => import('pages/Documents.vue') },
//      { path: '/services', component: () => import('pages/Services.vue') },
//      { path: '/flows', component: () => import('pages/Flow.vue') },
//      { path: '/notifications', component: () => import('components/Notifications.vue') },
      { path: '/editor', component: () => import('pages/Editor.vue') },
      { path: '/document_type', component: () => import('pages/DocumentTypeManager.vue') },
      { path: '/adddocument', component: () => import('pages/AddDocument.vue') },
      { path: '/adddocument/:id', component: () => import('pages/AddDocument.vue'), props: true, name:document },
      { path: '/processmanager', component: () => import('pages/ProcessManager.vue') },
      { path: '/processmanager/edit/:id', component: () => import('components/EditProcess.vue'), props: true, name:process },
      { path: '/processmanager/edit/', component: () => import('components/EditProcess.vue'), props: true, name:process },
      { path: '/processmanager/edit/:id/steps', component: () => import('pages/StepManager.vue'), props: true, name:process },
      { path: '/processmanager/edit/:id/steps/:id', component: () => import('components/EditStep.vue'), props: true, name:process },
      { path: '/processmanager/edit/:id/steps/new', component: () => import('components/EditStep.vue'), props: true, name:process },
      { path: '/dashboard', component: () => import('components/Dashboard.vue') },
      { path: '/requestmediation', component: () => import('pages/MediationRequest.vue') },
//      { path: '/tasks', component: () => import('pages/Tasks.vue') },
//      { path: '/chatbot', component: () => import('pages/Chatbot.vue') },
//      { path: '/settings', component: () => import('pages/Settings.vue') },
//      { path: '/certificates', component: () => import('pages/Certificates.vue'), props: true, name: 'certificates' },
      { path: '/map', component: () => import('components/Map.vue') },
      { path: '/mpmap', component: MpMap },
      { path: '/configure', component: () => import('pages/Configure.vue') },
      { path: '/activelanguages', component: () => import('components/ActiveLanguageSelector.vue')}
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
