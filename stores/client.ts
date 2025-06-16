import ClientService from '@/services/api/client';

import { clientData } from '@/data/client';

export const useClient = defineStore('client', () => {
  async function getTable() {
    return clientData;
  }

  return {
    getTable,
  };
});
