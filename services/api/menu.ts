import authHttpRequest from '@/services/auth';

class MenuService {
  getMenu() {
    return authHttpRequest.get('Menu');
  }

  getSideMenu() {
    return authHttpRequest.get('Site/MenuDetail');
  }
}

export default new MenuService();
