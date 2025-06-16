import authHttpRequest from '@/services/auth';
import httpRequest from '@/services/index';

class UserService {
  getAllCompanyUser() {
    return authHttpRequest.get('/CompanyUser');
  }

  getAllDepartmentUser() {
    return authHttpRequest.get('/DepartmentUser');
  }

  getAllUserRole() {
    return authHttpRequest.get('/UserRole');
  }

  getTable() {
    return authHttpRequest.get('User');
  }

  get(id: string) {
    return authHttpRequest.get(`User/${id}`);
  }

  getUserStatusSetting() {
    return authHttpRequest.get('UserStatusSetting');
  }

  create(data: any) {
    return authHttpRequest.post('User', data);
  }

  createUserRole(data: any) {
    return authHttpRequest.post('UserRole', data);
  }

  createUserCompany(data: any) {
    return authHttpRequest.post('CompanyUser', data);
  }

  createUserDepartment(data: any) {
    return authHttpRequest.post('DepartmentUser', data);
  }

  set(data: any) {
    return authHttpRequest.put('User', data);
  }

  setPassword(id: string, data: Record<string, string>) {
    return authHttpRequest.put(`User/${id}/ChangePassword`, data);
  }

  setUserId(id: string, data: Record<string, string>) {
    return authHttpRequest.put(`User/${id}/ChangeUserID`, data);
  }

  setActive(data: any) {
    return authHttpRequest.put('User/Active', data);
  }

  remove(data: any) {
    return authHttpRequest.delete('User', data);
  }

  removeUserCompany(data: any) {
    return authHttpRequest.delete('CompanyUser', data);
  }

  removeUserDepartment(data: any) {
    return authHttpRequest.delete('DepartmentUser', data);
  }

  removeUserRole(data: any) {
    return authHttpRequest.delete('UserRole', data);
  }

  import(data: any) {
    return httpRequest.post('Import/User', data);
  }
}

export default new UserService();
