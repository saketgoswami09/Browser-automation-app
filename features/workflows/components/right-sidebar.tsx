"use client"

import { ResizablePanel } from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import { PlayIcon } from "lucide-react"
import { runWorkflowAction } from "../actions"
import { useTransition } from "react"

interface RightSidebarProps {
  workflowId: string
}

export function RightSidebar({ workflowId }: RightSidebarProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <ResizablePanel defaultSize="16rem" minSize="14rem" maxSize="36rem">
      <div className="flex size-full items-center justify-center p-4">
        <Button
          onClick={() => startTransition(async () => {
            await runWorkflowAction(workflowId)
          })}
          disabled={isPending}
        >
          <PlayIcon />
          Run
        </Button>
      </div>
    </ResizablePanel>
  )
}
