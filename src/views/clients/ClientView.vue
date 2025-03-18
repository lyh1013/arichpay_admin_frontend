<script setup lang="ts">
import { clientData as items } from '@/fake-data/client'

import { dateFormat } from '@/utils/formatters'
import { headers } from '@/utils/table/client'

import CreateEditModal from './CreateEditModal.vue'

const { setModal } = useModal()

const [loading, setLoading] = useState(false)

const dateRange = ref<(string | Date)[]>([])

const hideFooter = computed(() => items.length < 10)

watch(
  () => dateRange.value,
  newDateRange => {
    newDateRange.forEach(date => console.log(dateFormat(date)))
  }
)

provide(useModalKey, useModal())
</script>

<template>
  <v-container class="py-0">
    <DataTable :items :headers :filterKeys="['name', 'invoice_number']" :hideFooter :loading>
      <template v-slot:item.actions="{ item }">
        <div class="table-actions d-flex">
          <v-btn color="orange-lighten-2" variant="text" icon="mdi:mdi-login" />
          <v-btn
            color="blue-lighten-2"
            variant="text"
            icon="mdi:mdi-square-edit-outline"
            @click="setModal(item.id)"
          />
          <v-btn
            color="red-lighten-2"
            variant="text"
            icon="mdi:mdi-trash-can-outline"
            @click="setDeleteConfirm(item.id, item.name)"
          />
        </div>
      </template>
    </DataTable>
  </v-container>

  <CreateEditModal />
</template>

<style scoped></style>
