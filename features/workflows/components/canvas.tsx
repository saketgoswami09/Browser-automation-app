"use client"

import { useCallback, useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  ConnectionLineType,
  type ColorMode,
  type Connection,
  type Edge,
  type Node,
  type NodeProps,
  type NodeTypes,
  Handle,
  Position,
} from "@xyflow/react"
import { Database, Sparkles, Zap, type LucideIcon } from "lucide-react"

import "@xyflow/react/dist/style.css"
import { StepNode } from "./step-node"
import { type StepNodeType } from "@/features/workflows/nodes/node-registry"

// Defined outside the component so React Flow doesn't re-register on every render
const nodeTypes: NodeTypes = { step: StepNode }

const initialNodes: StepNodeType[] = [
  {
    id: "start",
    type: "step",
    position: { x: 0, y: 0 },
    data: { type: "start", kind: "trigger", title: "Start", values: {} },
  },
  {
    id: "open-url",
    type: "step",
    position: { x: 340, y: 0 },
    data: { type: "open-url", kind: "action", title: "Open URL", values: { url: "https://youtube.com" } },
  },
]

const initialEdges: Edge[] = [{ id: "e1-2", source: "start", target: "open-url" }]

const emptySubscribe = () => () => {}

// False during server render and hydration, true after mount. Keeps the
// server and initial client render identical to avoid a hydration mismatch.
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

export function Canvas() {
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const colorMode: ColorMode = mounted
    ? (resolvedTheme as ColorMode) ?? "light"
    : "light"
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  )

  return (
    <div className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        forceColorMode={colorMode}
        fitView
        fitViewOptions={{ padding: 0.4 }}
        proOptions={{ hideAttribution: true }}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{ stroke: "var(--primary)", strokeWidth: 2 }}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: true,
          style: { stroke: "var(--primary)", strokeWidth: 2 },
        }}
        style={
          {
            "--xy-background-color": "var(--background)",
            "--xy-edge-stroke-width": 2,
            "--xy-connectionline-stroke-width": 2,
          } as React.CSSProperties
        }
        maxZoom={1}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1.5}
          color="var(--border)"
        />
        <Controls
          showInteractive={false}
          className="!overflow-hidden !rounded-lg !border !border-border !shadow-sm [&_button]:!size-8 [&_button]:!border-border [&_button]:!bg-card [&_button]:!text-foreground [&_button:hover]:!bg-muted [&_svg]:!fill-current"
        />
        <MiniMap
          pannable
          zoomable
          nodeColor="var(--primary)"
          nodeBorderRadius={6}
          maskColor="transparent"
          className="!overflow-hidden !rounded-lg !border !border-border !bg-card !shadow-sm"
        />
      </ReactFlow>
    </div>
  )
}
