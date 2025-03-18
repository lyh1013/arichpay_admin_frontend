<script setup lang="ts">
import '@/assets/styles/auth.css'

import FooterBottom from './FooterBottom.vue'
</script>

<template>
  <v-layout class="d-flex flex-column w-100 background">
    <v-main class="position-relative">
      <div class="shape-1" />
      <div class="shape-2" />

      <v-container class="d-table d-sm-flex align-center justify-center flex-column h-screen">
        <div class="w-100 h-100 d-flex flex-column justify-between">
          <RouterView />

          <FooterBottom />
        </div>
      </v-container>
    </v-main>
  </v-layout>
</template>

<style scoped>
.background {
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.4) 0%, #f1f1f8 100%);
  position: relative;
}

.background::before {
  content: '';
  position: absolute;
  top: -250px;
  left: 50%;
  transform: translateX(-50%);
  width: 650px;
  height: 550px;
  border-radius: 50%;
  background-image: linear-gradient(260deg, #654e94 0%, rgba(115, 67, 210, 0.1) 100%);
  -webkit-filter: blur(150px);
  filter: blur(150px);
  opacity: 0.3;
}

.shape-1 {
  background: url(../../assets/images/shapes/bg-shape-1.webp);
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
}

.shape-2 {
  background: url(../../assets/images/shapes/bg-shape-2.webp);
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
}
</style>
