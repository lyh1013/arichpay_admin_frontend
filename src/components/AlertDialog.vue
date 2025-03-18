<script setup lang="ts">
import type { Thresholds } from '@/utils/types'

import { useDisplay } from 'vuetify'

const { thresholds } = useDisplay()

type Alertype = 'success' | 'info' | 'warning' | 'error'

enum animationMap {
  success = 'animate__animated animate__bounceIn animate__fast',
  info = 'animate__animated animate__zoomIn',
  warning = 'animate__animated animate__tada',
  error = 'animate__animated  animate__tada',
}

enum alertColor {
  success = 'success',
  info = 'indigo-lighten-2',
  warning = 'orange-lighten-2',
  error = 'red-lighten-2',
}

const {
  icon = '',
  type = 'success',
  size = 'sm',
} = defineProps<{
  icon: string
  type?: Alertype | string
  size?: string
}>()

const maxWidth = computed(() => thresholds.value[size as Thresholds])
const animationClass = computed(() => animationMap[type as Alertype])
const color = computed(() => alertColor[type as Alertype])
</script>

<template>
  <v-dialog :maxWidth opacity="0.15" class="mx-auto">
    <template #default="{ isActive }">
      <v-card class="text-center">
        <template #append>
          <v-btn
            icon="$close"
            variant="text"
            color="grey-lighten-1"
            @click="isActive.value = false"
          />
        </template>

        <v-card-item class="mt-n7">
          <Transition appear :enter-active-class="animationClass">
            <v-icon :color :icon size="70" class="mb-2" />
          </Transition>

          <v-card-title class="my-2 font-weight-bold">{{ $attrs.title }}</v-card-title>

          <v-card-text class="text-body-1">
            <slot />
          </v-card-text>
        </v-card-item>

        <v-card-actions v-if="$slots.action" class="pa-4">
          <div class="mx-auto">
            <slot name="action" />

            <v-btn
              class="mx-2"
              text="取消"
              variant="outlined"
              color="grey-600"
              @click="isActive.value = false"
            />
          </div>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.v-card-title {
  font-size: 1.25rem;
}

.v-dialog > .v-overlay__content > .v-card > .v-card-item {
  padding: inherit;
}
</style>
