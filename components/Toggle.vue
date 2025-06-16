<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const attrs = useAttrs()

const id = ref(`text-field-${useId()}`)

const label = computed(() => attrs?.label as string | undefined)
const fieldName = computed(() => attrs?.name as string)

const { value } = useField<any>(() => fieldName.value ?? id.value, undefined, {
  initialValue: attrs.modelValue ?? 'Y',
  label,
  syncVModel: true
})
</script>

<template>
  <label :for="id">{{ label }}</label>
  <q-toggle
    v-bind="{
      ...$attrs,
      label: undefined
    }"
    :id
    v-model="value"
    false-value="N"
    true-value="Y"
    :color="value === 'Y' ? 'teal-14' : 'red-14'"
    keep-color
    checked-icon="check"
    unchecked-icon="clear"
  />
</template>
