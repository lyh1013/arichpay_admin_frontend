<script setup lang="ts">
import Footer from './components/Footer.vue';
</script>

<template>
  <q-layout container style="height: 100vh" class="auth-bg">
    <q-page-container>
      <slot />
    </q-page-container>

    <Footer />
  </q-layout>
</template>

<style scoped>
.auth-bg {
  background: var(--q-third);
}
</style>
