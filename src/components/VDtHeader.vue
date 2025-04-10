<script setup lang="ts">
import type { ModalProps } from '@/composables/useModal'

const { setModal } = (inject(useModalKey) as ModalProps) ?? {}

const {
  searchProps = [],
  actions = {
    create: true,
    batch: true,
    status: false,
    remove: true
  }
} = defineProps<{
  searchProps?: string[]
  actions?: {
    create?: Boolean
    batch?: Boolean
    status?: Boolean
    remove?: Boolean
  }
}>()

const { select, isSelected, isSelectBatch, selectVisible, searchEvent, actionBatch, removeBatch } =
  inject(DtUtils.key) as InstanceType<typeof DtUtils>

const { isDeleteConfirm, isDeleteSpinner, setDeleteSpinner, setDeleteConfirmState } =
  useDeleteConfirm()

const filterName = ref('')

async function onRemove() {
  setDeleteSpinner(true)

  await removeBatch()

  setDeleteConfirmState(false)
}
</script>

<template>
  <v-card-item class="pt-4 pb-3">
    <VRow>
      <VCol cols="auto" class="d-flex flex-wrap align-center justify-start ga-3">
        <VBtn v-if="actions.create" :text="$t('actions.create')" @click="setModal(true)" />

        <v-divider v-if="actions.create" vertical inset />

        <slot name="actions" />

        <v-divider v-if="$slots.actions" vertical inset />

        <VBtn
          v-if="actions.batch"
          :prepend-icon="!isSelectBatch ? 'fa:fa fa-list-check' : 'fa:fa fa-rectangle-xmark'"
          variant="outlined"
          :text="$t('actions.batch', +isSelectBatch)"
          @click="selectVisible"
        />

        <v-menu v-if="actions.batch">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" append-icon="fa:fa fa-caret-down" v-bind="props" variant="tonal">
              <span v-if="isSelected">{{ $t('actions.selected', { count: select.count }) }}</span>
              <span v-else>{{ $t('actions.batchApply') }}</span>
            </v-btn>
          </template>

          <v-list density="compact">
            <v-list-item
              v-if="actions.status"
              link
              :title="$t('actions.enable')"
              :disabled="!isSelected"
              @click="actionBatch('status', true)"
            />
            <v-list-item
              v-if="actions.status"
              link
              :title="$t('actions.disable')"
              :disabled="!isSelected"
              @click="actionBatch('status', false)"
            />
            <v-divider v-show="actions.status" />

            <v-list-item
              v-if="actions.remove"
              link
              class="text-red-lighten-2"
              :title="$t('actions.remove')"
              :disabled="!isSelected"
              @click="setDeleteConfirmState(true)"
            />
          </v-list>
        </v-menu>
      </VCol>

      <VCol cols="auto" class="d-flex flex-wrap align-center justify-start gap-y-2 gap-x-3 ms-auto">
        <vxe-input
          v-model="filterName"
          type="search"
          placeholder="搜尋..."
          clearable
          class="w-100"
          @change="searchEvent(filterName, searchProps)"
        />
      </VCol>
    </VRow>
  </v-card-item>

  <AlertDialog v-model="isDeleteConfirm" :title="$t('confirm.removeTitle')">
    <template #content>
      <i18n-t keypath="confirm.remove" tag="div" scope="global" class="text-center text-h6">
        <template #name>
          <v-chip>{{ deleteConfirmData.name }}</v-chip>
        </template>
      </i18n-t>
    </template>

    <template #action>
      <v-btn
        variant="flat"
        color="red-lighten-1"
        :text="$t('actions.remove')"
        :loading="isDeleteSpinner"
        @click="onRemove"
      />
    </template>
  </AlertDialog>
</template>

<style scoped></style>
