"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col p-6">
      <div className="flex w-full items-center justify-end gap-4 mb-8">
        <OrganizationSwitcher />
        <UserButton />
      </div>
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2" onClick={() => toast("Hello, this is a toast message!")}>Button</Button>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  )
}

