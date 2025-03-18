export function useStorage() {
  function getLocalStorage(key: string) {
    return localStorage.getItem(`${cfg.STORAGE_PREFIX}-${key}`)
  }

  function setLocalStorage(key: string, value: unknown) {
    const stringified = typeof value === 'string' ? value : JSON.stringify(value)

    localStorage.setItem(`${cfg.STORAGE_PREFIX}-${key}`, stringified)
  }

  return {
    getLocalStorage,
    setLocalStorage,
  }
}
