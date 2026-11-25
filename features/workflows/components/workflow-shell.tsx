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
    <ResizablePanelGroup orientation="horizontal" className="size-full" data-workflow-id={workflowId}>
      <ResizablePanel minSize="30rem">
        <ResizablePanelGroup orientation="vertical">
          <Canvas />
          <ResizableHandle />
          <Logs />
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <RightSidebar />
    </ResizablePanelGroup>
  )
}
