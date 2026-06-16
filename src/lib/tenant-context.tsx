import { createContext, useContext, useState, type ReactNode } from "react";
import { tenants, type TenantId, type Tenant, getTenant } from "./mock-data";

interface TenantCtx {
  tenantId: TenantId;
  tenant: Tenant;
  setTenantId: (id: TenantId) => void;
  all: Tenant[];
}

const Ctx = createContext<TenantCtx | null>(null);

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenantId, setTenantId] = useState<TenantId>("cascade");
  return (
    <Ctx.Provider
      value={{ tenantId, tenant: getTenant(tenantId), setTenantId, all: tenants }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useTenant() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useTenant must be used inside TenantProvider");
  return v;
}