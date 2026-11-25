import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { RightSidebar } from "./right-sidebar"
import { Canvas } from "./canvas"

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
          <ResizablePanel defaultSize="8rem" minSize="6rem">
            <div className="flex size-full items-center justify-center text-muted-foreground">
              Logs
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <RightSidebar />
    </ResizablePanelGroup>
  )
}
