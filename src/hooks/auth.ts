import { useRouter } from 'vue-router'
import { useTokenStore } from '@/stores/token'
import axios from 'axios'

export function useAuth() {
  const router = useRouter()
  const { setToken, resetToken, token } = useTokenStore()
  const url = import.meta.env.VITE_FETCH_BASE_URL

  function logoutUser() {
    axios
      .post(url + 'api/logs', { token: token }, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data)
      })
    resetToken()
    localStorage.removeItem('token')
    router.push('/login')
  }

  function loginUser(token: string) {
    localStorage.setItem('token', token)
    setToken(token)
    router.push('/')
  }

  return {
    token,
    loginUser,
    logoutUser
  }
}
