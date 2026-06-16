import { SidebarTrigger } from "@/components/ui/sidebar";
import { TenantSwitcher } from "./tenant-switcher";
import { Bell, Search } from "lucide-react";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      <div className="h-5 w-px bg-border" />
      <TenantSwitcher />
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search GL, vendor, contract…"
            className="h-8 w-64 rounded-md border border-border bg-muted/40 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground">
          <Bell className="h-3.5 w-3.5" />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-xs font-semibold text-primary-foreground">
          AK
        </div>
      </div>
    </header>
  );
}