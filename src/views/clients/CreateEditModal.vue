<script setup lang="ts">
import type { ModalProps } from '@/composables/useModal'

const { id, show, isAdd, isEdit, setTitle, setModal } = inject(useModalKey) as ModalProps

setTitle('客戶資料')

const { handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: {}
})

watch([show, id], async ([isShow, id]) => {
  // if (isShow && !id) {}

  if (!isShow || !id) return

  console.log(id)
  // const { data } = await get(id)

  // const { formUpdate } = new Form(updateFields, setFieldValue)

  // formUpdate(data)
})

function onAfterLeave() {
  resetForm()
}

const onSubmit = handleSubmit(async values => {
  console.log(values)
  // if (isAdd.value) {
  //   await create(values).then(() => getTable(params.value))
  // }

  // if (isEdit.value) {
  //   const res = await set(id.value as string, values)

  //   updateDtRowData(res)
  // }

  setModal(false)
})
</script>

<template>
  <Modal size="xs" @afterLeave="onAfterLeave">
    <template #content>
      <VForm id="create-edit-form" @submit="onSubmit">
        <VRow>
          <VCol cols="12">
            <TextField label="名稱" name="name" />
          </VCol>

          <VCol cols="12">
            <TextField label="負責人" name="representative" />
          </VCol>

          <VCol cols="12">
            <TextField label="統一編號" name="id_number" />
          </VCol>

          <VCol cols="12">
            <TextField label="電話" name="tel" />
          </VCol>

          <VCol cols="12">
            <TextField label="信箱" name="email" />
          </VCol>

          <VCol cols="12">
            <TextField label="地址" name="address" />
          </VCol>
        </VRow>
      </VForm>
    </template>
  </Modal>
</template>

<style scoped></style>
