<script setup lang="ts">
import CookieToast from './components/CookieToast.vue'

const year = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="pa-4 mt-5 text-center">
    <span class="text-medium-emphasis">{{ $t('copyright', { year }) }}</span>
  </footer>

  <CookieToast />
</template>

<style scoped></style>
