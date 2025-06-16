import { defineRule, configure } from 'vee-validate'
import { all } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'

export default defineNuxtPlugin(async () => {
  Object.entries(all).forEach(([name, rule]) => {
    defineRule(name, rule)
  })

  defineRule('time', (value: string) => {
    const regExp = value.match(/^(\d{2}):(\d{2}):(\d{2})$/)

    if (!regExp) return false

    const [, hhStr, mmStr, ssStr] = regExp

    const hh = parseInt(hhStr, 10)
    const mm = parseInt(mmStr, 10)
    const ss = parseInt(ssStr, 10)

    if (hh > 23 || mm > 59 || ss > 59) return false

    return true
  })

  defineRule('end_time_after_start', (value: string, [startValue]: [string]) => {
    if (!value || !startValue || value === '00:00:00') return true

    const toSeconds = (timeStr: string) => {
      const [h, m, s] = timeStr.split(':').map(Number)

      return h * 3600 + m * 60 + s
    }

    return toSeconds(value) >= toSeconds(startValue)
  })

  await import('../locales/vee-validate/zh-TW.json').then(core => {
    const messagges = {
      zh_TW: core.default
    }

    configure({
      generateMessage: localize(messagges),
      validateOnInput: true,
      validateOnBlur: false
    })

    setLocale('zh_TW')
  })
})
