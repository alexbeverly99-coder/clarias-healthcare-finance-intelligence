import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/clarias/page-header";
import { useTenant } from "@/lib/tenant-context";
import { vendorsByTenant, formatCurrency, formatPct } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/vendors")({
  head: () => ({
    meta: [
      { title: "Vendor & Market Intelligence · Clarias" },
      {
        name: "description",
        content:
          "Vendor-level spend, contract compliance, and pricing-tier tracking across tenants.",
      },
    ],
  }),
  component: VendorsPage,
});

const tierColor: Record<string, string> = {
  Preferred: "bg-success/15 text-success ring-1 ring-success/20",
  Approved: "bg-primary/15 text-primary ring-1 ring-primary/20",
  "Off-contract": "bg-destructive/15 text-destructive ring-1 ring-destructive/20",
};

function VendorsPage() {
  const { tenantId } = useTenant();
  const rows = vendorsByTenant[tenantId];
  const total = rows.reduce((s, r) => s + r.spend, 0);

  return (
    <div>
      <PageHeader
        eyebrow="Engine 04"
        title="Vendor & Market Intelligence"
        description="Spend, contract compliance, and pricing tier per vendor — with trend signals from market benchmarks."
      />

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
        <table className="w-full text-sm">
          <thead className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr className="border-b border-border">
              <th className="px-5 py-3 font-medium">Vendor</th>
              <th className="px-3 py-3 font-medium">Tier</th>
              <th className="px-3 py-3 text-right font-medium">Spend</th>
              <th className="px-3 py-3 text-right font-medium">% of Total</th>
              <th className="px-3 py-3 text-right font-medium">Contract Compliance</th>
              <th className="px-5 py-3 text-right font-medium">YoY Trend</th>
            </tr>
          </thead>
          <tbody>
            {rows
              .slice()
              .sort((a, b) => b.spend - a.spend)
              .map((v) => (
                <tr key={v.vendor} className="border-b border-border/60 last:border-0 hover:bg-muted/40">
                  <td className="px-5 py-3 font-medium">{v.vendor}</td>
                  <td className="px-3 py-3">
                    <span
                      className={cn(
                        "rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                        tierColor[v.tier],
                      )}
                    >
                      {v.tier}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums">{formatCurrency(v.spend)}</td>
                  <td className="px-3 py-3 text-right tabular-nums text-muted-foreground">
                    {((v.spend / total) * 100).toFixed(1)}%
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <div className="h-1.5 w-28 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn(
                            "h-full",
                            v.contractCompliance >= 0.85
                              ? "bg-success"
                              : v.contractCompliance >= 0.7
                                ? "bg-warning"
                                : "bg-destructive",
                          )}
                          style={{ width: `${v.contractCompliance * 100}%` }}
                        />
                      </div>
                      <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
                        {(v.contractCompliance * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td
                    className={cn(
                      "px-5 py-3 text-right tabular-nums font-medium",
                      v.trend > 5 ? "text-destructive" : v.trend < 0 ? "text-success" : "text-warning",
                    )}
                  >
                    {formatPct(v.trend)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}