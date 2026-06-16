import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/clarias/page-header";
import { useTenant } from "@/lib/tenant-context";
import { alignmentByTenant, formatCurrency, formatPct } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/alignment")({
  head: () => ({
    meta: [
      { title: "Budget & Intent Alignment · Clarias" },
      {
        name: "description",
        content:
          "See whether spend matches budget and whether the underlying vendor mix is healthy, even when totals look on-budget.",
      },
    ],
  }),
  component: AlignmentPage,
});

function AlignmentPage() {
  const { tenantId } = useTenant();
  const rows = alignmentByTenant[tenantId];

  return (
    <div>
      <PageHeader
        eyebrow="Engine 03"
        title="Budget & Intent Alignment"
        description="Totals can land on budget while vendor mix drifts off plan. This view scores spend against intent."
      />

      <div className="space-y-3">
        {rows.map((r) => {
          const variancePct = ((r.actual - r.budget) / r.budget) * 100;
          const mixHealth =
            r.preferredShare - r.offContractShare > 0.6
              ? "healthy"
              : r.preferredShare - r.offContractShare > 0.4
                ? "drift"
                : "misaligned";
          return (
            <div
              key={r.category}
              className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{r.category}</div>
                  <div className="text-xs text-muted-foreground">
                    {formatCurrency(r.actual)} actual vs {formatCurrency(r.budget)} budget
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span
                    className={cn(
                      "rounded px-1.5 py-0.5 font-medium",
                      Math.abs(variancePct) < 3
                        ? "bg-success/15 text-success"
                        : variancePct > 0
                          ? "bg-destructive/15 text-destructive"
                          : "bg-warning/15 text-warning",
                    )}
                  >
                    {formatPct(variancePct)} total
                  </span>
                  <span
                    className={cn(
                      "rounded px-1.5 py-0.5 font-medium capitalize",
                      mixHealth === "healthy"
                        ? "bg-success/15 text-success"
                        : mixHealth === "drift"
                          ? "bg-warning/15 text-warning"
                          : "bg-destructive/15 text-destructive",
                    )}
                  >
                    Mix · {mixHealth}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="bg-success"
                    style={{ width: `${r.preferredShare * 100}%` }}
                  />
                  <div
                    className="bg-warning"
                    style={{
                      width: `${(1 - r.preferredShare - r.offContractShare) * 100}%`,
                    }}
                  />
                  <div
                    className="bg-destructive"
                    style={{ width: `${r.offContractShare * 100}%` }}
                  />
                </div>
                <div className="mt-2 flex flex-wrap gap-4 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-sm bg-success" />
                    Preferred {(r.preferredShare * 100).toFixed(0)}%
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-sm bg-warning" />
                    Approved{" "}
                    {((1 - r.preferredShare - r.offContractShare) * 100).toFixed(0)}%
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-sm bg-destructive" />
                    Off-contract {(r.offContractShare * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}