import { Check, ChevronsUpDown, Building } from "lucide-react";
import { useTenant } from "@/lib/tenant-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TenantSwitcher() {
  const { tenant, all, setTenantId, tenantId } = useTenant();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5 text-left transition hover:bg-muted">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-[image:var(--gradient-primary)] text-[10px] font-bold text-primary-foreground">
            {tenant.short}
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-semibold">{tenant.name}</span>
            <span className="text-[10px] text-muted-foreground">Tenant · GL/AP/Contracts/Budgets</span>
          </div>
          <ChevronsUpDown className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72">
        <DropdownMenuLabel className="flex items-center gap-2 text-xs text-muted-foreground">
          <Building className="h-3.5 w-3.5" /> Switch tenant
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {all.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setTenantId(t.id)}
            className="flex items-center gap-2"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded bg-muted text-[10px] font-bold">
              {t.short}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium">{t.name}</span>
              <span className="text-[10px] text-muted-foreground">
                ${(t.totalSpend / 1_000_000).toFixed(1)}M spend · {t.vendorCount} vendors
              </span>
            </div>
            {tenantId === t.id && <Check className="ml-auto h-3.5 w-3.5 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}