<script setup lang="ts">
const [loading, setLoading] = useState(false)

const { handleSubmit } = useForm({
  validationSchema: { email: 'required|email' }
})

const onSubmit = handleSubmit((values: Record<string, string>) => {
  setLoading(true)

  console.log(values)
})
</script>

<template>
  <v-row>
    <v-col
      cols="12"
      lg="4"
      md="6"
      sm="8"
      offset-lg="4"
      offset-md="3"
      offset-sm="2"
      class="d-flex justify-center align-center"
    >
      <v-card class="pa-8">
        <v-row class="ga-2">
          <v-col cols="12" class="d-flex justify-center">
            <v-img max-width="200" src="@images/logo/logo.png" cover />
          </v-col>

          <v-alert variant="text">
            請輸入您的電子郵件帳號，我們會寄送重設密碼連結至您的信箱。
          </v-alert>

          <v-col cols="12">
            <v-form @submit.prevent="onSubmit" class="d-flex flex-column ga-6">
              <TextField name="email" label="E-mail" prepend-inner-icon="mdi-email-outline" />

              <v-btn :loading size="large" type="submit" variant="flat" block text="送出" />
            </v-form>

            <div class="text-center mt-3">
              <span v-text="'已經有帳戶？'" />
              <RouterLink class="text-blue ms-1" to="signin" v-text="'登入'" />
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>
