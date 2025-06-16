<script setup lang="ts">
import Header from './components/Header.vue'
import BreadCrumb from './components/BreadCrumb.vue'
</script>

<template>
  <q-layout view="lhh LpR lff" container style="height: 100vh">
    <Header />

    <q-page-container>
      <BreadCrumb />

      <slot />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
:deep(.q-page.q-layout-padding) {
  min-height: auto !important;
}
</style>
