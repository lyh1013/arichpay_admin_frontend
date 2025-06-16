<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const { prependIcon = '', labelHidden = false } = defineProps({
  prependIcon: String,
  labelHidden: Boolean,
});

const timeWithSeconds = defineModel<string>('time');
const dateRange = defineModel<{ from: string; to: string }>('dateRange');

const attrs = useAttrs();

const id = ref(`text-field-${useId()}`);
const timePopup = ref<InstanceType<typeof import('quasar').QPopupProxy> | null>(null);
const datePopup = ref<InstanceType<typeof import('quasar').QPopupProxy> | null>(null);

const label = computed(() => attrs?.label as string | undefined);
const fieldName = computed(() => attrs?.name as string);
const mask = computed(() => (attrs.timepicker ? 'fulltime' : ''));

const inputProps = computed(() => {
  const hasBorderless = 'borderless' in attrs;

  return {
    ...attrs,
    label: undefined,
    outlined: !hasBorderless,
  };
});

const { value, errorMessage: errorMessages } = useField<any>(
  () => fieldName.value ?? id.value,
  undefined,
  {
    label,
    syncVModel: true,
  },
);

watch([timeWithSeconds, dateRange], ([newTime, newDateRange]) => {
  if (newTime) value.value = newTime;
  if (newDateRange) value.value = `${newDateRange.from} - ${newDateRange.to}`;
});
</script>

<template>
  <label v-show="!labelHidden" :for="id">{{ label }}</label>
  <q-input
    :id
    v-model="value"
    :error="errorMessages ? true : false"
    :error-message="errorMessages"
    :mask
    dense
    lazy-rules
    hide-hint
    v-bind="inputProps"
  >
    <template v-if="prependIcon" #prepend>
      <q-icon :name="prependIcon" />
    </template>

    <template v-if="$attrs.timepicker || $attrs.datepicker || $slots.append" #append>
      <q-icon v-show="$attrs.timepicker" name="access_time" class="cursor-pointer">
        <q-popup-proxy ref="timePopup" cover transition-show="scale" transition-hide="scale">
          <q-time v-model="timeWithSeconds" with-seconds format24h>
            <div class="row items-center justify-end">
              <q-btn label="確認" color="primary" flat @click="timePopup?.hide()" />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>

      <q-icon v-show="$attrs.datepicker" name="event" class="cursor-pointer">
        <q-popup-proxy ref="datePopup" cover transition-show="scale" transition-hide="scale">
          <q-date v-model="dateRange" range>
            <div class="row items-center justify-end">
              <q-btn label="確認" color="primary" flat @click="datePopup?.hide()" />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>

      <slot name="append" />
    </template>
  </q-input>
</template>
