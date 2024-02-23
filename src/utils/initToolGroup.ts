import {
  // StackScrollMouseWheelTool,
  WindowLevelTool,
  ZoomTool,
  ToolGroupManager,
  Enums as csToolsEnums
} from '@cornerstonejs/tools'

export function initToolGroup(toolGroupId: string, viewportId: string, renderingEngineId: string) {
  const toolGroup = ToolGroupManager.createToolGroup(toolGroupId)

  if (toolGroup) {
    // toolGroup.addTool(StackScrollMouseWheelTool.toolName)
    toolGroup.addTool(ZoomTool.toolName)
    toolGroup.addTool(WindowLevelTool.toolName)
    toolGroup.addViewport(viewportId, renderingEngineId)

    // toolGroup?.setToolActive(StackScrollMouseWheelTool.toolName)
    toolGroup.setToolActive(WindowLevelTool.toolName, {
      bindings: [
        {
          mouseButton: csToolsEnums.MouseBindings.Primary // Left Click
        }
      ]
    })
    toolGroup.setToolActive(ZoomTool.toolName, {
      bindings: [
        {
          mouseButton: csToolsEnums.MouseBindings.Secondary // Right Click
        }
      ]
    })
  }
}
