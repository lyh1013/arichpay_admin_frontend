import AuthService from '@/services/auth'
import { useStorage } from '@/composables/useStorage'

interface User {
  id: string
  name: string
  email: string
}

export const useAuth = defineStore('auth', () => {
  const user = ref<User | null>()
  const token = ref<string>('')
  const isLoggedIn = ref(false)

  const router = useRouter()

  async function login(data: { account: string; password: string }) {
    // const res = await AuthService.login(data)

    // if (!res) return

    // user.value = res.data

    const { setLocalStorage } = useStorage()

    setLocalStorage('isLoggedIn', true)

    router.push('/')
  }

  async function logout() {
    localStorage.removeItem(`${cfg.STORAGE_PREFIX}-isLoggedIn`)

    router.push('/')
  }

  return {
    user,
    isLoggedIn,

    login,
    logout
  }
})
