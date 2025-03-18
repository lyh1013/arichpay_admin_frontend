<script setup lang="ts">
import { useDisplay } from 'vuetify'

import type { DataTableHeader } from '@/utils/types'
import type { ModalProps } from '@/composables/useModal'

const sortBy = defineModel<{ key: string; order: 'asc' | 'desc' }[]>('sortBy')
const selected = defineModel('selected')

const { mdAndUp } = useDisplay()
const { setModal } = inject(useModalKey) as ModalProps

const search = ref('')

const {
  actions = {
    create: true,
    show: true,
    remove: true
  },
  headers = [],
  items = [],
  filterKeys = [],
  hideFooter = false,
  showSelect = false,
  loading = false
} = defineProps({
  actions: Object,
  headers: Array<DataTableHeader>,
  items: Array,
  filterKeys: Array<string>,
  hideFooter: Boolean,
  showSelect: Boolean,
  loading: Boolean
})
</script>

<template>
  <v-card class="pa-4">
    <v-card-text class="d-print-none px-0 px-md-4 py-0">
      <v-row class="align-center ma-0 ga-md-3" :no-gutters="mdAndUp">
        <v-col cols="12" sm="7" md="auto" class="order-1 me-auto">
          <v-btn v-if="actions.create" :text="$t('actions.create')" @click="setModal(true)" />
        </v-col>

        <v-col cols="12" md="3" class="order-3 order-md-2">
          <TextField v-model="search" prepend-inner-icon="mdi-magnify" />
        </v-col>

        <v-col v-if="$slots.header" cols="12" md="3" class="order-4 order-md-3">
          <slot name="header" />
        </v-col>

        <v-col
          v-if="$slots.actions"
          cols="12"
          sm="5"
          md="auto"
          class="order-2 order-md-4 d-flex justify-start justify-sm-end"
        >
          <slot name="actions" />
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text class="d-print-none pa-0 pa-md-4">
      <v-data-table
        v-model:sort-by="sortBy"
        v-model="selected"
        v-model:search="search"
        :filter-keys="filterKeys"
        :headers
        :items
        :hide-default-footer="hideFooter"
        fixed-header
        :show-select="showSelect"
        item-value="id"
        :loading
        return-object
        class="table"
      >
        <template v-for="(_, name) in $slots" #[name]="slotData">
          <slot :name="name" v-bind="slotData" />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<style scoped>
:deep(.v-data-table-footer) {
  padding: 16px 4px;
}

.table {
  max-height: calc(100vh - 235px);
  border-radius: 4px;
}

:deep(.v-table > .v-table__wrapper > table > tbody > tr > td),
:deep(.v-table > .v-table__wrapper > table > thead > tr > th) {
  white-space: nowrap;
}

:deep(.v-select__selection) {
  max-width: unset;
}

@media screen and (width < 560px) {
  .table {
    max-height: auto;
  }
}
</style>
