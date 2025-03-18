<script lang="ts" setup>
import { navigation } from '@/navigation/index'

const route = useRoute()

useHeadSafe({
  title: () => {
    if (!route.name) return ''

    return navigation[route.name].title ?? ''
  },
  titleTemplate: title => (title ? title + ' - ' : '') + i18n.t('sitename')
})

const LayoutAuth = defineAsyncComponent({
  loader: () => import('./views/layouts/LayoutAuth.vue'),
  delay: 0
})

const LayoutInner = defineAsyncComponent({
  loader: () => import('./views/layouts/LayoutInner.vue'),
  delay: 0
})

const LayoutMisc = defineAsyncComponent({
  loader: () => import('./views/layouts/LayoutMisc.vue'),
  delay: 0
})

const layout = computed(() => {
  if (route.name === undefined) return ''

  switch (route.meta.layout) {
    case 'auth':
      return LayoutAuth
    case 'misc':
      return LayoutMisc
    default:
      return LayoutInner
  }
})
</script>

<template>
  <VLocaleProvider>
    <VApp>
      <component :is="layout" />
    </VApp>
  </VLocaleProvider>
</template>
