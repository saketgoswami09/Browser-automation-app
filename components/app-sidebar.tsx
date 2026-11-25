
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { WorkflowNav } from "@/features/workflows/components/workflow-nav"
import { listWorkflows } from "@/features/workflows/data"
import { createWorkflowAction } from "@/features/workflows/actions"

export async function AppSidebar() {
  const { orgId } = await auth()
  const workflows = orgId ? await listWorkflows(orgId) : []

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex-row items-center justify-between group-data-[state=collapsed]:justify-center">
        <div className="flex-1 min-w-0 group-data-[state=collapsed]:hidden overflow-hidden shrink-0">
          <OrganizationSwitcher
            hidePersonal
            appearance={{
              elements: {
                rootBox: "w-full",
                organizationSwitcherTrigger: "w-full justify-between",
              },
            }}
          />
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <WorkflowNav workflows={workflows} onCreateWorkflow={createWorkflowAction} />
      </SidebarContent>
      <SidebarFooter>
        <UserButton
          appearance={{
            elements: {
              rootBox: "w-full",
              userButtonTrigger: "w-full justify-start group-data-[state=collapsed]:justify-center",
              userButtonOuterIdentifier: "group-data-[state=collapsed]:hidden",
            },
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
