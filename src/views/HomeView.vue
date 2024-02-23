<script setup lang="ts">
import { ref } from 'vue'
import { useTokenStore } from '@/stores/token'
import axios from 'axios'
import { createStudyFormData } from '../utils/createStudyFormData'
import StudyTable from '@/components/StudyTable.vue'
import { useAuth } from '@/hooks/auth'

const { token } = useTokenStore()
const studyList = ref([])
const url = import.meta.env.VITE_FETCH_BASE_URL
const { logoutUser } = useAuth()

function handleLogout() {
  axios
    .post(url + 'api/logs', { token: token }, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      console.log(res.data)
    })
  logoutUser()
}

function getStudyList() {
  axios
    .post(url + 'mongoajax', createStudyFormData(), {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      console.log(res.data.data)
      studyList.value = res.data.data
    })
    .catch((error) => {
      console.log(error)
      logoutUser()
    })
}
getStudyList()
</script>

<template>
  <div>
    <h2>Study List</h2>
    <StudyTable :studyList="studyList" />
    <button @click="handleLogout()">Logout</button>
  </div>
</template>
