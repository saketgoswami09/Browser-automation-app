import { ReactFlowProvider } from "@xyflow/react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { RightSidebar } from "./right-sidebar"
import { Canvas } from "./canvas"
import { Logs } from "./logs"

interface WorkflowShellProps {
  workflowId: string
}

export function WorkflowShell({ workflowId }: WorkflowShellProps) {
  return (
    <ReactFlowProvider>
      <ResizablePanelGroup orientation="horizontal" className="size-full" data-workflow-id={workflowId}>
        <ResizablePanel minSize="30rem">
          <ResizablePanelGroup orientation="vertical" className="size-full">
            <ResizablePanel minSize="18rem">
              <Canvas />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize="8rem" minSize="6rem">
              <Logs />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <RightSidebar workflowId={workflowId} />
      </ResizablePanelGroup>
    </ReactFlowProvider>
  )
}
