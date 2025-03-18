<script setup lang="ts">
const attrs = useAttrs()

const id = ref(`text-field-${useId()}`)

const label = computed(() => attrs?.label as string | undefined)
const spinner = computed(() => attrs?.spinner as boolean)
const fieldName = computed(() => attrs?.name as string)
const hideLabel = computed(() => attrs?.hideLabel === '' || attrs?.hideLabel)

const { value, errorMessage: errorMessages } = useField(
  () => fieldName.value ?? id.value,
  undefined,
  {
    label
  }
)
</script>

<template>
  <v-label
    v-if="!hideLabel && label"
    :for="id"
    :class="[$slots?.labelright ? 'w-100 justify-space-between' : null]"
  >
    <template #default>
      {{ label }} <small v-if="isOptional" class="text-body-2 ms-1 me-auto">(選填)</small>

      <slot name="labelright" />
    </template>
  </v-label>

  <v-text-field
    v-model="value"
    :error-messages
    :disabled="spinner"
    density="compact"
    v-bind="{
      ...$attrs,
      label: undefined,
      id
    }"
  >
    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
    <template v-if="$slots['append-inner']" #append-inner>
      <slot name="append-inner" />
    </template>
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <template v-if="$slots['prepend-inner']" #prepend-inner>
      <slot name="prepend-inner" />
    </template>
  </v-text-field>
</template>

<style scoped>
:deep(.v-field__prepend-inner > .v-icon) {
  font-size: 20px;
}
</style>
