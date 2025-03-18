<script setup lang="ts">
type Alertype = 'success' | 'info' | 'warning' | 'error'

enum alertColor {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error',
}

const { type = 'success', timeout = 3500 } = defineProps<{
  type?: Alertype | string
  timeout?: number
}>()

const color = computed(() => alertColor[type as Alertype])
</script>

<template>
  <v-snackbar :timeout :color variant="tonal">
    <slot />
  </v-snackbar>
</template>

<style scoped></style>
