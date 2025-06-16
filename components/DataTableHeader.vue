<script setup lang="ts">
import ImportModal from './ImportModal.vue';

const { can, hasBatchSelect } = usePermission();
const { exportExcel } = useExport();

const useImportModal = useModal();

const { setModal: setImportModal } = useImportModal;

const { setModal } = (inject(useModalKey) as ModalProps) ?? {};

const {
  searchProps = [],
  exportHeaders = [],
  exportData = [],
  exportName = '',
  actions = {
    create: true,
    batch: true,
    status: false,
    remove: true,
    export: true,
    import: true,
  },
} = defineProps<{
  searchProps?: string[];
  exportHeaders?: string[];
  exportData?: string[][];
  exportName?: string;
  actions?: {
    create?: Boolean;
    batch?: Boolean;
    status?: Boolean;
    remove?: Boolean;
    export?: Boolean;
    import?: Boolean;
  };
}>();

const {
  select,
  isSelected,
  isSelectBatch,
  selectVisible,
  searchEvent,
  resetDt,
  actionBatch,
  removeBatch,
} = inject(DtUtils.key) as InstanceType<typeof DtUtils>;

const {
  isDeleteConfirm,
  isDeleteSpinner,
  setDeleteSpinner,
  setDeleteConfirm,
  onDeleteConfirmAfterLeave,
} = useDeleteConfirm();

const { t } = useI18n();

const filterName = ref('');

const hasExportOrImport = computed(() => (actions.export ?? true) || (actions.import ?? true));

async function onRemove() {
  setDeleteSpinner(true);

  await removeBatch();

  setDeleteConfirm(false);
}

provide('useImportModal', useImportModal);
</script>

<template>
  <div class="q-mb-md">
    <div class="row">
      <div class="col-auto flex items-center justify-start q-gutter-md">
        <q-btn :label="t('actions.create')" color="primary" @click="setModal(true)" />

        <q-separator v-if="actions.create ?? true" vertical />

        <q-btn-group outline>
          <q-btn
            outline
            color="indigo-5"
            :icon="isSelectBatch ? 'disabled_by_default' : 'playlist_add_check'"
            :label="t('actions.batch', 0)"
            @click="selectVisible"
          />
          <q-btn-dropdown outline color="indigo-5" class="bg-deep-purple-1">
            <template v-if="!select.count" #label>{{ t('actions.batchApply') }}</template>
            <template v-else #label>{{ t('actions.selected', { count: select.count }) }}</template>
            <q-list>
              <q-item
                v-if="actions.status"
                :clickable="isSelected"
                :disabled="isSelected ? undefined : true"
                @click="actionBatch('Y')"
              >
                <q-item-section>
                  <q-item-label>{{ t('actions.enable') }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                v-if="actions.status"
                :clickable="isSelected"
                :disabled="isSelected ? undefined : true"
                @click="actionBatch('N')"
              >
                <q-item-section>
                  <q-item-label>{{ t('actions.disable') }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                v-if="actions.remove ?? true"
                :clickable="isSelected"
                :disabled="isSelected ? undefined : true"
                @click="setDeleteConfirm(true)"
              >
                <q-item-section>
                  <q-item-label>{{ t('actions.remove') }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-btn-group>

        <!-- <q-separator v-show="hasExportOrImport && hasBatchSelect" vertical />

        <template>
          <q-btn-group flat>
            <q-btn
              v-show="actions.export ?? true"
              label="Excel 匯出"
              flat
              icon="download"
              @click="exportExcel(exportHeaders, exportData, exportName)"
            />
            <q-btn
              v-show="actions.import ?? true"
              label="Excel 匯入"
              flat
              icon="upload_file"
              @click="setImportModal(true)"
            />
          </q-btn-group>
        </template> -->
      </div>

      <div class="col-12 col-sm-auto q-ml-auto q-mt-md q-mt-sm-none">
        <vxe-input
          v-model="filterName"
          type="search"
          placeholder="搜尋..."
          clearable
          class="w-100"
          @change="searchEvent(filterName, searchProps)"
        />
      </div>
    </div>

    <AlertDialog
      v-model:active="isDeleteConfirm"
      :title="t('confirm.removeTitle')"
      :is-alert-spinner="isDeleteSpinner"
      @call-to-action="onRemove"
      @hide="onDeleteConfirmAfterLeave"
    >
      <template #content>
        <i18n-t keypath="confirm.removeBatch" tag="div" scope="global" class="text-center text-h6">
          <template #count>
            <q-chip :ripple="false" color="red-1 text-red">{{ select.count }}</q-chip>
          </template>
        </i18n-t>
      </template>
    </AlertDialog>

    <ImportModal injection-key="useImportModal" />
  </div>
</template>

<style scoped>
:global(.q-position-engine) {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.12);
}
</style>
