import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(async ({ vueApp }) => {
  const locale = 'zh-TW'

  const { default: message } = await import(`../locales/zh-TW/core`)

  const messages = { [locale]: message }

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale,
    messages
  })

  vueApp.use(i18n)
})
