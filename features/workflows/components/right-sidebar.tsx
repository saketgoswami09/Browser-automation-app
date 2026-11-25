"use client"

import { ResizablePanel } from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import { PlayIcon } from "lucide-react"
import { runWorkflowAction } from "../actions"
import { useTransition } from "react"
import { toast } from "sonner"

interface RightSidebarProps {
  workflowId: string
}

export function RightSidebar({ workflowId }: RightSidebarProps) {
  const [isPending, startTransition] = useTransition()

  const handleRun = () => {
    startTransition(async () => {
      const promise = runWorkflowAction(workflowId)
      
      toast.promise(promise, {
        loading: "Starting workflow...",
        success: "Workflow started successfully!",
        error: "Failed to start workflow.",
      })
    })
  }

  return (
    <ResizablePanel defaultSize="16rem" minSize="14rem" maxSize="36rem">
      <div className="flex size-full items-center justify-center p-4">
        <Button
          onClick={handleRun}
          disabled={isPending}
        >
          <PlayIcon />
          Run
        </Button>
      </div>
    </ResizablePanel>
  )
}
