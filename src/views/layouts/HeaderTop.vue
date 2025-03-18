<script setup lang="ts">
import MenuList from './components/MenuList.vue'

import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()
const { y: windowY } = useWindowScroll()

// const { user } = storeToRefs(useAuth())
const { logout } = useAuth()

const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}
</script>

<template>
  <v-sheet class="d-print-none header" :class="{ 'header-sticky': windowY > 100 }">
    <v-container class="py-2">
      <v-toolbar density="compact" color="transparent" height="80">
        <v-app-bar-nav-icon class="d-block d-md-none" variant="text" @click.stop="toggleMenu" />

        <v-toolbar-title style="max-width: 120px">
          <router-link to="/">
            <v-img max-width="120" src="@images/logo/logo.png" cover />
          </router-link>
        </v-toolbar-title>

        <v-spacer />

        <v-list
          class="align-items mx-auto parent d-none d-md-flex py-0 bg-transparent"
          active-class="font-weight-bold text-primary "
        >
          <MenuList />
        </v-list>

        <v-spacer v-show="mdAndUp" />

        <div class="d-flex align-center ga-2">
          <span class="d-none d-md-block">艾創點工程師</span>
          <v-btn
            icon="mdi-account-outline"
            variant="tonal"
            to="/accounts/profile"
            size="small"
            rounded="xl"
          />
          <v-btn icon="mdi-logout" variant="tonal" size="small" rounded="xl" @click="logout" />
        </div>
      </v-toolbar>

      <v-navigation-drawer v-model="menuOpen" temporary>
        <v-card variant="flat" class="pa-4 h-screen" rounded="sm">
          <div class="d-flex align-center justify-between">
            <router-link to="/" class="w-100">
              <v-img max-width="120" src="@images/logo/logo.png" cover />
            </router-link>

            <v-icon icon="mdi-close" @click="toggleMenu" />
          </div>

          <v-list class="parent" active-class="font-weight-bold text-primary mt-5">
            <MenuList />
          </v-list>
        </v-card>
      </v-navigation-drawer>
    </v-container>
  </v-sheet>
</template>

<style scoped>
.header {
  z-index: 10;
  box-shadow: 0 1px 4px rgba(var(--v-shadow-key-umbra-color), 0.1);
  background: rgba(255, 255, 255);
}

.header-sticky {
  position: sticky;
  top: 0;
  left: 0;
}

:deep(.v-list-item--active:hover > .v-list-item__overlay),
:deep(.parent .v-list-item:hover > .v-list-item__overlay) {
  opacity: 0;
}

:deep(.v-list-item__prepend),
:deep(.v-list-item__append) {
  display: block;
}

.v-toolbar__content > .v-toolbar-title {
  margin-inline-start: 0;
}

:deep(.v-navigation-drawer__content) {
  overflow-y: unset;
  overflow-x: unset;
}

:deep(.v-navigation-drawer__scrim) {
  height: 100vh;
}
</style>
