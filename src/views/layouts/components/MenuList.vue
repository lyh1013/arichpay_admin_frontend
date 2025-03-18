<script setup lang="ts">
import { menus, type Menu } from '@/navigation/menu'

const route = useRoute()

const menuItems = ref(menus)

function isNavActive(item: Menu): boolean {
  if (item.to && item.to === route.path) return true

  if (item.children && item.children.length > 0) {
    return item.children.some((child: Menu) => child.to === route.path)
  }

  return false
}
</script>

<template>
  <v-list-item
    v-for="{ to, title, icon, children } in menuItems"
    :key="title"
    :to
    :prepend-icon="icon"
    :append-icon="children ? 'mdi-menu-down' : ''"
    active-class="active-menu"
    :class="{ 'active-menu': isNavActive({ to, title, icon, children }) }"
  >
    <v-menu v-if="children">
      <template v-slot:activator="{ props }">
        <span v-bind="props"> {{ title }} </span>
      </template>

      <v-list class="mt-2" active-class="font-weight-bold text-primary">
        <v-list-item
          v-for="{ to, title } in children"
          :key="title"
          :to
          :title
          active-class="active-child-menu"
        />
      </v-list>
    </v-menu>

    <span v-else>{{ title }}</span>
  </v-list-item>
</template>

<style scoped>
:deep(.v-list-item--active:hover > .v-list-item__overlay),
:deep(.parent .v-list-item:hover > .v-list-item__overlay) {
  opacity: 0;
}

:deep(.v-list-item__prepend),
:deep(.v-list-item__append) {
  display: block;
}

:deep(.v-list-item__append > .v-icon ~ .v-list-item__spacer) {
  width: 0;
}

.active-menu {
  border: 1px solid rgb(var(--v-theme-primary));
  border-radius: 6px !important;
  color: rgb(var(--v-theme-primary));
}

.active-child-menu {
  background-color: rgba(var(--v-theme-primary), 0.1);
}
</style>
