import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { unheadVueComposablesImports } from '@unhead/vue'
import Unfonts from 'unplugin-fonts/vite'

// https://vitejs.dev/config/
export default defineConfig((): UserConfig => {
  // mode: development | staging | production
  const environment = 'development'

  return {
    base: ['production'].includes(environment) ? '/arichpay_admin_frontend' : '/',
    mode: environment,
    plugins: [
      vue({ template: { transformAssetUrls } }),
      basicSsl(),
      // vueDevTools(),
      vuetify({
        autoImport: { labs: true },
        styles: {
          configFile: 'src/assets/styles/settings.scss'
        }
      }),
      Unfonts({
        google: {
          preconnect: true,
          families: [
            {
              name: 'Open Sans',
              styles: 'wght@300;400;500;700'
            },
            {
              name: 'Public Sans',
              styles: 'wght@300;400;500;600;700'
            }
          ]
        }
      }),
      AutoImport({
        dts: './auto-imports.d.ts',
        eslintrc: {
          enabled: true
        },
        imports: [
          'vue',
          '@vueuse/core',
          'pinia',
          'vue-router',
          'vee-validate',
          unheadVueComposablesImports,
          {
            'vue-i18n': ['createI18n', 'useI18n'],
            '@appConfig': ['cfg'],
            '@i18n': ['i18n']
          }
        ],
        dirs: ['./src/stores', './src/composables'],
        vueTemplate: true
      }),
      Components({
        dts: true,
        dirs: ['./src/components']
      })
    ],
    build: {
      target: 'esnext',
      chunkSizeWarningLimit: 5000
    },
    esbuild: {
      supported: {
        'top-level-await': true
      }
    },
    optimizeDeps: {
      exclude: ['vuetify', 'crypto'],
      entries: ['./src/**/*.vue']
    },
    define: { 'process.env': {} },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
        '@appConfig': fileURLToPath(new URL('./app.config.ts', import.meta.url)),
        '@i18n': fileURLToPath(new URL('./src/libs/i18n/index.ts', import.meta.url))
      }
    },
    server: {
      cors: true,
      warmup: {
        clientFiles: ['./src/components/*.vue', './src/views/**/*.vue']
      },
      proxy: {}
    }
  }
})
