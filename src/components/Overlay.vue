<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const { background = true } = defineProps<{ background?: boolean }>()
</script>

<template>
  <v-overlay
    class="align-center justify-center"
    :class="{ 'no-bg': !background }"
    :close-on-back="false"
    :opacity="0.07"
    contained
    persistent
    v-bind="$attrs"
  >
    <v-progress-circular color="blue-grey-lighten-3" size="32" indeterminate="disable-shrink" />
  </v-overlay>
</template>

<style scoped>
.v-overlay {
  min-height: 130px;
}

:deep(.v-overlay__scrim) {
  backdrop-filter: blur(1px);
}

.v-overlay.no-bg :deep(.v-overlay__scrim) {
  background: none !important;
}
</style>
