
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/slider', component: () => import('pages/Slider-ATU.vue') },
      { path: '/registration', component: () => import('pages/Registration-ATU.vue') },
      { path: '/kard', component: () => import('pages/Kard-ATU.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
