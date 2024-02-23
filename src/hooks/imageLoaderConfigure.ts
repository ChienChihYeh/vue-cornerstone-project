import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader'
import { useAuth } from './auth'
export function useImageLoaderConfigure() {
  const { token, logoutUser } = useAuth()
  cornerstoneDICOMImageLoader.configure({
    decodeConfig: {
      convertFloatPixelDataToInt: false
    },
    beforeSend: function (xhr: XMLHttpRequest) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    },
    errorInterceptor(error) {
      console.error(error)
      logoutUser()
    }
  })
}
