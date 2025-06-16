<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const { options = [], labelHidden = false } = defineProps<{
  options: {
    label: string;
    value: string;
  }[];
  labelHidden?: Boolean;
}>();

const attrs = useAttrs();

const id = ref(`text-field-${useId()}`);

const label = computed(() => attrs?.label as string | undefined);
const fieldName = computed(() => attrs?.name as string);

const { value, errorMessage: errorMessages } = useField<any>(
  () => fieldName.value ?? id.value,
  undefined,
  {
    label,
    syncVModel: true,
  },
);
</script>

<template>
  <label v-show="!labelHidden" :for="id">{{ label }}</label>
  <q-select
    v-bind="{
      ...$attrs,
      label: undefined,
    }"
    :id
    v-model="value"
    :error="errorMessages ? true : false"
    :error-message="errorMessages"
    :options
    option-value="value"
    option-label="label"
    emit-value
    map-options
    dense
    outlined
  />
</template>
