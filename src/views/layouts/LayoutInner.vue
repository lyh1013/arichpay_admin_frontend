<script setup lang="ts">
import { useDisplay } from 'vuetify'

import HeaderTop from './HeaderTop.vue'
import BreadCrumbs from './BreadCrumbs.vue'
import CookieToast from './components/CookieToast.vue'

const { mdAndUp } = useDisplay()
</script>

<template>
  <v-layout class="d-flex flex-column" :style="{ overflow: mdAndUp ? 'hidden' : 'visible' }">
    <HeaderTop />

    <v-main class="py-4 py-md-6">
      <BreadCrumbs />
      <RouterView />
      <CookieToast />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
