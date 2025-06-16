<script setup>
defineProps({
  error: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="flex column justify-center items-center misc-layout q-gutter-md">
    <q-img src="@images/error/oops.png" style="max-width: 400px" />
    <h2 class="q-mb-none">{{ error.statusCode }}</h2>
    <p>{{ error.message }}</p>
    <NuxtLink to="/" class="bg-grey-4 q-pa-sm q-px-md rounded-borders text-grey-10"
      >回首頁</NuxtLink
    >
  </div>
</template>

<style lang="scss" scoped>
.misc-layout {
  width: 100vw;
  height: 100vh;
  background: url(@images/bg/auth-bg.jpg) no-repeat;
  background-size: cover;
}
</style>
