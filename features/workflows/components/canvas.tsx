"use client"

import { useCallback, useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
  ConnectionLineType,
  type ColorMode,
  type Connection,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react"
import { Database, Sparkles, Zap, type LucideIcon } from "lucide-react"

import "@xyflow/react/dist/style.css"

type CardData = {
  label: string
  description?: string
  icon?: LucideIcon
}

type CardNodeType = Node<CardData, "card">

function CardNode({ data, selected }: NodeProps<CardNodeType>) {
  const Icon = data.icon ?? Sparkles

  return (
    <div
      className={[
        "w-60 rounded-xl border bg-card p-3.5 text-card-foreground shadow-sm transition-all duration-200",
        selected
          ? "border-primary shadow-md ring-4 ring-primary/10"
          : "border-border hover:border-primary/40 hover:shadow-md",
      ].join(" ")}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!size-2.5 !border-2 !border-card !bg-primary"
      />

      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
          <Icon className="size-4" strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{data.label}</p>
          {data.description && (
            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
              {data.description}
            </p>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!size-2.5 !border-2 !border-card !bg-primary"
      />
    </div>
  )
}

// Defined outside the component so React Flow doesn't re-register on every render
const nodeTypes = { card: CardNode }

const initialNodes: CardNodeType[] = [
  {
    id: "1",
    type: "card",
    position: { x: 0, y: 0 },
    data: { label: "Trigger", description: "Starts the workflow", icon: Zap },
  },
  {
    id: "2",
    type: "card",
    position: { x: 340, y: 0 },
    data: { label: "Process", description: "Transforms your data", icon: Database },
  },
]

const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }]

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
        colorMode={colorMode}
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