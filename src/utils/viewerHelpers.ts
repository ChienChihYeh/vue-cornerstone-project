import type { Types } from '@cornerstonejs/core'

export function resetCamera(viewport: Types.IStackViewport | undefined) {
  viewport?.resetCamera()
  viewport?.render()
}

export function checkZoom(viewport: Types.IStackViewport | undefined) {
  if (!viewport) return
  if (viewport?.getZoom() < 1) {
    resetCamera(viewport)
  }
}

export function handleViewerWheel(
  event: WheelEvent,
  viewport: Types.IStackViewport | undefined,
  maxIndex: number,
  setSlice: (index: number) => void
) {
  event.preventDefault()
  if (!viewport) return
  const index = viewport.getCurrentImageIdIndex()
  if (event.deltaY > 0 && index < maxIndex) {
    viewport.setImageIdIndex(index + 1)
    setSlice(index + 1)
  } else if (event.deltaY < 0 && index > 0) {
    viewport.setImageIdIndex(index - 1)
    setSlice(index - 1)
  }
}
