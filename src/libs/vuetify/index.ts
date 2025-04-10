// Styles
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import { fa } from 'vuetify/iconsets/fa'

import { en, zhHant } from 'vuetify/locale'

import theme from './theme'
import defaults from './default'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components,
  directives,
  locale: {
    locale: 'zhHant',
    fallback: 'en',
    messages: { zhHant, en }
  },
  theme,
  defaults,
  icons: {
    defaultSet: 'mdi',
    sets: {
      fa
    }
  },
  display: {
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 400,
      sm: 560,
      md: 960,
      lg: 1280,
      xl: 1920,
      xxl: 2560
    }
  }
})
