<script setup lang="ts">
const { can, hasAction } = usePermission();

onMounted(() => {
  const { getTable } = useRole();

  getTable();
});
</script>

<template>
  <DataTable v-slot="{ setModal, setDeleteConfirm }" :sort="['UpdatedDate', 'desc']">
    <vxe-column
      width="45"
      field="select"
      type="checkbox"
      fixed="left"
      align="center"
      :visible="false"
    />

    <vxe-column
      v-if="hasAction"
      min-width="90"
      width="100"
      field="actions"
      title="操作"
      align="right"
    >
      <template #default="{ row }">
        <div class="flex justify-end flex-wrap">
          <q-btn
            v-if="can('update')"
            flat
            round
            dense
            icon="far fa-pen-to-square"
            color="blue-4"
            @click="setModal(row.UUID)"
          />
          <q-btn
            v-if="can('delete')"
            flat
            round
            dense
            icon="o_delete"
            color="red-4"
            class="delete-icon"
            @click="setDeleteConfirm(row.UUID, row.Name)"
          />
        </div>
      </template>
    </vxe-column>

    <vxe-column min-width="120" field="Code" title="角色編號" />

    <vxe-column min-width="120" field="Name" title="角色名稱" />

    <vxe-column min-width="120" field="Memo" title="備註" />

    <vxe-column min-width="150" field="UpdatedDate" title="最後修改日期" sortable />
  </DataTable>
</template>
