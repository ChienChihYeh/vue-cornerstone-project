import type { IStackViewport } from '@cornerstonejs/core/dist/types/types'

export async function initViewportRender(imageIds: string[], viewport: IStackViewport) {
  if (imageIds.length > 0 && viewport) {
    await viewport.setStack(imageIds, 0)
    viewport.render()
  }
}

export function getImageData(viewport: IStackViewport) {
  return viewport.getImageDataMetadata(viewport.getCornerstoneImage())
}
