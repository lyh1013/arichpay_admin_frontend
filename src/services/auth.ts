import { axios, $authHttp } from '@/libs/axios'

class AuthService {
  async login(data: { account: string; password: string }) {
    const response = await axios.get(cfg.API_URL('sanctum/csrf-cookie'))

    if ([204].includes(response.status)) {
      return await $authHttp.post(cfg.API_URL('signin'), data)
    }
  }

  logout() {
    return axios.get(cfg.API_URL('signout')).then((response) => {
      if ([204].includes(response.status)) return true
    })
  }

  async forgot(data: { email: string }) {
    const response = await axios.get(cfg.API_URL('sanctum/csrf-cookie'))

    if ([204].includes(response.status)) {
      return $authHttp.post(cfg.API_URL('forgotten'), data)
    }
  }
}

export default new AuthService()
