<script setup lang="ts">
import DtHeader from './DtHeader.vue'
import DtTable from './DtTable.vue'
import CreateEditModal from './CreateEditModal.vue'

provide(useModalKey, useModal())
provide(DtUtils.key, new DtUtils(useClient()))
</script>

<template>
  <v-container fluid>
    <v-card>
      <DtHeader />

      <DtTable />
    </v-card>

    <CreateEditModal />
  </v-container>
</template>

<style scoped></style>
