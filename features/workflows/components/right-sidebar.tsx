"use client"

import { useState, useTransition } from "react"
import { useRealtimeRun } from "@trigger.dev/react-hooks"
import { Loader2Icon, PlayIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ResizablePanel } from "@/components/ui/resizable"
import { runWorkflowAction } from "../actions"

type RunHandle = {
  id: string
  publicAccessToken: string
}

export function RightSidebar() {
  const [isPending, startTransition] = useTransition()
  const [handle, setHandle] = useState<RunHandle | null>(null)

  const onRun = () => {
    startTransition(async () => {
      const result = await runWorkflowAction()
      setHandle({ id: result.id, publicAccessToken: result.publicAccessToken })
    })
  }

  return (
    <ResizablePanel defaultSize="16rem" minSize="14rem" maxSize="36rem">
      <div className="flex size-full flex-col items-center justify-center gap-4 p-4">
        <Button onClick={onRun} disabled={isPending}>
          {isPending ? <Loader2Icon className="animate-spin" /> : <PlayIcon />}
          Run
        </Button>
        {handle ? <RunStatus handle={handle} /> : null}
      </div>
    </ResizablePanel>
  )
}

function RunStatus({ handle }: { handle: RunHandle }) {
  const { run, error } = useRealtimeRun(handle.id, {
    accessToken: handle.publicAccessToken,
  })

  if (error) {
    return (
      <p className="text-sm text-destructive">Error: {error.message}</p>
    )
  }

  if (!run) {
    return <p className="text-sm text-muted-foreground">Starting run&hellip;</p>
  }

  return (
    <div className="flex flex-col items-center gap-1 text-sm text-center">
      <p className="text-muted-foreground">
        Status: <span className="font-medium text-foreground">{run.status}</span>
      </p>
      {run.status === "COMPLETED" && run.output ? (
        <p className="text-muted-foreground">
          {(run.output as { message?: string }).message}
        </p>
      ) : null}
    </div>
  )
}
