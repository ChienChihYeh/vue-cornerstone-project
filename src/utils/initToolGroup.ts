import {
  // StackScrollMouseWheelTool,
  WindowLevelTool,
  ZoomTool,
  ToolGroupManager,
  Enums as csToolsEnums
} from '@cornerstonejs/tools'

export function initToolGroup(toolGroupId: string) {
  const toolGroup = ToolGroupManager.createToolGroup(toolGroupId)

  if (toolGroup) {
    // toolGroup.addTool(StackScrollMouseWheelTool.toolName)
    toolGroup.addTool(ZoomTool.toolName)
    toolGroup.addTool(WindowLevelTool.toolName)

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
