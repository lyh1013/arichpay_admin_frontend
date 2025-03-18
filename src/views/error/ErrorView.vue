<script setup lang="ts">
import image from '@images/patterns/error.jpg'
</script>

<template>
  <v-empty-state :title="$t('error.title')" :text="$t('error.description')" :image size="300">
    <v-btn prepend-icon="mdi-keyboard-return" variant="tonal" to="/" :text="$t('error.backHome')" />
  </v-empty-state>
</template>

<style scoped>
:deep(.v-empty-state__title) {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: '16px';
}

:deep(.v-empty-state__text) {
  font-size: 1.075rem;
}
</style>
