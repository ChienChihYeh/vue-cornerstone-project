<script setup lang="ts">
import router from '@/router'
import { createStudyStatus } from '@/utils/createStudyStatus'

const { studyList } = defineProps<{
  studyList: string[][]
}>()

function viewStudy(study: string[]) {
  console.log(study[6], study[2], study[8])
  router.push('/lungrads/' + study[6] + '/' + study[2] + '/' + study[8])
}
</script>
<template>
  <table>
    <thead>
      <tr>
        <th>Patient ID</th>
        <th>Patient Name</th>
        <th>Study Date</th>
        <th>Accession No.</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(study, index) in studyList" :key="index" @click="viewStudy(study)">
        <td>{{ study[2] }}</td>
        <td>{{ study[3] }}</td>
        <td>{{ study[6] }}</td>
        <td>{{ study[8] }}</td>
        <td>{{ createStudyStatus(study[7]) }}</td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped lang="scss">
table {
  margin: auto;
  margin-bottom: 8px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-collapse: collapse;

  tr {
    cursor: pointer;
    &:hover td {
      background-color: #eee;
    }
  }

  th,
  td {
    width: 200px;
    border: 1px solid #ccc;
  }
}
</style>
