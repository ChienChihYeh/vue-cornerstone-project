export const createStudyFormData = (start?: number) => {
  const startIndex = start?.toString() || '0'
  const formData = new FormData()
  formData.set('draw', '1')
  formData.set('start', startIndex)
  formData.set('length', '10')
  formData.set('order[0][column]', '1')
  formData.set('order[0][dir]', 'desc')
  formData.set('search[value]', '')
  formData.set('minDate', '')
  formData.set('maxDate', '')
  formData.set('marked', '')
  formData.set('unmarked', '')
  return formData
}
