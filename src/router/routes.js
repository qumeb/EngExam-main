
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MaterialsPage.vue') },
      { path: '/tests', component: () => import('pages/TestsPage.vue') },
      { path: '/favourites', component: () => import('pages/FavouritesPage.vue')},
      { path: '/settings', component: () => import('pages/SettingsPage.vue') },
      { path: '/testPage', component: () => import('pages/TestPage.vue') },
      { path: '/finalTestPage', component: () => import('pages/FinalTestPage.vue') }
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
