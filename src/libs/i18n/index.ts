import type { App } from 'vue'

import { I18n } from 'vue-i18n'

export const VueI18n: I18n = {} as I18n

export const i18n: I18n = {} as I18n

const locale = cfg.DEFAULT_LOCALE

const vuetifyLocaleConfigs: Record<string, 'en' | 'zhHant'> = {
  en: 'en',
  'zh-TW': 'zhHant',
}

export async function initializeI18n(app: App) {
  try {
    let { default: message } = await import(`../../locales/${locale}/core.ts`)
    const { [vuetifyLocaleConfigs[locale]]: vuetifyMessage } = await import('vuetify/locale')

    message = { ...message, ...{ $vuetify: vuetifyMessage } }

    const messages = { [locale]: { ...message, ...{ views: {} } } }

    Object.assign(
      VueI18n,
      createI18n({
        legacy: false,
        globalInjection: true,
        locale,
        messages,
      }),
    )

    Object.assign(i18n, VueI18n.global)

    app.use(VueI18n)
  } catch (e) {
    console.error(`Missing global language pack for ${locale} package`)

    throw e
  }
}
