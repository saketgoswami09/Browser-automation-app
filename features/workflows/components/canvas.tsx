"use client"

import { ResizablePanel } from "@/components/ui/resizable"
import { ReactFlow, Background, Controls } from "@xyflow/react"
import '@xyflow/react/dist/style.css'

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
]
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }]

export function Canvas() {
  return (
    <ResizablePanel minSize="18rem">
      <div className="size-full">
        <ReactFlow nodes={initialNodes} edges={initialEdges}>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </ResizablePanel>
  )
}
