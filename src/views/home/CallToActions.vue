<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()
const [loading, setLoading] = useState(false)

const { handleSubmit, resetForm } = useForm({
  validationSchema: { account: 'required', password: 'required' }
})

const onSubmit = handleSubmit((values: Record<string, string>) => {
  setLoading(true)

  console.log(values)
})
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-btn
        prepend-icon="mdi-text-box-search-outline"
        text="對帳單查詢"
        class="w-100 search-btn animate__animated animate__fadeInUp"
        variant="flat"
        to="/statement"
      />
    </v-col>

    <v-col cols="12">
      <v-btn
        prepend-icon="mdi-text-box-search-outline "
        text="折讓單查詢"
        class="w-100 search-btn animate__animated animate__fadeInUp"
        variant="flat"
        to="/credit-note"
        style="animation-delay: 0.5s"
      />
    </v-col>

    <v-col cols="12">
      <v-card
        class="pa-6 animate__animated animate__fadeInUp"
        prepend-icon="mdi-login"
        title="快速登入"
        :min-height="mdAndUp ? 'calc(100vh - 590px)' : 'auto'"
        style="animation-delay: 0.8s"
      >
        <v-form @submit.prevent="onSubmit" class="mt-4 d-flex flex-column ga-6">
          <TextField name="account" label="帳號" prepend-inner-icon="mdi-account-outline" />

          <TextField
            name="password"
            type="password"
            label="密碼"
            prepend-inner-icon="mdi-lock-outline"
          />

          <v-btn :loading size="large" type="submit" variant="tonal" block text="登入" />
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.search-btn {
  height: 10vh;
  min-height: 120px;
  font-size: 1.125rem;
  font-weight: 600;
  background: linear-gradient(80deg, #ac66d5 0%, #6692d5 100%);
  color: white;
}

:deep(.v-card-item) {
  justify-content: center;
  color: rgb(var(--v-theme-primary));
}

:deep(.v-card--variant-elevated) {
  box-shadow: 0px 26px 45.4px 0px rgba(186, 193, 225, 0.72);
}
</style>
