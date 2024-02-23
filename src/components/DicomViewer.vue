<script setup lang="ts">
import { ref, onMounted, watchEffect, onUnmounted } from 'vue'
import * as cornerstone from '@cornerstonejs/core'
import type { Types } from '@cornerstonejs/core'
import type { IStackViewport } from '@cornerstonejs/core/dist/types/types'
import { useToolGroup } from '@/hooks/toolGroup'
import { useEventListener } from '@/hooks/event'
import { resetCamera, checkZoom, handleViewerWheel } from '@/utils/viewerHelpers'

const props = defineProps<{
  imageIds: string[]
}>()

const { RenderingEngine, Enums } = cornerstone
const { ViewportType } = Enums
const { initToolGroup, destroyToolGroup } = useToolGroup()

const el = ref()
const slice = ref(0)
const viewport = ref<Types.IStackViewport>()
const renderingEngineId = 'axialRenderingEngine'
const viewportId = 'CT_AXIAL_STACK'
const toolGroupId = 'aixalToolGroup'

watchEffect(() => {
  if (props.imageIds.length > 0 && viewport.value) {
    viewport.value.setStack(props.imageIds, 0)
    viewport.value.render()
  }
})

function enableViewer() {
  //https://www.cornerstonejs.org/docs/tutorials/basic-stack
  const renderingEngine = new RenderingEngine(renderingEngineId)

  // https://www.cornerstonejs.org/docs/concepts/cornerstone-core/viewports/
  // https://www.cornerstonejs.org/live-examples/stackposition
  renderingEngine.enableElement({
    viewportId,
    element: el.value,
    type: ViewportType.STACK,
    defaultOptions: { displayArea: { imageArea: [1, 1] } }
  })
  viewport.value = renderingEngine.getViewport(viewportId) as IStackViewport
  initToolGroup(toolGroupId, viewportId, renderingEngineId)
}

useEventListener(window, 'mouseup', () => {
  checkZoom(viewport.value)
})

function setSlice(index: number) {
  slice.value = index
}

onMounted(() => {
  enableViewer()
})
onUnmounted(() => {
  destroyToolGroup(toolGroupId)
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
