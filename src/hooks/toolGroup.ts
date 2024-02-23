import { initToolGroup } from '@/utils/initToolGroup'
import * as cornerstoneTools from '@cornerstonejs/tools'

export function useToolGroup() {
  const { ToolGroupManager } = cornerstoneTools
  function destroyToolGroup(toolGroupId: string) {
    ToolGroupManager.destroyToolGroup(toolGroupId)
  }

  return {
    initToolGroup,
    destroyToolGroup
  }
}
