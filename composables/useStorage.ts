export function useStorage() {
  function getLocalStorage(key: any): string | null {
    return localStorage.getItem(key)
  }

  function setLocalStorage(key: string, value: unknown) {
    const stringified = typeof value === 'string' ? value : JSON.stringify(value)

    localStorage.setItem(key, stringified)
  }

  function removeLocalStorage(key: string) {
    return localStorage.removeItem(key)
  }

  return {
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage
  }
}
