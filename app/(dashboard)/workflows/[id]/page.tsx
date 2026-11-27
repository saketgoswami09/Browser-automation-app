import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"

import { liveblocks } from "@/lib/liveblocks"
import { getWorkflow } from "@/features/workflows/data"
import { Room } from "@/features/workflows/components/room"
import { WorkflowShell } from "@/features/workflows/components/workflow-shell"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { orgId } = await auth()
  
  if (!orgId) {
    notFound()
  }

  const workflow = await getWorkflow(orgId, id)
  if (!workflow) {
    notFound()
  }

  // Ensure the room exists in Liveblocks with the current organization and write permissions.
  // If the room was previously created under "default" or another organization, recreate it.
  try {
    const existingRoom = await liveblocks.getRoom(id)
    if (existingRoom.organizationId !== orgId) {
      await liveblocks.deleteRoom(id)
      await liveblocks.createRoom(id, {
        organizationId: orgId,
        defaultAccesses: [],
        groupsAccesses: {
          [orgId]: ["room:write"],
        },
        metadata: {
          title: workflow.name,
        },
      })
    } else {
      await liveblocks.updateRoom(id, {
        groupsAccesses: {
          [orgId]: ["room:write"],
        },
        metadata: {
          title: workflow.name,
        },
      })
    }
  } catch {
    await liveblocks.createRoom(id, {
      organizationId: orgId,
      defaultAccesses: [],
      groupsAccesses: {
        [orgId]: ["room:write"],
      },
      metadata: {
        title: workflow.name,
      },
    })
  }

  return (
    <Room roomId={id}>
      <WorkflowShell workflowId={id} />
    </Room>
  )
}

