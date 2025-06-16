<script setup lang="ts">
const { t } = useI18n()

const year = computed(() => new Date().getFullYear())
</script>

<template>
  <q-footer class="bg-transparent text-grey-10 q-pa-sm text-center">
    <p>{{ t('copyright', { year }) }}</p>
  </q-footer>
</template>

<style scoped></style>
