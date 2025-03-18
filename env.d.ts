/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_DEFAULT_LOCALE: string
  readonly VITE_LOCAL_STORAGE_COOKIE_KEY: string
  readonly VITE_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
