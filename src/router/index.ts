import { createRouter, createWebHistory } from 'vue-router'

import auth from './routes/auth'
import pages from './routes/pages'
import others from './routes/others'

import { useStorage } from '@/composables/useStorage'

const routes = [...auth, ...pages, ...others]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async to => {
  const { getLocalStorage } = useStorage()
  const { isLoggedIn } = storeToRefs(useAuth())

  if (getLocalStorage('isLoggedIn')) {
    isLoggedIn.value = true

    return
  }

  isLoggedIn.value = false
})

export default router
