<script setup lang="ts">
const {
  injectionKey = useModalKey,
  width = '600px',
  formId = 'create-edit-form',
  icon = 'far fa-pen-to-square',
  color = 'blue-4',
  isImport = false,
} = defineProps({
  injectionKey: [Symbol, String],
  width: String,
  formId: String,
  icon: String,
  color: String,
  isImport: Boolean,
});

const { show, isAdd, title, subtitle, loading, spinner, afterEnter, afterLeave, setModal } = inject(
  injectionKey,
) as ModalProps;

defineOptions({ inheritAttrs: false });

const { t } = useI18n();
</script>

<template>
  <q-dialog v-model="show" v-bind="$attrs" @show="afterEnter" @hide="afterLeave">
    <q-card style="max-width: 100vw" :style="{ width: width }" class="card-shadow">
      <q-card-section class="row items-center">
        <div class="text-h6 flex items-center">
          <Transition
            appear
            enter-active-class="animate__animated animate__fadeInUp animate__slower"
          >
            <q-icon v-if="show" :name="icon" :color class="q-mr-sm" />
          </Transition>

          <span>{{ title }}</span>

          <q-chip v-show="!isImport" :ripple="false" text-color="grey-8" class="bg-grey-3"
            >{{ subtitle }}
          </q-chip>

          <slot name="header" />
        </div>
        <q-space />
        <q-btn icon="close" flat round dense @click="setModal(false)" />
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 80vh" class="scroll">
        <slot name="content" v-bind="{ formId }" />
      </q-card-section>

      <q-separator />

      <q-card-actions align="center" class="q-py-md">
        <slot name="advanced" />

        <slot v-if="$slots.actions" name="actions" />

        <template v-else>
          <q-btn
            type="submit"
            :label="t('actions.enter', 0)"
            color="primary"
            :form="formId"
            :loading="spinner"
          />
          <q-btn outline label="取消" @click="setModal(false)" />
        </template>
      </q-card-actions>

      <q-inner-loading :showing="loading" color="grey-6" />
    </q-card>
  </q-dialog>
</template>
