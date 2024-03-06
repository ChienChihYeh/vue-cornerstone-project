import * as cornerstone from '@cornerstonejs/core'
import * as cornerstoneTools from '@cornerstonejs/tools'
import dicomParser from 'dicom-parser'
import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader'
import { onMounted } from 'vue'
import { useToolGroup } from './toolGroup'

const renderingEngineId = import.meta.env.VITE_CORNERSTONE_RENDERINGENGINE
const toolGroupId = import.meta.env.VITE_CORNERSTONE_TOOLGROUP
const axialViewportId = import.meta.env.VITE_CORNERSTONE_AXIAL_VIEWPORT
const coronalViewportId = import.meta.env.VITE_CORNERSTONE_CORONAL_VIEWPORT

export function useCornerstoneInit() {
  const { RenderingEngine } = cornerstone
  const { initToolGroup } = useToolGroup()

  async function initializeCornerstone() {
    await cornerstone.init()
    cornerstoneTools.init()
    cornerstoneDICOMImageLoader.external.cornerstone = cornerstone
    cornerstoneDICOMImageLoader.external.dicomParser = dicomParser
    const renderingEngine = new RenderingEngine(renderingEngineId)

    const { StackScrollMouseWheelTool, WindowLevelTool, ZoomTool } = cornerstoneTools
    cornerstoneTools.addTool(WindowLevelTool)
    cornerstoneTools.addTool(ZoomTool)
    cornerstoneTools.addTool(StackScrollMouseWheelTool)
    initToolGroup(toolGroupId, [axialViewportId, coronalViewportId], renderingEngineId)
  }

  onMounted(() => {
    initializeCornerstone()
  })
}
