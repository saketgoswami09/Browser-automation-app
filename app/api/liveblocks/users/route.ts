import { auth, clerkClient } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  try {
    const { userId, orgId } = await auth()

    if (!userId || !orgId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json().catch(() => null)

    if (!body || !Array.isArray(body.userIds)) {
      return new Response("Bad Request: userIds must be an array", { status: 400 })
    }

    const { userIds } = body as { userIds: string[] }

    if (userIds.length === 0) {
      return Response.json([])
    }

    const client = await clerkClient()

    const validUserIds = userIds.filter(
      (id): id is string => typeof id === "string" && id.trim().length > 0
    )
    const uniqueUserIds = Array.from(new Set(validUserIds))

    const userMap = new Map<string, { name: string; avatar: string }>()

    if (uniqueUserIds.length > 0) {
      const CHUNK_SIZE = 100
      const chunks: string[][] = []

      for (let i = 0; i < uniqueUserIds.length; i += CHUNK_SIZE) {
        chunks.push(uniqueUserIds.slice(i, i + CHUNK_SIZE))
      }

      const responses = await Promise.all(
        chunks.map((chunk) =>
          client.users.getUserList({
            userId: chunk,
            limit: chunk.length,
          })
        )
      )

      for (const response of responses) {
        for (const user of response.data) {
          const name =
            user.fullName ??
            user.username ??
            user.primaryEmailAddress?.emailAddress ??
            user.emailAddresses?.[0]?.emailAddress ??
            "Anonymous"
          const avatar = user.imageUrl

          userMap.set(user.id, {
            name,
            avatar,
          })
        }
      }
    }

    const result = userIds.map((id) => {
      if (typeof id !== "string") return null
      return userMap.get(id) ?? null
    })

    return Response.json(result)
  } catch (error) {
    console.error("Error in Liveblocks users endpoint:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
