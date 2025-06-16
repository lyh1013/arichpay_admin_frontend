<script setup lang="ts">
import DtHeader from './DtHeader.vue'
import DtTable from './DtTable.vue'
import CreateEditModal from './CreateEditModal.vue'

useHead({
  title: '角色權限'
})

provide(useModalKey, useModal())
provide(DtUtils.key, new DtUtils(useRole()))
</script>

<template>
  <q-page padding class="q-px-lg">
    <q-card class="card-shadow card-mtn">
      <q-card-section>
        <DtHeader />
        <DtTable />
      </q-card-section>
    </q-card>

    <CreateEditModal />
  </q-page>
</template>
