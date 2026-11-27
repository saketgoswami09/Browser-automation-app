import { Liveblocks } from "@liveblocks/node"

if (!process.env.LIVEBLOCKS_SECRET_KEY) {
  throw new Error("Missing LIVEBLOCKS_SECRET_KEY environment variable")
}

export const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY,
})
