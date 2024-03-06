import { initToolGroup } from '@/utils/initToolGroup'
import * as cornerstoneTools from '@cornerstonejs/tools'

export function useToolGroup() {
  const { ToolGroupManager } = cornerstoneTools
  function destroyToolGroup(toolGroupId: string) {
    ToolGroupManager.destroyToolGroup(toolGroupId)
  }
  function addViewport(viewportId: string, toolGroupId: string) {
    const toolGroup = ToolGroupManager.getToolGroup(toolGroupId)
    toolGroup?.addViewport(viewportId)
  }

  return {
    initToolGroup,
    destroyToolGroup,
    addViewport
  }
}
