// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath, URL } from 'node:url';
import { transformAssetUrls } from '@quasar/vite-plugin';

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiAuthBaseUrl: '',
      apiUrl: '',
    },
  },
  modules: ['@pinia/nuxt', '@vee-validate/nuxt', '@vueuse/nuxt', '@nuxtjs/i18n'],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  veeValidate: {
    autoImports: true,
  },
  imports: {
    dirs: ['stores', 'composables', 'utils', 'plugins/vxe-table/functions'],
  },
  css: ['animate.css', '@assets/styles/main.css', '@assets/styles/custom.css'],
  vite: {
    vue: {
      template: { transformAssetUrls },
    },
  },
  vue: {
    propsDestructure: true,
  },
  app: {
    baseURL: '/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'zh-Hant-TW',
      },
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
    },
  },
  // router: {
  //   options: {
  //     hashMode: true,
  //   },
  // },
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
    '@assets': fileURLToPath(new URL('./assets', import.meta.url)),
    '@images': fileURLToPath(new URL('./assets/images', import.meta.url)),
    '@configs': fileURLToPath(new URL('./configs', import.meta.url)),
  },
  build: {
    transpile: ['quasar'],
  },
  ssr: false,
  compatibilityDate: '2025-06-13',
});
