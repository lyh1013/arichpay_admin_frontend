<script setup lang="ts">
const { login } = useAuth();

const [loading, setLoading] = useCustomState(false);

definePageMeta({
  layout: 'full',
});

const isPwdVisible = ref(true);

const { handleSubmit } = useForm({
  validationSchema: { account: 'required', password: 'required' },
  initialValues: {
    account: 'ideaxpress',
    password: 'arich',
  },
});

function togglePwdVisibility() {
  isPwdVisible.value = !isPwdVisible.value;
}

const onSubmit = handleSubmit(async (data: { account: string; password: string }) => {
  setLoading(true);

  await login(data);

  setLoading(false);
});
</script>

<template>
  <q-page padding class="flex items-center justify-center">
    <q-form @submit="onSubmit">
      <q-card class="card-shadow q-pa-md" style="max-width: 400px; width: 400px">
        <q-card-section class="text-center">
          <q-img src="@images/logo/logo.png" alt="久裕帳戶管理系統" style="max-width: 250px" />
        </q-card-section>

        <q-card-section>
          <div class="row gap-2">
            <div class="col-12">
              <TextField label="帳號" name="account" prepend-icon="o_person" />
            </div>

            <div class="col-12">
              <TextField
                :type="isPwdVisible ? 'password' : 'text'"
                label="密碼"
                name="password"
                prepend-icon="o_lock"
                hide-bottom-space
              >
                <template #append>
                  <q-icon
                    :name="isPwdVisible ? 'o_visibility_off' : 'o_visibility'"
                    @click="togglePwdVisibility"
                  />
                </template>
              </TextField>
            </div>
          </div>
        </q-card-section>

        <q-card-actions class="q-px-md">
          <QBtn type="submit" color="primary" label="登入" class="w-100 block" :loading />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>
