import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', () => {
  const token = ref('')
  function setToken(payload: string) {
    token.value = payload
  }
  function resetToken() {
    token.value = ''
  }
  return { token, setToken, resetToken }
})
