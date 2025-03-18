export default [
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/error/ErrorView.vue'),
    meta: {
      layout: 'misc',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: 'error',
  },
]
