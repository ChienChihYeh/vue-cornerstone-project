<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import DicomViewer from '@/components/DicomViewer.vue'
import ImageViewer from '@/components/ImageViewer.vue'
import { useTokenStore } from '@/stores/token'
import type { LungRadsFetchParams } from '@/types/ViewerTypes'
import axios from 'axios'
import { createImageFormData } from '@/utils/createImageFormData'
import { useAuth } from '@/hooks/auth'
import { useImageLoaderConfigure } from '@/hooks/imageLoaderConfigure'

const url = import.meta.env.VITE_FETCH_BASE_URL
const axialImageIds = ref([])
const coronalImageIds = ref([])
function returnToStudyList() {
  router.go(-1)
}
const route = useRoute()
const { token } = useTokenStore()
const { logoutUser } = useAuth()
useImageLoaderConfigure()
console.log(route.params)

function imageApiPath(axis: 'axial' | 'coronal') {
  if (axis === 'coronal') {
    return import.meta.env.VITE_CORONAL_IMAGE_API_PATH
  }
  return import.meta.env.VITE_AXIAL_IMAGE_API_PATH
}

function getImageIds(axis: 'axial' | 'coronal', params: LungRadsFetchParams) {
  axios
    .post(url + imageApiPath(axis), createImageFormData(params), {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      if (axis === 'axial') axialImageIds.value = res.data.path
      if (axis === 'coronal') {
        res.data.path.sort((a: string, b: string) => {
          const regex = /coronal_output_(\d+)\.png/
          const aMatch = a.match(regex)
          const bMatch = b.match(regex)
          if (aMatch && bMatch) {
            const aNumber = parseInt(aMatch[1])
            const bNumber = parseInt(bMatch[1])
            return aNumber - bNumber
          }
          return 0
        })
      }
      coronalImageIds.value = res.data.path
    })
    .catch((error) => {
      if (error.response.status === 401) {
        logoutUser()
      }
    })
}
getImageIds('axial', route.params as LungRadsFetchParams)
getImageIds('coronal', route.params as LungRadsFetchParams)

function handleLogout() {
  axios
    .post(url + 'api/logs', { token: token }, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      console.log(res.data)
    })
  logoutUser()
}
</script>
<template>
  <div>
    <h2>LungRads</h2>
    <div class="viewers">
      <DicomViewer :image-ids="axialImageIds" />
      <ImageViewer :image-ids="coronalImageIds" />
    </div>
    <button @click="returnToStudyList()">Return</button>
    <button @click="handleLogout()">Logout</button>
  </div>
</template>
<style scoped lang="scss">
button {
  margin: 0 6px;
}
</style>
