import * as cornerstone from '@cornerstonejs/core'
import * as cornerstoneTools from '@cornerstonejs/tools'
import dicomParser from 'dicom-parser'
import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader'
import { onMounted } from 'vue'

export function useCornerstoneInit() {
  onMounted(() => {
    cornerstone.init()
    cornerstoneTools.init()
    cornerstoneDICOMImageLoader.external.cornerstone = cornerstone
    cornerstoneDICOMImageLoader.external.dicomParser = dicomParser

    const { StackScrollMouseWheelTool, WindowLevelTool, ZoomTool } = cornerstoneTools
    cornerstoneTools.addTool(WindowLevelTool)
    cornerstoneTools.addTool(ZoomTool)
    cornerstoneTools.addTool(StackScrollMouseWheelTool)
  })
}
