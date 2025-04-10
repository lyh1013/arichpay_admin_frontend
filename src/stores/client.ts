import { clientData } from '@/fake-data/client'

export const useClient = defineStore('client', () => {
  function getTable() {
    return clientData
  }

  return {
    getTable
  }
})
