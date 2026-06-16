import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, Filter, ShieldCheck, Wallet, Activity } from "lucide-react";
import { PageHeader } from "@/components/clarias/page-header";
import { KpiCard } from "@/components/clarias/kpi-card";
import { useTenant } from "@/lib/tenant-context";
import {
  reconciliationByTenant,
  formatCurrency,
  formatPct,
  type ReconciliationLine,
} from "@/lib/real-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reconciliation Intelligence · Clarias" },
      {
        name: "description",
        content:
          "Budget vs actual vs predicted spend by GL line, with variance flagging across cost and profit centers.",
      },
      { property: "og:title", content: "Reconciliation Intelligence · Clarias" },
      {
        property: "og:description",
        content: "Budget vs actual vs predicted spend with variance flagging by GL line.",
      },
    ],
  }),
  component: ReconciliationPage,
});

const statusStyle: Record<ReconciliationLine["status"], string> = {
  ok: "bg-success/15 text-success ring-1 ring-success/20",
  warning: "bg-warning/15 text-warning ring-1 ring-warning/20",
  critical: "bg-destructive/15 text-destructive ring-1 ring-destructive/20",
};

function ReconciliationPage() {
  const { tenant, tenantId } = useTenant();
  const lines = reconciliationByTenant[tenantId];
  const [filter, setFilter] = useState<"all" | "flagged">("all");

  const filtered = useMemo(
    () => (filter === "flagged" ? lines.filter((l) => l.status !== "ok") : lines),
    [lines, filter],
  );

  const chartData = lines.map((l) => ({
    name: l.glAccount,
    Budget: l.budget,
    Actual: l.actual,
    Predicted: l.predicted,
    status: l.status,
  }));

  return (
    <div>
      <PageHeader
        eyebrow="Engine 01"
        title="Reconciliation Intelligence"
        description={`Budget vs actual vs predicted spend across ${tenant.name}'s GL lines. Variance is computed per Cost Center → Profit Center → GL Account.`}
        actions={
          <div className="inline-flex rounded-md border border-border bg-card p-0.5 text-xs">
            {(["all", "flagged"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-sm px-2.5 py-1 capitalize transition",
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {f === "all" ? "All lines" : "Flagged only"}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total Actual Spend"
          value={formatCurrency(tenant.totalSpend)}
          delta={tenant.variancePct}
          hint="vs budget"
          icon={<Wallet className="h-4 w-4" />}
          tone={tenant.variancePct > 0 ? "negative" : "positive"}
        />
        <KpiCard
          label="Budget"
          value={formatCurrency(tenant.budget)}
          hint="FY plan"
          icon={<ShieldCheck className="h-4 w-4" />}
        />
        <KpiCard
          label="Flagged GL Lines"
          value={String(tenant.flaggedLines)}
          hint="variance > 3%"
          icon={<AlertTriangle className="h-4 w-4" />}
          tone="warning"
        />
        <KpiCard
          label="Predicted EoY Variance"
          value={formatPct(tenant.variancePct + 0.8)}
          delta={tenant.variancePct + 0.8}
          hint="ML forecast"
          icon={<Activity className="h-4 w-4" />}
          tone={tenant.variancePct > 0 ? "negative" : "positive"}
        />
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Budget vs Actual vs Predicted</div>
            <div className="text-xs text-muted-foreground">By GL account</div>
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis
                stroke="var(--muted-foreground)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(v: number) => formatCurrency(v)}
              />
              <Bar dataKey="Budget" fill="var(--chart-1)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Actual" fill="var(--chart-2)" radius={[3, 3, 0, 0]}>
                {chartData.map((d, i) => (
                  <Cell
                    key={i}
                    fill={
                      d.status === "critical"
                        ? "var(--chart-4)"
                        : d.status === "warning"
                          ? "var(--chart-3)"
                          : "var(--chart-2)"
                    }
                  />
                ))}
              </Bar>
              <Bar dataKey="Predicted" fill="var(--chart-5)" radius={[3, 3, 0, 0]} fillOpacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div>
            <div className="text-sm font-semibold">GL Variance Detail</div>
            <div className="text-xs text-muted-foreground">
              {filtered.length} of {lines.length} lines
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Filter className="h-3 w-3" /> Sorted by variance
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr className="border-b border-border">
                <th className="px-5 py-2 font-medium">Cost Center</th>
                <th className="px-3 py-2 font-medium">Profit Center</th>
                <th className="px-3 py-2 font-medium">GL</th>
                <th className="px-3 py-2 font-medium">Description</th>
                <th className="px-3 py-2 text-right font-medium">Budget</th>
                <th className="px-3 py-2 text-right font-medium">Actual</th>
                <th className="px-3 py-2 text-right font-medium">Predicted</th>
                <th className="px-3 py-2 text-right font-medium">Variance</th>
                <th className="px-5 py-2 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered
                .slice()
                .sort((a, b) => Math.abs(b.actual - b.budget) - Math.abs(a.actual - a.budget))
                .map((l) => {
                  const variancePct = ((l.actual - l.budget) / l.budget) * 100;
                  return (
                    <tr key={l.id} className="border-b border-border/60 last:border-0 hover:bg-muted/40">
                      <td className="px-5 py-3 font-medium">{l.costCenter}</td>
                      <td className="px-3 py-3 text-muted-foreground">{l.profitCenter}</td>
                      <td className="px-3 py-3 text-muted-foreground">{l.glAccount}</td>
                      <td className="px-3 py-3">{l.description}</td>
                      <td className="px-3 py-3 text-right tabular-nums">{formatCurrency(l.budget)}</td>
                      <td className="px-3 py-3 text-right tabular-nums">{formatCurrency(l.actual)}</td>
                      <td className="px-3 py-3 text-right tabular-nums text-muted-foreground">
                        {formatCurrency(l.predicted)}
                      </td>
                      <td
                        className={cn(
                          "px-3 py-3 text-right tabular-nums font-medium",
                          variancePct > 0 ? "text-destructive" : "text-success",
                        )}
                      >
                        {formatPct(variancePct)}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span
                          className={cn(
                            "inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                            statusStyle[l.status],
                          )}
                        >
                          {l.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
