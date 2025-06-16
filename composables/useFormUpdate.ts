import type { FormActions } from 'vee-validate'

export function useFormUpdate(
  updateParams: string | string[],
  setFieldValue: FormActions<Record<string, any>>['setFieldValue']
) {
  const { notify } = useNotify()

  function set(fields: string | string[], data: Record<string, any>) {
    if (!setFieldValue) {
      notify('發生不可預期的錯誤', 'error')

      return
    }

    if (Array.isArray(fields)) {
      fields.forEach(field => {
        const isDataArray = Array.isArray(data[field])
        if (data[field] === null || data[field] === '' || (isDataArray && data[field].length === 0))
          return

        setFieldValue(field, data[field])
      })

      return
    }

    setFieldValue(fields, data[fields])
  }

  function formUpdate(data: Record<string, any>) {
    try {
      set(updateParams, data)
    } catch {
      notify('發生不可預期的錯誤', 'error')
    }
  }

  return { formUpdate }
}
