"use client"

import { Button } from "@/components/ui/button"
import { MousePointerSquareDashed } from "lucide-react"
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/empty"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col p-6">
      <Empty className=" flex-1">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MousePointerSquareDashed className="size-4" />
          </EmptyMedia>
          <EmptyTitle>No workflow selected</EmptyTitle>
          <EmptyDescription>
            Select a workflow from the list to view its details, or create a new one.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Create workflow</Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}

