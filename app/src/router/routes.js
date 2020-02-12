
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
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
