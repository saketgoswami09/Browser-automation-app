import { ResizablePanel } from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import { PlayIcon } from "lucide-react"

export function RightSidebar() {
  return (
    <ResizablePanel defaultSize="16rem" minSize="14rem" maxSize="36rem">
      <div className="flex size-full items-center justify-center p-4">
        <Button>
          <PlayIcon />
          Run
        </Button>
      </div>
    </ResizablePanel>
  )
}
