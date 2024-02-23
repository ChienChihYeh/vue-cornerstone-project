<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useAuth } from '@/hooks/auth'

const formData = ref({
  account: '',
  password: ''
})

const { loginUser } = useAuth()

function handleLogin() {
  const url = import.meta.env.VITE_FETCH_BASE_URL
  axios.post(url + 'api/login', formData.value).then((res) => {
    loginUser(res.data.token)
  })
}
</script>
<template>
  <div>
    <h2>Login</h2>
    <p>
      <label for="account">Account: </label>
      <input type="text" name="account" id="account" v-model="formData.account" />
    </p>
    <p>
      <label for="password">Password: </label>
      <input type="password" name="password" id="password" v-model="formData.password" />
    </p>
    <button @click="handleLogin()">Login</button>
  </div>
</template>
<style scoped lang="scss">
p,
button {
  margin-top: 8px;
}
</style>
