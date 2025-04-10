<script setup lang="ts">
import type { MaybeRef } from '@vueuse/core'
import type { ModalProps } from '@/composables/useModal'
import type { Thresholds } from '@/utils//types'
import { useDisplay } from 'vuetify'

const { id, show, isAdd, isPreview, title, subtitle, afterEnter, afterLeave } = inject(
  useModalKey
) as ModalProps

const {
  modalId = '',
  size = 'md',
  scrollable = false,
  fullscreen = false,
  formId = 'create-edit-form',
  showCancel = true,
  isFullHeight = false
} = defineProps({
  modalId: String,
  scrollable: Boolean,
  fullscreen: Boolean,
  size: String,
  formId: String,
  showCancel: Boolean,
  isFullHeight: Boolean
})

defineOptions({ inheritAttrs: false })

const { thresholds } = useDisplay()
const attrs = useAttrs()

const [loading, setLoading] = useState(false)
const [spinner, setSpinner] = useState(false)
const [isYReachStart, setYReachStart] = useState(true)

const persistent = computed(() => (attrs?.persistent as boolean) ?? loading.value)
const maxWidth = computed(() => (fullscreen ? undefined : thresholds.value[size as Thresholds]))
const suppressScrollY = computed(() => !scrollable || (scrollable && loading.value))
const scrollYDisplayStyle = computed(() => (suppressScrollY.value ? 'none' : 'block'))

const scrollbarRef = useTemplateRef<MaybeRef>('scrollbar')
const { height: contentHeight } = useElementSize(scrollbarRef)

function setScrollTop(value: number) {
  scrollbarRef.value.ps.element.scrollTop = value
}

function onAfterLeave() {
  afterLeave()

  if (setLoading) setLoading(false)
  if (setSpinner) setSpinner(false)
}
</script>

<template>
  <v-dialog
    v-model="show"
    class="modal align-start"
    :maxWidth
    :persistent
    opacity="0.15"
    :retain-focus="false"
    @afterEnter="afterEnter"
    @afterLeave="onAfterLeave"
    v-bind="$attrs"
  >
    <template #default="{ isActive }">
      <v-card :title>
        <template #prepend>
          <Transition appear enter-active-class="animate__animated animate__fadeInUp">
            <v-icon
              color="blue-lighten-1"
              :icon="isPreview ? 'mdi:mdi-file-document-outline' : 'mdi:mdi-note-edit-outline'"
              class="d-print-none"
            />
          </Transition>
        </template>

        <template #append>
          <v-btn
            icon="$close"
            variant="text"
            color="grey-lighten-1"
            class="d-print-none"
            @click="isActive.value = false"
          />
        </template>

        <template v-slot:subtitle>
          <div class="d-flex align-center d-print-none">
            <v-chip :text="subtitle" variant="tonal" density="comfortable" />

            <slot v-if="$slots?.header" name="header" />
          </div>
        </template>

        <v-divider thickness="1" class="d-print-none" />

        <vscrollbar
          ref="scrollbar"
          :options="{ suppressScrollX: true, suppressScrollY }"
          @ps-y-reach-start="setYReachStart(true)"
          @ps-scroll-down="setYReachStart(false)"
        >
          <v-card-text class="position-relative py-4 pb-6" :class="{ 'h-screen': isFullHeight }">
            <slot name="content" v-bind="{ isYReachStart, contentHeight, setScrollTop }" />

            <Overlay :model-value="!isAdd && loading" />
          </v-card-text>
        </vscrollbar>

        <v-divider class="mb-3 d-print-none" />

        <v-card-actions class="d-print-none">
          <div class="d-flex flex-wrap justify-center mx-auto ga-2 py-1 w-100 position-relative">
            <slot v-if="$slots?.footer" name="footer" v-bind="{ isActive }" />

            <v-btn
              v-if="!$slots?.footer"
              type="submit"
              :loading="spinner"
              color="primary"
              :text="subtitle"
              variant="flat"
              :slim="false"
              :disabled="loading"
              :form="formId"
            />
            <v-btn
              v-if="showCancel"
              type="button"
              :text="$t('actions.close', 2)"
              variant="outlined"
              :slim="false"
              @click="isActive.value = false"
            />
          </div>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
:deep(.ps__rail-x) {
  display: none;
}

:deep(.ps__rail-y) {
  display: v-bind(scrollYDisplayStyle);
}

.modal :deep(.v-card-item__content) {
  display: flex;
  align-items: center;
  position: relative;
  overflow: unset;
}

.modal :deep(.v-card-item .v-card-title),
.modal :deep(.v-card-item .v-card-subtitle) {
  display: inline-block;
}

.modal :deep(.v-card-item .v-card-title) {
  margin-right: 0.5rem;
}

.modal :deep(.v-card-item .v-card-subtitle) {
  margin-bottom: -2px;
}

.modal .left-15 {
  left: 15px;
}

@page {
  size: A4;
  margin: 10px;
}
</style>
