import type { LungRadsFetchParams } from '@/types/ViewerTypes'

export const createImageFormData = (params: LungRadsFetchParams) => {
  const formData = new FormData()
  formData.set('mode', 'LungRads')
  formData.set('StudyDate', params.studyDate)
  formData.set('PatientID', params.patientId)
  formData.set('AccessionNumber', params.accessionNumber)
  return formData
}
