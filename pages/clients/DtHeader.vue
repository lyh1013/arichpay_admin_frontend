<script setup lang="ts">
const searchProps = ['Code', 'Name'];
</script>

<template>
  <DataTableHeader :searchProps :actions="{ import: false }" />
</template>
