export function useDeleteConfirm() {
  const [isDeleteSpinner, setDeleteSpinner] = useCustomState(false)

  const [isDeleteConfirm, setDeleteConfirmState] = useCustomState(false)

  const _deleteConfirmData = shallowRef({
    id: null,
    name: ''
  })

  const deleteConfirmData = computed(() => _deleteConfirmData.value)

  function setDeleteConfirm(idOrStatus: any, name?: string) {
    if (typeof idOrStatus !== 'boolean')
      _deleteConfirmData.value = { id: idOrStatus, name: name ?? '' }

    setDeleteConfirmState(!!idOrStatus)
  }

  function onDeleteConfirmAfterLeave() {
    setDeleteSpinner(false)

    _deleteConfirmData.value = { id: null, name: '' }
  }

  return {
    deleteConfirmData,
    isDeleteConfirm,
    isDeleteSpinner,

    setDeleteSpinner,
    setDeleteConfirmState,
    setDeleteConfirm,
    onDeleteConfirmAfterLeave
  }
}
