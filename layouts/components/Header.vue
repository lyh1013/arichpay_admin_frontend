<script setup lang="ts">
import { menus } from '@configs/menu/index';

const route = useRoute();
const { user } = storeToRefs(useAuth());
// const { sideMenu } = storeToRefs(useMenu());
const { logout } = useAuth();
const { $q } = useNuxtApp();
const { t } = useI18n();

const drawer = ref($q.screen.gt.sm);

function toggleDrawer() {
  drawer.value = !drawer.value;
}

function isNavActive(children: Menu[], to: string | undefined): boolean {
  if (to && to === route.path) return true;

  if (children && children.length > 0) {
    return children.some((child: Menu) => child.to === route.path);
  }

  return false;
}

watch(
  () => $q.screen.gt.sm,
  isGreaterThanMd => {
    drawer.value = isGreaterThanMd;
  },
);
</script>

<template>
  <div>
    <q-header class="bg-primary">
      <q-toolbar style="height: 60px">
        <q-btn
          flat
          round
          dense
          :icon="$q.screen.gt.sm ? 'swap_horizon' : 'menu'"
          @click="toggleDrawer"
        />
        <q-toolbar-title>{{ t('sitename') }}</q-toolbar-title>

        <q-btn flat icon="account_circle">
          <div class="flex column items-start q-ml-sm">
            <p class="q-mb-none">{{ user.account }}</p>
          </div>

          <q-menu class="card-shadow profile-menu">
            <q-list style="min-width: 150px">
              <q-item clickable @click="logout">
                <q-item-section>登出</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      :width="230"
      :breakpoint="$q.screen.sizes.md"
      bordered
      class="menu-list text-subtitle1"
    >
      <q-scroll-area class="fit q-pa-lg">
        <div class="flex justify-center q-pa-lg q-my-lg">
          <q-img src="@images/logo/logo.png" :alt="t('sitename')" style="max-width: 150px" />
        </div>

        <q-list>
          <template v-for="{ to, label, icon, children } in menus" :key="label">
            <q-item
              v-if="!children"
              clickable
              :active="to === route.path"
              :to
              active-class="menu-active"
              class="rounded-borders"
            >
              <q-item-section avatar>
                <q-icon :name="icon" />
              </q-item-section>

              <q-item-section>{{ label }}</q-item-section>
            </q-item>

            <q-expansion-item
              v-if="children"
              :label
              :icon
              :default-opened="isNavActive(children, to)"
              :header-class="isNavActive(children, to) ? 'menu-active rounded-borders' : ''"
            >
              <q-list>
                <template v-for="child in children" :key="child.label">
                  <q-item clickable :to="child.to" active-class="text-secondary">
                    <q-item-section class="text-center">{{ child.label }}</q-item-section>
                  </q-item>
                </template>
              </q-list>
            </q-expansion-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<style scoped>
.menu-active {
  border: 1px solid var(--q-primary);
  color: var(--q-primary);
}

:deep(.menu-active.q-item) {
  border: 1px solid var(--q-primary);
}

:global(.q-menu.profile-menu) {
  top: 60px !important;
}
</style>
