<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useTokenStore } from './stores/token'
import router from './router'
import { useCornerstoneInit } from './hooks/cornerstoneInit'

const { setToken } = useTokenStore()

const localToken = localStorage.getItem('token')
if (localToken) {
  setToken(localToken)
}
if (!localToken) {
  router.push('/login')
}
useCornerstoneInit()
</script>
<template>
  <main>
    <RouterView />
  </main>
</template>
<style scoped lang="scss">
nav {
  background-color: black;
  padding: 8px 0;
  color: white;
  text-align: center;

  a {
    color: #ccc;
    margin: 0 30px;
    text-decoration: none;

    &:hover {
      color: white;
    }
  }
  .router-link-exact-active {
    color: #f0f0f0;
  }
}

main {
  padding-top: 120px;
  margin: auto;
  text-align: center;
}
</style>
