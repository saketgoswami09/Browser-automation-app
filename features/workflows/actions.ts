"use server"

import { auth } from "@clerk/nextjs/server"
import { tasks } from "@trigger.dev/sdk"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { liveblocks } from "@/lib/liveblocks"

import type { helloWorldTask } from "@/trigger/example"
import { createWorkflow, deleteWorkflow } from "@/features/workflows/data"

export async function createWorkflowAction(name: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  const workflow = await createWorkflow(orgId, name)

  // Create or get the room in Liveblocks
  await liveblocks.getOrCreateRoom(workflow.id, {
    organizationId: orgId,
    defaultAccesses: [],
    groupsAccesses: {
      [orgId]: ["room:write"],
    },
    metadata: {
      title: workflow.name,
    },
  })

  revalidatePath("/workflows", "layout")
  redirect(`/workflows/${workflow.id}`)
}
export async function deleteWorkflowAction(id: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  await deleteWorkflow(orgId, id)

  // Also delete the Liveblocks room
  try {
    await liveblocks.deleteRoom(id)
  } catch (error) {
    console.error("Failed to delete Liveblocks room:", error)
  }

  revalidatePath("/workflows", "layout")
  redirect("/")
}


export async function runWorkflowAction() {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", {
    message: "Hello from right-sidebar"
  })

  return { id: handle.id, publicAccessToken: handle.publicAccessToken }
}
