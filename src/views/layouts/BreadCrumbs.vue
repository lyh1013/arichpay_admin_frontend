<script setup lang="ts">
import { navigation } from '@/navigation/index'

const route = useRoute()

const title = ref()
const breadcrumbs = ref()
const breadcrumbItems = ref()

watchEffect(() => {
  title.value = route.name ? (navigation[route.name].title ?? undefined) : undefined
  breadcrumbs.value = route.name ? navigation[route.name]?.breadcrumb : undefined
  breadcrumbItems.value = route.name ? navigation[route.name]?.breadcrumb?.items : undefined
})
</script>

<template>
  <v-container
    v-if="title && breadcrumbs"
    class="d-flex flex-wrap justify-start align-end ga-4 py-0 ps-0"
  >
    <div class="text-h5 font-weight-medium d-inline-flex align-center">
      <v-btn
        v-if="breadcrumbs?.prevHref"
        :to="breadcrumbs?.prevHref"
        icon="mdi-arrow-left"
        variant="text"
        color="blue-grey-lighten-1"
        class="me-2"
      />
      <!-- <v-icon
          v-if="icon"
          class="nav-item-icon me-2"
          :icon="icon.icon"
          color="grey-700"
          :size="icon?.size ?? 24"
        /> -->

      <h4 class="font-weight-medium">{{ title }}</h4>
    </div>

    <div v-if="breadcrumbItems" class="d-flex align-center flex-wrap">
      <v-breadcrumbs :items="breadcrumbItems" class="py-0 ps-0" />
    </div>
  </v-container>
</template>

<style scoped></style>
