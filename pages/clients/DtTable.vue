<script setup lang="ts">
const { can, hasAction } = usePermission();

onMounted(() => {
  const { getTable } = useClient();

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

    <vxe-column min-width="90" width="100" field="actions" title="操作" align="right">
      <template #default="{ row }">
        <div class="flex justify-end flex-wrap">
          <q-btn
            flat
            round
            dense
            icon="far fa-pen-to-square"
            color="blue-4"
            @click="setModal(row.id)"
          />
          <q-btn
            flat
            round
            dense
            icon="o_delete"
            color="red-4"
            class="delete-icon"
            @click="setDeleteConfirm(row.id, row.name)"
          />
        </div>
      </template>
    </vxe-column>

    <vxe-column min-width="120" field="name" title="公司名稱" />

    <vxe-column min-width="100" field="representative" title="負責人" />

    <vxe-column min-width="100" field="id_number" title="統一編號" />

    <vxe-column min-width="100" field="tel" title="電話">
      <template #default="{ row }">
        <q-icon name="fa fa-phone" color="grey-7" />
        {{ row.tel }}
      </template>
    </vxe-column>

    <vxe-column min-width="120" field="email" title="信箱" />

    <vxe-column min-width="200" field="address" title="地址" />
  </DataTable>
</template>
