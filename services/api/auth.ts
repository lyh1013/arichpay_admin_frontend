import authHttpRequest from '@/services/auth'

class AuthService {
  login(data: any) {
    return authHttpRequest.post('Auth/Authentication', data)
  }

  authorization(data: any, token: string) {
    return authHttpRequest.post('Auth/Authorization', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  refresh(token: string | null) {
    return authHttpRequest.post(
      'Auth/TokenRefresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        skipTokenRefresh: true
      }
    )
  }
}

export default new AuthService()
