type NotifyType = 'success' | 'info' | 'warning' | 'error'
type Position =
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top'
  | 'left'
  | 'right'
  | 'center'

export function useNotify() {
  const nuxtApp = useNuxtApp()

  const $q = nuxtApp.$q

  function notify(message: string, type: NotifyType = 'info', position: Position = 'bottom') {
    if (!$q) {
      // eslint-disable-next-line no-console
      console.error('Quasar $q is not available')

      return
    }

    const alertColors = {
      success: 'green-5',
      info: 'blue-5',
      warning: 'orange-5',
      error: 'red-5'
    }

    const alertIcons = {
      success: 'check_circle',
      info: 'info',
      warning: 'warning',
      error: 'report'
    }

    $q.notify({
      message,
      color: alertColors[type],
      icon: alertIcons[type],
      position
    })
  }

  return { notify }
}
