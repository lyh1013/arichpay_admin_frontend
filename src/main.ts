import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { initializeI18n } from '@/libs/i18n/index'
import vuetify from '@/libs/vuetify/index'
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar'
import { createHead } from '@unhead/vue'

import '@/libs/vee-validate/index'

import 'animate.css'
import './assets/styles/main.css'
import 'vue3-perfect-scrollbar/style.css'

async function initializeApp() {
  const app = createApp(App)
  const pinia = createPinia()
  const head = createHead()

  app.use(router)
  app.use(pinia)

  await initializeI18n(app)

  app.use(vuetify)
  app.use(PerfectScrollbarPlugin, { componentName: 'vscrollbar' })
  app.use(head)

  app.mount('#app')
}

initializeApp().catch((error) => {
  console.error('Failed to initialize app:', error)
})
