<script setup lang="ts">
useHead({
  title: '個人資訊',
});

const { $q } = useNuxtApp();

const { handleSubmit, resetForm, defineField } = useForm({
  validationSchema: {},
});

const [dateRange] = defineField('approve_date_range');

onBeforeUnmount(() => resetForm());

const onSubmit = handleSubmit(values => {
  console.log('data', values);
});
</script>

<template>
  <q-page padding class="flex justify-center q-px-lg">
    <q-card class="card-shadow card-mtn" :class="[$q.screen.gt.sm ? 'w-75' : 'w-100']"> </q-card>
  </q-page>
</template>
