<script setup lang="ts">
const { filters } = inject(DtUtils.key) as InstanceType<typeof DtUtils>;

const { getFilters, getTable, actions } = useUser();
const { can } = usePermission();

onMounted(() => {
  getFilters(['Active']);
  getTable();
});
</script>

<template>
  <DataTable v-slot="{ setModal }" :sort="['UpdatedDate', 'desc']">
    <vxe-column
      width="45"
      field="select"
      type="checkbox"
      fixed="left"
      align="center"
      :visible="false"
    />

    <vxe-column
      v-if="can('update')"
      min-width="70"
      width="80"
      field="actions"
      title="操作"
      align="center"
    >
      <template #default="{ row }">
        <div class="flex justify-center flex-wrap">
          <q-btn
            flat
            round
            dense
            icon="far fa-pen-to-square"
            color="blue-4"
            @click="setModal(row.UUID)"
          />
        </div>
      </template>
    </vxe-column>

    <vxe-column min-width="150" field="UserName" title="使用者名稱" />

    <vxe-column min-width="100" field="UserID" title="使用者編號" />

    <vxe-column min-width="100" field="IDCardNumber" title="識別證卡號" />

    <vxe-column min-width="180" field="CompanyCode" title="歸屬營運據點編號" />

    <vxe-column min-width="180" field="Code" title="歸屬部門編號" />

    <vxe-column min-width="200" field="Email" title="E-mail" />

    <vxe-column min-width="150" field="UpdatedDate" title="最後修改日期" sortable />

    <vxe-column width="120" field="Active" title="狀態" align="center" :filters>
      <template #default="{ row }">
        <Toggle
          v-model="row.Active"
          @update:model-value="actions(row.UUID, row.Active)"
          :disable="!can('update')"
        />
      </template>
    </vxe-column>
  </DataTable>
</template>
