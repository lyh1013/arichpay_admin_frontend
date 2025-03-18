<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { useStorage } from '@/composables/useStorage'

const { thresholds } = useDisplay()
const { getLocalStorage, setLocalStorage } = useStorage()

const [isCookiePolicy, setCookiePolicy] = useState(false)

const maxWidth = computed(() => thresholds.value['sm'])

onMounted(() => cookieAllowCheck())

function cookieAllowCheck() {
  const cookieAllowed = getLocalStorage(cfg.STORAGE_COOKIE_KEY)

  if (!cookieAllowed) setCookiePolicy(true)
}

function setAllowCookie() {
  setLocalStorage(cfg.STORAGE_COOKIE_KEY, true)

  setCookiePolicy(false)
}
</script>

<template>
  <VSnackbar
    v-model="isCookiePolicy"
    transition="scroll-y-reverse-transition"
    :timeout="-1"
    :maxWidth
  >
    <div class="d-flex align-center mb-3 ga-2">
      <v-icon icon="mdi-cookie" size="x-large" />
      <h5 class="text-h5 font-weight-bold" v-t="'cookiePolicy'" />
    </div>
    <div>
      <p class="mb-2">
        <strong>{{ $t('cookieContent', 1) }}</strong>
      </p>
      <p class="mb-0">{{ $t('cookieContent', 2) }}</p>
    </div>

    <div class="d-flex justify-end">
      <v-btn color="primary" variant="flat" @click="setAllowCookie" v-t="'allowCookie'" rounded />
    </div>
  </VSnackbar>
</template>

<style scope></style>
