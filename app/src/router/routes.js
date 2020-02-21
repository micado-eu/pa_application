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
      { path: '/dashboard', component: () => import('components/dashboard/home.vue') },
      { path: '/requestmediation', component: () => import('pages/MediationRequest.vue') },
//      { path: '/tasks', component: () => import('pages/Tasks.vue') },
//      { path: '/chatbot', component: () => import('pages/Chatbot.vue') },
//      { path: '/settings', component: () => import('pages/Settings.vue') },
//      { path: '/certificates', component: () => import('pages/Certificates.vue'), props: true, name: 'certificates' },
      { path: '/map', component: () => import('components/Map.vue') },
      { path: '/configure', component: () => import('pages/Configure.vue') }
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
