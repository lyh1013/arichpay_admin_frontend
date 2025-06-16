<script setup lang="ts">
const { updateDtRowData } = inject(DtUtils.key) as InstanceType<typeof DtUtils>;
const { id, show, isAdd, isEdit, setLoading, setSpinner, setTitle, setModal } = inject(
  useModalKey,
) as ModalProps;

setTitle('客戶清單');

const { handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: { name: 'required' },
});

watch([show, id], async ([isShow, id]) => {
  if (!isShow) return;

  // setLoading(true);

  // const res = await get(id);

  // roleMenus.value = getRoleCheckList();

  // const { formUpdate } = useFormUpdate(updateFields, setFieldValue);

  // formUpdate(res);
  // setLoading(false);
});

const onSubmit = handleSubmit(async values => {
  setSpinner(true);

  console.log(values);

  setModal(false);
  setSpinner(false);
});

function onAfterLeave() {
  resetForm();
}
</script>

<template>
  <Modal width="600px" @hide="onAfterLeave">
    <template #content>
      <q-form id="create-edit-form" @submit="onSubmit">
        <div class="row">
          <div class="col-12 col-md-6 q-px-xs">
            <TextField label="公司名稱" name="name" />
          </div>

          <div class="col-12 col-md-6 q-px-xs">
            <TextField label="負責人" name="representative" />
          </div>

          <div class="col-12 col-md-6 q-px-xs">
            <TextField label="統一編號" name="id_number" />
          </div>

          <div class="col-12 col-md-6 q-px-xs">
            <TextField label="電話" name="tel" />
          </div>

          <div class="col-12 col-md-6 q-px-xs">
            <TextField label="信箱" name="email" />
          </div>

          <div class="col-12 col-md-6 q-px-xs">
            <TextField label="地址" name="address" />
          </div>
        </div>
      </q-form>
    </template>
  </Modal>
</template>
