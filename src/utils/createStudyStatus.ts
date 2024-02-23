export const createStudyStatus = (status: string) => {
  if (status.includes('OK')) return 'OK'
  if (status.includes('Completed')) return 'Completed'
  if (status.includes('Error')) return 'Error'
  if (status.includes('Processiing')) return 'Processing'
  if (status.includes('Saved')) return 'Saved'
  return status
}
