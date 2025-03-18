export default [
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/views/auth/SigninView.vue'),
    meta: {
      layout: 'auth',
      requiresAuth: true
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('@/views/auth/ForgetView.vue'),
    meta: {
      layout: 'auth',
      requiresAuth: true
    }
  }
]
