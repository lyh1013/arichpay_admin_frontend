<script setup lang="ts">
type Alertype = 'success' | 'info' | 'warning' | 'error';

enum alertColor {
  success = 'green-5',
  info = 'blue-5',
  warning = 'orange-5',
  error = 'red-5',
}

enum alertIcon {
  success = 'check_circle',
  info = 'error',
  warning = 'warning',
  error = 'delete',
}

const {
  title = '',
  customIcon = undefined,
  width = '400px',
  type = 'error',
  isAlertSpinner = false,
} = defineProps({
  title: String,
  customIcon: String,
  width: String,
  type: String,
  isAlertSpinner: Boolean,
});

const isActive = defineModel<boolean>('active');

const emits = defineEmits(['callToAction']);

defineOptions({ inheritAttrs: false });

const { t } = useI18n();

const color = computed(() => alertColor[type as Alertype]);
const icon = computed(() => customIcon || alertIcon[type as Alertype]);
</script>

<template>
  <q-dialog v-model="isActive" v-bind="$attrs">
    <q-card style="max-width: 100vh" :style="{ width: width }" class="card-shadow">
      <q-card-section class="row items-center">
        <div class="text-h6 flex items-center" :class="`text-${color}`">
          <Transition
            appear
            enter-active-class="animate__animated animate__fadeInUp animate__slower"
          >
            <q-icon v-if="isActive" :name="icon" class="q-mr-sm" />
          </Transition>

          {{ title }}
        </div>

        <q-space />
        <q-btn icon="close" flat round dense @click="isActive = false" />
      </q-card-section>

      <q-card-section style="max-height: 80vh" class="scroll">
        <slot name="content" />
      </q-card-section>

      <q-card-actions align="center" class="q-py-md" style="border-top: 1px solid #eee">
        <slot v-if="$slots.actions" name="actions" />

        <template v-else>
          <q-btn
            type="button"
            :label="t('actions.enter', 0)"
            :class="`bg-${color}`"
            class="text-white"
            :loading="isAlertSpinner"
            @click="emits('callToAction')"
          />
          <q-btn outline label="取消" @click="isActive = false" />
        </template>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
