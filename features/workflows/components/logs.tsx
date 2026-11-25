import { ResizablePanel } from "@/components/ui/resizable"

export function Logs() {
  return (
    <ResizablePanel defaultSize="8rem" minSize="6rem">
      <div className="flex size-full items-center justify-center text-muted-foreground">
        Logs
      </div>
    </ResizablePanel>
  )
}
