import * as cornerstone from '@cornerstonejs/core'
import { volumeLoader } from '@cornerstonejs/core'
import * as cornerstoneTools from '@cornerstonejs/tools'
import dicomParser from 'dicom-parser'
import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader'
import {
  cornerstoneStreamingImageVolumeLoader,
  cornerstoneStreamingDynamicImageVolumeLoader
} from '@cornerstonejs/streaming-image-volume-loader'
import { onMounted } from 'vue'

export function useCornerstoneInit() {
  onMounted(() => {
    cornerstone.init()
    cornerstoneTools.init()
    cornerstoneDICOMImageLoader.external.cornerstone = cornerstone
    cornerstoneDICOMImageLoader.external.dicomParser = dicomParser
    volumeLoader.registerUnknownVolumeLoader(cornerstoneStreamingImageVolumeLoader)
    volumeLoader.registerVolumeLoader(
      'cornerstoneStreamingImageVolume',
      cornerstoneStreamingImageVolumeLoader
    )
    volumeLoader.registerVolumeLoader(
      'cornerstoneStreamingDynamicImageVolume',
      cornerstoneStreamingDynamicImageVolumeLoader
    )
    const { StackScrollMouseWheelTool, WindowLevelTool, ZoomTool } = cornerstoneTools
    cornerstoneTools.addTool(WindowLevelTool)
    cornerstoneTools.addTool(ZoomTool)
    cornerstoneTools.addTool(StackScrollMouseWheelTool)
  })
}
