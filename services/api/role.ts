import authHttpRequest from '@/services/auth'

class RoleService {
  getTable() {
    return authHttpRequest.get('Role')
  }

  get(id: string) {
    return authHttpRequest.get(`Role/${id}`)
  }

  getRoleMenu(id: string) {
    return authHttpRequest.get(`Role/${id}/RoleMenu`)
  }

  getRolePermission(id: string) {
    return authHttpRequest.get(`Role/${id}/RoleMenuPermission`)
  }

  createPermission(data: any) {
    return authHttpRequest.post('RoleMenu', data)
  }

  setPermission(data: any) {
    return authHttpRequest.put('RoleMenuPermission', data)
  }

  create(data: any) {
    return authHttpRequest.post('Role', data)
  }

  set(data: any) {
    return authHttpRequest.put('Role', data)
  }

  remove(data: any) {
    return authHttpRequest.delete('Role', data)
  }
}

export default new RoleService()
