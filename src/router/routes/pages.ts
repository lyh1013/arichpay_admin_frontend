export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/HomeView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/clients',
    name: 'clients',
    component: () => import('@/views/clients/ClientView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/confirm',
    name: 'confirm',
    component: () => import('@/views/confirm/ConfirmView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('@/views/news/NewsView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/accounts',
    name: 'accounts',
    children: [
      {
        path: 'usergroups',
        name: 'usergroups',
        component: () => import('@/views/accounts/usergroups/UsergroupView.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/accounts/users/UserView.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/accounts/ProfileView.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]
