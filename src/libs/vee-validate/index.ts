import { all } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'

import { validatorRequired } from './rules'

// Load validations rules
Object.entries(all).forEach(([ruleName, value]) => {
  const isRequired = ruleName === 'required'

  if (isRequired) return

  defineRule(ruleName, value)
})

defineRule('required', (value: undefined) => validatorRequired(value))

// Load validations messages
const localeConfigurations: Record<string, string> = {
  en: 'en',
  'zh-TW': 'zh_TW',
}

const locale = 'zh-TW'
const { default: message } = await import(`./locales/${locale}.json`)

configure({
  generateMessage: localize({
    [localeConfigurations[locale]]: message,
  }),
})

setLocale(localeConfigurations[locale])
