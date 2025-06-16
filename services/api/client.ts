import httpRequest from '@/services/index';

class ClientService {
  getTable() {
    return httpRequest.get('clients');
  }
}

export default new ClientService();
