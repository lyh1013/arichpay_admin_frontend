<script setup lang="ts">
import { navigation } from '@configs/menu/navigation';

const route = useRoute();

const title = ref();
const breadcrumbs = ref();
const breadcrumbItems = ref();

watchEffect(() => {
  title.value = route.name ? (navigation[route.name]?.title ?? undefined) : undefined;
  breadcrumbs.value = route.name ? navigation[route.name]?.breadcrumb : undefined;
  breadcrumbItems.value = route.name ? navigation[route.name]?.breadcrumb?.items : undefined;
});
</script>

<template>
  <q-banner class="bg-grey-3 q-py-lg q-pb-xl">
    <h5 class="q-my-sm">{{ title }}</h5>

    <q-breadcrumbs v-if="breadcrumbs">
      <q-breadcrumbs-el
        v-for="item in breadcrumbItems"
        :key="item.title"
        :label="item.title"
        :icon="item.icon"
        class="text-grey-7"
      />
    </q-breadcrumbs>
  </q-banner>
</template>

<style scoped>
:deep(.q-banner__content) {
  display: flex;
  align-items: baseline;
  gap: 12px;
}
</style>
