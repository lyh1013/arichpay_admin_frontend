<script setup lang="ts">
import type { StoreGeneric } from 'pinia';

interface ImportService {
  import: (data: any) => Promise<any>;
}

const { setTitle, setModal } = inject('useImportModal') as ModalProps;
const service = inject<ImportService | null>('service', null);
const store = inject('store', null) as StoreGeneric | null;

setTitle('Excel 匯入');

const { notify } = useNotify();
const [spinner, setSpinner] = useCustomState(false);
const [exportSpinner, setExportSpinner] = useCustomState(false);
const [showExport, setShowExport] = useCustomState(false);

const { handleSubmit, resetForm, defineField } = useForm({
  validationSchema: {
    file: 'required',
  },
});

const [file, fileProps] = defineField('file');

const { errorMessage } = useField<any>('file', undefined, { label: '檔案上傳', syncVModel: true });

const errorData = ref();

const onSubmit = handleSubmit(async values => {
  if (!service) {
    console.error('Service not found');

    return;
  }

  setSpinner(true);

  const formData = new FormData();

  formData.append('file', values.file);

  const { Code, Data } = await service.import(formData);

  setSpinner(false);

  if (Code === 400) {
    notify('匯入錯誤 ! 請匯出錯誤檔，確認資料無誤後再重新匯入', 'error');

    setShowExport(true);

    errorData.value = Data;

    return;
  }

  notify('檔案匯入成功', 'success');

  store.getTable();

  setModal(false);
});

async function exportExcel() {
  setExportSpinner(true);

  const { exportErrorExcel } = useExport();

  exportErrorExcel(errorData.value);

  setExportSpinner(false);
  setModal(false);
}

function onAfterLeave() {
  resetForm();
  setShowExport(false);
}
</script>

<template>
  <Modal
    width="400px"
    form-id="import-form"
    :is-import="true"
    icon="upload"
    color="grey-9"
    @hide="onAfterLeave"
  >
    <template #content>
      <q-form id="import-form" @submit="onSubmit" enctype="multipart/form-data">
        <div class="row">
          <div class="col-12">
            <q-file
              v-model="file"
              name="file"
              v-bind="fileProps"
              :error="errorMessage ? true : false"
              :error-message="errorMessage"
              outlined
              dense
              max-files="1"
              lazy-rules
              clearable
              hide-bottom-space
              accept=".xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            >
              <div
                v-show="!file"
                class="text-subtitle1 text-bold flex items-center column text-grey-8 upload-text"
              >
                <q-icon name="upload" size="md" />
                <label>上傳檔案或拖移上傳</label>
              </div>
            </q-file>
          </div>
        </div>
      </q-form>
    </template>

    <template #actions>
      <q-btn type="submit" label="上傳" color="primary" form="import-form" :loading="spinner" />
      <q-btn
        v-if="showExport"
        outline
        type="button"
        label="匯出錯誤檔"
        color="primary"
        :loading="exportSpinner"
        @click="exportExcel()"
      />
    </template>
  </Modal>
</template>

<style scoped>
:deep(.q-field--auto-height.q-field--dense .q-field__control) {
  height: 120px;
}

:deep(.q-field__control-container.q-anchor--skip) {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

:deep(.q-field--outlined .q-field__control:before) {
  border: 2px dashed rgba(0, 0, 0, 0.24);
}

:deep(.q-field--dense .q-field__append) {
  height: 100%;
}

.upload-text {
  margin-top: -24px;
}
</style>
