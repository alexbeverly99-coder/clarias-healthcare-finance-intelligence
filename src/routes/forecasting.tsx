import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/clarias/page-header";
import { useTenant } from "@/lib/tenant-context";
import { renewalsByTenant, formatCurrency } from "@/lib/real-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/forecasting")({
  head: () => ({
    meta: [
      { title: "Financial Forecasting · Clarias" },
      {
        name: "description",
        content: "Upcoming contract renewals with urgency indicators and forecasted financial impact.",
      },
    ],
  }),
  component: ForecastingPage,
});

const urgencyStyle = {
  high: "border-destructive/40 bg-destructive/5",
  medium: "border-warning/40 bg-warning/5",
  low: "border-border bg-card",
} as const;

const urgencyBadge = {
  high: "bg-destructive/15 text-destructive",
  medium: "bg-warning/15 text-warning",
  low: "bg-success/15 text-success",
} as const;

function ForecastingPage() {
  const { tenantId } = useTenant();
  const rows = renewalsByTenant[tenantId];

  return (
    <div>
      <PageHeader
        eyebrow="Engine 05"
        title="Financial Forecasting"
        description="Contract renewal pipeline with urgency, value-at-risk, and recommended action windows."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rows
          .slice()
          .sort((a, b) => a.daysToRenewal - b.daysToRenewal)
          .map((r) => (
            <div
              key={r.vendor}
              className={cn(
                "rounded-xl border p-5 shadow-[var(--shadow-card)]",
                urgencyStyle[r.urgency],
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {r.category}
                  </div>
                  <div className="mt-1 text-sm font-semibold">{r.vendor}</div>
                </div>
                <span
                  className={cn(
                    "rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                    urgencyBadge[r.urgency],
                  )}
                >
                  {r.urgency === "high" && <AlertTriangle className="mr-0.5 inline h-3 w-3" />}
                  {r.urgency}
                </span>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Annual contract value
                  </div>
                  <div className="text-xl font-semibold tabular-nums">
                    {formatCurrency(r.value)}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarClock className="h-3.5 w-3.5" />
                  {r.daysToRenewal}d
                </div>
              </div>

              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    "h-full",
                    r.urgency === "high"
                      ? "bg-destructive"
                      : r.urgency === "medium"
                        ? "bg-warning"
                        : "bg-success",
                  )}
                  style={{
                    width: `${Math.max(6, 100 - Math.min(120, r.daysToRenewal) / 1.2)}%`,
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}