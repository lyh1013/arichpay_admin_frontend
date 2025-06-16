import type { VxeGlobalI18nLocale } from 'vxe-table'

import VxeTable from 'vxe-table'
import VxeUI from 'vxe-pc-ui'

import 'vxe-table/lib/style.css'
import 'vxe-pc-ui/lib/style.css'

import { tableConfig, iconConfig, getLocalePackage } from './config'

export default defineNuxtPlugin(async ({ vueApp }) => {
  vueApp.use(VxeTable)
  vueApp.use(VxeUI)

  const locale = 'zh-TW'

  const { default: message } = await getLocalePackage(locale)

  const localeMatched: { [key: string]: VxeGlobalI18nLocale } = {
    en: 'en-US',
    'zh-TW': 'zh-TW'
  }

  VxeUI.setI18n(localeMatched[locale], message)
  VxeUI.setLanguage(localeMatched[locale])
  VxeUI.setConfig(tableConfig)
  VxeUI.setIcon(iconConfig)
})
