<script setup lang="ts">
const { t } = useI18n();

useHead({
  titleTemplate: title => (title ? title + ' - ' : '') + `${t('sitename')}`,
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
