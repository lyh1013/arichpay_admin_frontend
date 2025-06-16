<script setup lang="ts">
import type { VxeTableInstance, VxePagerInstance, VxePagerProps } from 'vxe-table';

const { setModal } = inject(useModalKey) as ModalProps;

defineOptions({ inheritAttrs: false });

const { sort, pageConfig } = defineProps<{
  sort: [string, 'asc' | 'desc'];
  pageConfig?: VxePagerProps;
}>();

const { t } = useI18n();
const { $q } = useNuxtApp();

const {
  loading,
  data,
  pager,
  pageChange,
  setTableRef,
  setPagerRef,
  setSort,
  setColumnFixed,
  sortChange,
  filterChange,
  selectChange,
  selectRangeChange,
  remove,
} = inject(DtUtils.key) as InstanceType<typeof DtUtils>;

const {
  deleteConfirmData,
  isDeleteConfirm,
  isDeleteSpinner,
  setDeleteSpinner,
  setDeleteConfirm,
  onDeleteConfirmAfterLeave,
} = useDeleteConfirm();

const { width, height } = useWindowSize();

const VxeTableRef = useTemplateRef<VxeTableInstance>('VxeTable');
const VxePagerRef = useTemplateRef<VxePagerInstance>('VxePager');
const sortConfig = ref({});

const isRecordOverflowLength = computed(() =>
  pager.totals && pager.length ? pager.totals > pager.length : false,
);
const maxHeight = computed(() => {
  const minusHeight = isRecordOverflowLength.value ? 315 : 315;

  return width.value > 600 ? height.value - minusHeight : undefined;
});

onMounted(() => {
  setTableRef(VxeTableRef.value);
  setPagerRef(VxePagerRef.value);

  if (sort) {
    const [field, order] = sort;

    setSort(field, order);
    sortConfig.value = { defaultSort: { field, order } };
  }

  watchEffect(() => {
    setColumnFixed('actions', $q.screen.gt.lg ? 'left' : null);
  });
});

async function handleDelete() {
  setDeleteSpinner(true);

  await remove(deleteConfirmData.value.id);

  setDeleteConfirm(false);
}
</script>

<template>
  <vxe-table
    ref="VxeTable"
    :loading
    :data
    :max-height
    auto-resize
    :column-config="{ useKey: true }"
    :row-config="{ useKey: true }"
    :checkbox-config="{ range: true }"
    :sort-config
    @sort-change="sortChange"
    @header-cell-click="sortChange"
    @filter-change="filterChange"
    @checkbox-all="selectChange"
    @checkbox-change="selectChange"
    @checkbox-range-change="selectRangeChange"
    v-bind="$attrs"
  >
    <slot v-bind="{ setModal, setDeleteConfirm }" />
  </vxe-table>

  <vxe-pager
    ref="VxePager"
    v-model:current-page="pager.p"
    v-model:page-size="pager.length"
    :total="pager.totals"
    v-bind="pageConfig"
    @page-change="pageChange"
  />

  <AlertDialog
    v-model:active="isDeleteConfirm"
    :title="t('confirm.removeTitle')"
    :is-alert-spinner="isDeleteSpinner"
    @call-to-action="handleDelete"
    @hide="onDeleteConfirmAfterLeave"
  >
    <template #content>
      <i18n-t keypath="confirm.remove" tag="div" scope="global" class="text-center text-h6">
        <template #name>
          <q-chip :ripple="false" color="red-1 text-red">{{ deleteConfirmData.name }}</q-chip>
        </template>
      </i18n-t>
    </template>
  </AlertDialog>
</template>

<style scoped>
.vxe-table--render-default {
  --vxe-ui-font-color: rgba(34, 36, 38, 0.9);
  font-size: 1rem;
  font-family: 'Open Sans', sans-serif;
}

:deep(.vxe-cell--filter) {
  margin-left: 1%;
}

:deep(.vxe-table--filter-wrapper .vxe-table--filter-body) {
  max-height: 200px !important;
}

:deep(.vxe-body--column:not(.col--ellipsis)) {
  padding: var(--vxe-ui-table-column-padding-medium);
}

:deep(.vxe-body--expanded-cell) {
  background-color: var(--q-third);
}

:deep(.vxe-table--expanded) {
  display: inline-block;
  text-align: center;
  line-height: 1;
  border-radius: 50%;
}

:deep(.vxe-table--expanded .vxe-table--expand-btn) {
  margin: 0 auto;
  width: auto;
  height: auto;
  font-size: 1.6rem;
  color: #039be5;
  border: 4px solid #d7ecf6;
  border-radius: 50%;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

:deep(.vxe-table--render-default .vxe-table--expanded .vxe-table--expand-btn:hover) {
  color: var(--q-third);
}

:deep(.vxe-cell--sort) {
  height: 15px;
  margin-left: 1%;
  margin-top: -5px;
}

:deep(.vxe-cell--filter .vxe-filter--btn) {
  font-size: 1.2rem;
}

:deep(.vxe-cell--sort-vertical-layout .vxe-sort--asc-btn),
:deep(.vxe-cell--sort-vertical-layout .vxe-sort--desc-btn) {
  height: 2px;
  font-size: 1.05rem;
}

:deep(.vxe-header--column) {
  font-weight: 500;
}

:deep(.vxe-header--column.is--sortable) {
  cursor: pointer;
}

.vxe-pager {
  --vxe-ui-font-size-default: 0.9rem;
  height: auto;
  padding: 0.465rem;
  padding-top: 1rem;
}

.vxe-pager :deep(.vxe-pager--jump .vxe-pager--goto) {
  width: 3em;
}

.vxe-pager :deep(.vxe-pager--num-btn) {
  margin: 0 0.2rem;
}

.vxe-pager .vxe-pager--jump-next:not(.is--disabled).is--active,
.vxe-pager .vxe-pager--jump-next:not(.is--disabled):focus,
.vxe-pager .vxe-pager--jump-prev:not(.is--disabled).is--active,
.vxe-pager .vxe-pager--jump-prev:not(.is--disabled):focus,
.vxe-pager .vxe-pager--next-btn:not(.is--disabled).is--active,
.vxe-pager .vxe-pager--next-btn:not(.is--disabled):focus,
.vxe-pager .vxe-pager--num-btn:not(.is--disabled).is--active,
.vxe-pager .vxe-pager--num-btn:not(.is--disabled):focus,
.vxe-pager .vxe-pager--prev-btn:not(.is--disabled).is--active,
.vxe-pager .vxe-pager--prev-btn:not(.is--disabled):focus {
  color: var(--q-primary);
}

:deep(.vxe-pager--jump-next),
:deep(.vxe-pager--jump-prev),
:deep(.vxe-pager--next-btn),
:deep(.vxe-pager--num-btn),
:deep(.vxe-pager--prev-btn) {
  margin: 0 0.15rem;
}

:deep(.vxe-body--expanded-cell) {
  z-index: 10;
}

.vxe-table--context-menu-clild-wrapper,
.vxe-table--context-menu-wrapper {
  font-size: 1rem;
}

:deep(.vxe-body--row.row--checked),
:deep(.vxe-body--row.row--checked.row--hover),
:deep(.vxe-body--row.row--checked:hover) {
  background-color: rgb(var(--q-primary), 0.1);
}
:deep(.vxe-body--row .v-switch.v-input .v-selection-control) {
  justify-content: center;
}

:deep(.vxe-table--body-wrapper::-webkit-scrollbar) {
  width: 0.45rem;
  height: 0.45rem;
}

:deep(.vxe-table--body-wrapper::-webkit-scrollbar-track),
:deep(.vxe-table--body-wrapper::-webkit-scrollbar-corner) {
  background-color: #ffffff;
}
:deep(.vxe-table--body-wrapper::-webkit-scrollbar-thumb) {
  border-radius: 6px;
  background-color: rgba(var(--q-perfect-scrollbar-thumb), 0.6);
}
:deep(
  .vxe-table--body-wrapper::-webkit-scrollbar-thumb:hover,
  .vxe-table--body-wrapper::-webkit-scrollbar-thumb:active
) {
  background-color: rgba(var(--q-perfect-scrollbar-thumb), 1);
}
</style>
