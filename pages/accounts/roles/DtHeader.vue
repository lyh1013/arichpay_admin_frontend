<script setup lang="ts">
const { exportData } = storeToRefs(useRole());

const searchProps = ['Code', 'Name'];
const exportHeaders = ['角色編號', '角色名稱', '備註', '最後修改日期'];
</script>

<template>
  <DataTableHeader
    :searchProps
    :exportHeaders
    :exportData
    exportName="角色權限資料"
    :actions="{ import: false }"
  />
</template>
