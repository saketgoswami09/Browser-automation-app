"use client"

import { Plus, Workflow } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export const dummyWorkflows = [
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

export function WorkflowNav() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  if (isCollapsed) {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Popover>
                <PopoverTrigger asChild>
                  <SidebarMenuButton tooltip="Workflows">
                    <Workflow />
                  </SidebarMenuButton>
                </PopoverTrigger>
                <PopoverContent side="right" align="start" className="w-56 p-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between px-2 py-1.5 text-xs font-medium text-muted-foreground">
                      Workflows
                      <button type="button" aria-label="Add Workflow" className="hover:text-foreground">
                        <Plus className="size-3" />
                      </button>
                    </div>
                    {dummyWorkflows.map((workflow) => (
                      <Button
                        key={workflow}
                        asChild
                        variant="ghost"
                        className="justify-start font-normal"
                        size="sm"
                      >
                        <a href="#">{workflow}</a>
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workflows</SidebarGroupLabel>
      <SidebarGroupAction type="button" title="Add Workflow">
        <Plus /> <span className="sr-only">Add Workflow</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          {dummyWorkflows.map((workflow, index) => (
            <SidebarMenuItem key={workflow}>
              <SidebarMenuButton asChild isActive={index === 0}>
                <a href="#">
                  <span>{workflow}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
