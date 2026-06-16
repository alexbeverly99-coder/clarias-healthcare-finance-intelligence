import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  GitBranch,
  Target,
  Store,
  CalendarClock,
  Building2,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const navItems = [
  { to: "/", label: "Reconciliation", icon: Activity },
  { to: "/causal", label: "Causal Analysis", icon: GitBranch },
  { to: "/alignment", label: "Budget Alignment", icon: Target },
  { to: "/vendors", label: "Vendor & Market", icon: Store },
  { to: "/forecasting", label: "Forecasting", icon: CalendarClock },
  { to: "/departments", label: "Department View", icon: Building2 },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[image:var(--gradient-primary)] text-primary-foreground shadow">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold tracking-tight">Clarias</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Financial Intelligence
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Intelligence Engines</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active = pathname === item.to;
                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
                      <Link to={item.to} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-3 py-2 text-[10px] text-muted-foreground group-data-[collapsible=icon]:hidden">
          v0.1 · Mock data
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}