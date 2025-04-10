<script setup lang="ts">
onMounted(() => {
  const { getTable } = useClient()

  getTable()
})
</script>

<template>
  <v-card-text>
    <VDtTable v-slot="{ setModal, setDeleteConfirm }" :sort="['id', 'asc']">
      <vxe-column
        width="45"
        field="select"
        type="checkbox"
        fixed="left"
        align="center"
        :visible="false"
      />

      <vxe-column min-width="100" width="120" field="actions" title="操作" align="right">
        <template #default="{ row }">
          <div class="d-flex justify-end flex-wrap gap-1">
            <v-btn
              color="blue-lighten-1"
              variant="text"
              icon="mdi-square-edit-outline"
              @click="setModal(row.id)"
            />
            <v-btn
              v-if="!row.is_self"
              color="red-lighten-2"
              variant="text"
              icon="mdi-trash-can-outline"
              @click="setDeleteConfirm(row.id, row.name)"
            />
          </div>
        </template>
      </vxe-column>

      <vxe-column min-width="180" field="name" title="公司名稱" />

      <vxe-column min-width="100" field="representative" title="負責人" />

      <vxe-column min-width="120" field="id_number" title="統一編號" />

      <vxe-column min-width="120" field="tel" title="電話" />

      <vxe-column min-width="150" field="email" title="E-mail" />

      <vxe-column min-width="200" field="address" title="地址" />
    </VDtTable>
  </v-card-text>
</template>
