interface AppConfig {
  API_URL(uri?: string): string
  TOKEN: string
  DEFAULT_LOCALE: string
  STORAGE_PREFIX: string
  STORAGE_COOKIE_KEY: string
}

let API_URL: string = import.meta.env.VITE_API_URL + '/api/v1/'

if (import.meta.env.MODE === 'development') {
  API_URL = `https://127.0.0.1:${import.meta.env.VITE_SERVER_PORT}/api/v1/`
}

export const cfg: AppConfig = {
  API_URL(uri?: string) {
    return uri ? API_URL + uri : API_URL
  },
  TOKEN: import.meta.env.VITE_TOKEN,
  DEFAULT_LOCALE: import.meta.env.VITE_DEFAULT_LOCALE,
  STORAGE_PREFIX: import.meta.env.VITE_STORAGE_PREFIX,
  STORAGE_COOKIE_KEY: import.meta.env.VITE_LOCAL_STORAGE_COOKIE_KEY,
}
