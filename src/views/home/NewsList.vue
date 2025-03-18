<script setup lang="ts">
import { newsData } from '@/fake-data/news'
</script>

<template>
  <v-table fixed-header class="pa-4 table">
    <thead>
      <tr>
        <th width="">發布日期</th>
        <th width="20%">訊息摘要</th>
        <th width="50%">訊息描述</th>
        <th width="">發布人</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in newsData" :key="item.id">
        <td>{{ item.date }}</td>
        <td>{{ item.short }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.publisher }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped>
.v-table.v-table--fixed-header > .v-table__wrapper > table > thead > tr > th {
  font-weight: 600;
  font-size: 1rem;
}

.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td {
  padding: 12px 16px;
}

.table {
  box-shadow: 0px 26px 45.4px 0px rgba(186, 193, 225, 0.72);
  border-radius: 24px;
  height: calc(100vh - 300px);
  max-width: 100%;
}

@media screen and (width < 560px) {
  .table {
    height: auto;
    white-space: nowrap;
  }
}
</style>
