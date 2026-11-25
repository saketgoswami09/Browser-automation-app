import { error } from "console"
import { notFound } from "next/navigation"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
//  throw new Error("test")
  //  notFound()
  // Basic validation if needed
  if (!id) {
    notFound()
  }

  return (
    <div className="flex min-h-svh flex-col p-6">
      <h1 className="text-2xl font-bold">Workflow Details</h1>
      <p className="mt-2 text-muted-foreground">Workflow ID: {id}</p>
    </div>
  )
}
