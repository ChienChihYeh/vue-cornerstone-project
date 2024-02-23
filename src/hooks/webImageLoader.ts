import * as cornerstone from '@cornerstonejs/core'
import { useAuth } from './auth'
import { createImage, arrayBufferToImage } from '@/utils/registerWebImageLoader'

export function useWebImageLoader() {
  const { token, logoutUser } = useAuth()

  const options = {
    // callback allowing customization of the xhr (e.g. adding custom auth headers, cors, etc)
    beforeSend: (xhr: XMLHttpRequest) => {
      // xhr
      //   const token = localStorage.getItem('token')
      xhr.setRequestHeader('Authorization', `Bearer ${token}`)
    }
  }

  function loadImage(uri: string, imageId: string) {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', uri, true)
    xhr.responseType = 'arraybuffer'
    options.beforeSend(xhr)

    xhr.onprogress = function (oProgress) {
      if (oProgress.lengthComputable) {
        // evt.loaded the bytes browser receive
        // evt.total the total bytes set by the header
        const loaded = oProgress.loaded
        const total = oProgress.total
        const percentComplete = Math.round((loaded / total) * 100)

        const eventDetail = {
          imageId,
          loaded,
          total,
          percentComplete
        }

        cornerstone.triggerEvent(
          cornerstone.eventTarget,
          'cornerstoneimageloadprogress',
          eventDetail
        )
      }
    }

    const promise = new Promise((resolve, reject) => {
      xhr.onload = function () {
        const imagePromise = arrayBufferToImage(this.response)

        imagePromise
          .then((image) => {
            const imageObject = createImage(image as HTMLImageElement, imageId)

            resolve(imageObject)
          }, reject)
          .catch((error) => {
            console.error(error)
          })
      }
      xhr.onerror = function (error) {
        reject(error)
      }
      xhr.send()
    })

    const cancelFn = () => {
      xhr.abort()
    }

    return {
      promise,
      cancelFn
    }
  }

  function _loadImageIntoBuffer(
    imageId: string,
    options?: Record<string, any>
  ): { promise: Promise<Record<string, any>> } {
    const promise = new Promise<Record<string, any>>((resolve, reject) => {
      // get the pixel data from the server
      loadImage(imageId, imageId)
        .promise.then(
          (image) => {
            if (
              !options ||
              !options.targetBuffer ||
              !options.targetBuffer.length ||
              !options.targetBuffer.offset
            ) {
              resolve(image as PromiseLike<Record<string, any>>)
              return
            }
          },
          (error) => {
            reject(error)
          }
        )
        .catch((error) => {
          logoutUser()
          reject(error)
        })
    })
    return {
      promise
    }
  }

  function registerWebImageLoader(imageLoader: typeof cornerstone.imageLoader): void {
    imageLoader.registerImageLoader('http', _loadImageIntoBuffer)
  }

  return {
    registerWebImageLoader
  }
}
