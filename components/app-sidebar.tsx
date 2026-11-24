"use client"

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Plus, Workflow } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const dummyWorkflows = [
  "dominant-wasp",
  "honest-reindeer",
  "expected-llama",
  "essential-ocelot",
  "creepy-echidna",
  "eastern-silkworm",
  "cultural-lion",
  "proud-weasel",
  "regional-bonobo",
]

export function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex-row items-center justify-between group-data-[state=collapsed]:justify-center">
        <div className="flex-1 min-w-0 group-data-[state=collapsed]:hidden">
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
        <SidebarGroup>
          <SidebarGroupLabel>Workflows</SidebarGroupLabel>
          <SidebarGroupAction title="Add Workflow">
            <Plus /> <span className="sr-only">Add Workflow</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {dummyWorkflows.map((workflow, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    isActive={index === 0}
                    tooltip={workflow}
                  >
                    <a href="#">
                      <Workflow />
                      <span>{workflow}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserButton 
        appearance={{
          elements:{
            rootBox:"w-full",
            userButtonTrigger: "w-full justify-start  group-data-[collapsible=icon]:justify-center",
            userButtonOuterIdentifier:"group-data-[collapsible=icon]:hidden"
          }
        }}/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
