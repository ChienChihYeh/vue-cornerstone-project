<script setup lang="ts">
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'
import * as cornerstone from '@cornerstonejs/core'
import type { Types } from '@cornerstonejs/core'
import { useToolGroup } from '@/hooks/toolGroup'
import { useWebImageLoader } from '@/hooks/webImageLoader'
import { hardcodedMetaDataProvider } from '@/utils/hardcodedMetaDataProvider'
import { useEventListener } from '@/hooks/event'
import { resetCamera, checkZoom, handleViewerWheel } from '@/utils/viewerHelpers'

const props = defineProps<{
  imageIds: string[]
}>()

const renderingEngineId = import.meta.env.VITE_CORNERSTONE_RENDERINGENGINE
const viewportId = import.meta.env.VITE_CORNERSTONE_CORONAL_VIEWPORT
const toolGroupId = import.meta.env.VITE_CORNERSTONE_TOOLGROUP
const el = ref()
const slice = ref(0)
const viewport = ref<Types.IStackViewport>()
const { Enums, imageLoader, metaData } = cornerstone
const { ViewportType } = Enums
const { addViewport } = useToolGroup()
const { registerWebImageLoader } = useWebImageLoader()

registerWebImageLoader(imageLoader)

async function enableViewer() {
  //https://www.cornerstonejs.org/docs/tutorials/basic-stack
  const renderingEngine = cornerstone.getRenderingEngine(renderingEngineId)
  // https://www.cornerstonejs.org/docs/concepts/cornerstone-core/viewports/
  // https://www.cornerstonejs.org/live-examples/stackposition
  renderingEngine?.enableElement({
    viewportId,
    element: el.value,
    type: ViewportType.STACK,
    defaultOptions: { displayArea: { imageArea: [1, 1] } }
  })
  viewport.value = renderingEngine?.getViewport(viewportId) as Types.IStackViewport
  const imageIds = props.imageIds
  metaData.addProvider((type, imageId) => {
    // This hardcoded metadata provider, required for web image loader, is just a demo. Replace it with your own.
    const result = hardcodedMetaDataProvider(type, imageId, imageIds)
    return result
  }, 1000)
}

async function initRender() {
  if (!viewport.value) return
  const middleIndex = Math.floor(props.imageIds.length / 2)
  viewport.value.setStack(props.imageIds, middleIndex)
  viewport.value.render()
}

watchEffect(() => {
  if (props.imageIds.length > 0) {
    slice.value = Math.floor(props.imageIds.length / 2)
    initRender()
  }
})

useEventListener(window, 'mouseup', () => {
  checkZoom(viewport.value)
})

function setSlice(index: number) {
  slice.value = index
}

onMounted(() => {
  enableViewer()
  addViewport(viewportId, toolGroupId)
})
onUnmounted(() => {
  const renderingEngine = cornerstone.getRenderingEngine(renderingEngineId)
  renderingEngine?.disableElement(viewportId)
})
</script>
<template>
  <div class="viewer-container">
    <div class="toolbar">
      <span>Slice: {{ slice + 1 }} / {{ props.imageIds.length }}</span>
      <button @click="resetCamera(viewport)">Reset Viewport</button>
    </div>
    <div
      ref="el"
      class="viewer"
      @contextmenu="$event.preventDefault()"
      @wheel="(e) => handleViewerWheel(e, viewport, props.imageIds.length - 1, setSlice)"
    ></div>
  </div>
</template>
<style scoped>
span {
  margin-right: 8px;
}
</style>
