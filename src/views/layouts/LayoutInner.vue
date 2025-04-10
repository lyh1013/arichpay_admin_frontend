<script setup lang="ts">
import { useDisplay } from 'vuetify'

import HeaderTop from './HeaderTop.vue'
import BreadCrumbs from './BreadCrumbs.vue'
import CookieToast from './components/CookieToast.vue'

const { mdAndUp } = useDisplay()
</script>

<template>
  <v-layout
    class="d-flex flex-column background"
    :style="{ overflow: mdAndUp ? 'hidden' : 'visible' }"
  >
    <HeaderTop />

    <v-main class="py-4">
      <BreadCrumbs />
      <RouterView />
      <CookieToast />
    </v-main>
  </v-layout>
</template>

<style scoped>
.background {
  background: url(../../assets/images/bg/background.jpg) no-repeat;
  background-size: cover;
}
</style>
