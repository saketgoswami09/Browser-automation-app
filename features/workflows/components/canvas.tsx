import { ResizablePanel } from "@/components/ui/resizable"

export function Canvas() {
  return (
    <ResizablePanel minSize="18rem">
      <div className="flex size-full items-center justify-center text-muted-foreground">
        Canvas
      </div>
    </ResizablePanel>
  )
}
