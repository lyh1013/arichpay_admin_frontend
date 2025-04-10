<script setup lang="ts">
import { validationSchema } from '@/utils/form/validate-schema/profile'

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    account: 'ideaxpress',
    name: '艾創點工程師'
  }
})

const onSubmit = handleSubmit(async (values: Record<string, unknown>) => {
  console.log(values)
})
</script>

<template>
  <v-container class="py-6 py-md-8">
    <v-row>
      <v-col
        cols="12"
        sm="8"
        md="6"
        lg="5"
        offset-sm="2"
        offset-md="3"
        class="d-flex justify-center align-center mx-lg-auto"
      >
        <v-card class="pa-4">
          <v-card-text>
            <h4 class="form-title mb-2">基本資料</h4>

            <div class="mb-8">
              <!-- <v-alert ref="alert" /> -->
            </div>

            <v-form @submit="onSubmit">
              <v-row>
                <v-col cols="12">
                  <TextField
                    name="account"
                    prepend-inner-icon="mdi-account-outline"
                    label="帳號"
                    disabled
                  />
                </v-col>

                <v-col cols="12">
                  <TextField
                    name="name"
                    prepend-inner-icon="mdi-account-outline"
                    label="名稱"
                    disabled
                  />
                </v-col>

                <v-col cols="12">
                  <TextField
                    name="id_number"
                    prepend-inner-icon="mdi-card-text-outline"
                    label="統一編號"
                    disabled
                  />
                </v-col>

                <v-col cols="12">
                  <TextField name="tel" label="電話" prepend-inner-icon="mdi-phone-outline" />
                </v-col>

                <v-col cols="12">
                  <TextField name="email" label="E-mail" prepend-inner-icon="mdi-email-outline" />
                </v-col>

                <v-col cols="12">
                  <TextField
                    name="password"
                    type="password"
                    label="密碼"
                    prepend-inner-icon="mdi-lock-outline"
                  />
                </v-col>

                <v-col cols="12">
                  <TextField
                    name="password_confirmation"
                    type="password"
                    label="確認密碼"
                    prepend-inner-icon="mdi-lock-outline"
                    placeholder="請再輸入一次密碼"
                  />
                </v-col>

                <v-col cols="12" class="d-flex justify-center align-center ga-2 mt-2">
                  <v-btn type="submit" text="確認修改" variant="flat" />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
