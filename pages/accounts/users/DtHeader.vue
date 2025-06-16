<script setup>
import UserService from '@/services/api/user';

import { userFields as exportHeaders } from '@/utils/form/export-fields';

const { exportData } = storeToRefs(useUser());

const searchProps = ['UserName', 'UserID', 'Email', 'CompanyName', 'DepartmentName'];

provide('service', UserService);
provide('store', useUser());
</script>

<template>
  <DataTableHeader
    :searchProps
    :actions="{ status: true, remove: false }"
    :exportHeaders
    :exportData
    exportName="使用者資料"
  />
</template>
