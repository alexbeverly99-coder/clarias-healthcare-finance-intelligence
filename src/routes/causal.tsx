import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { PageHeader } from "@/components/clarias/page-header";
import { useTenant } from "@/lib/tenant-context";
import { causalDriversByTenant, reconciliationByTenant, formatCurrency } from "@/lib/real-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/causal")({
  head: () => ({
    meta: [
      { title: "Causal Spend Analysis · Clarias" },
      {
        name: "description",
        content: "Decompose flagged GL variance into rate, volume, contract, and off-contract drivers.",
      },
    ],
  }),
  component: CausalPage,
});

function CausalPage() {
  const { tenantId, tenant } = useTenant();
  const flagged = reconciliationByTenant[tenantId].filter((l) => l.status !== "ok");
  const [selected, setSelected] = useState(flagged[0]?.id ?? null);
  const drivers = causalDriversByTenant[tenantId];

  let running = 0;
  const waterfall = drivers.map((d, i) => {
    const isAnchor = i === 0 || i === drivers.length - 1;
    const start = isAnchor ? 0 : running;
    if (!isAnchor) running += d.amount;
    else running = d.amount;
    return {
      name: d.label,
      base: isAnchor ? 0 : Math.min(start, start + d.amount),
      delta: isAnchor ? d.amount : Math.abs(d.amount),
      raw: d.amount,
      isAnchor,
      positive: d.amount >= 0,
    };
  });

  return (
    <div>
      <PageHeader
        eyebrow="Engine 02"
        title="Causal Spend Analysis"
        description={`Decompose a flagged ${tenant.short} GL line into rate, volume, contract, and off-contract drivers.`}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <div className="rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-card)]">
          <div className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Flagged GL Lines
          </div>
          <div className="space-y-1">
            {flagged.map((l) => {
              const v = ((l.actual - l.budget) / l.budget) * 100;
              return (
                <button
                  key={l.id}
                  onClick={() => setSelected(l.id)}
                  className={cn(
                    "w-full rounded-md border border-transparent px-3 py-2 text-left transition",
                    selected === l.id
                      ? "border-primary/40 bg-primary/10"
                      : "hover:bg-muted",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{l.description}</span>
                    <span
                      className={cn(
                        "text-[10px] font-semibold",
                        v > 0 ? "text-destructive" : "text-success",
                      )}
                    >
                      {v > 0 ? "+" : ""}
                      {v.toFixed(1)}%
                    </span>
                  </div>
                  <div className="mt-0.5 text-[10px] text-muted-foreground">
                    {l.costCenter} · GL {l.glAccount}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="mb-1 text-sm font-semibold">Variance Waterfall</div>
            <div className="mb-4 text-xs text-muted-foreground">
              From budgeted to actual, broken down by driver
            </div>
            <div className="h-72">
              <ResponsiveContainer>
                <BarChart data={waterfall} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="var(--muted-foreground)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
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
                    formatter={(_v, _n, item) => formatCurrency(item.payload.raw)}
                  />
                  <Bar dataKey="base" stackId="w" fill="transparent" />
                  <Bar dataKey="delta" stackId="w" radius={[3, 3, 0, 0]}>
                    {waterfall.map((d, i) => (
                      <Cell
                        key={i}
                        fill={
                          d.isAnchor
                            ? "var(--chart-1)"
                            : d.positive
                              ? "var(--chart-4)"
                              : "var(--chart-2)"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {drivers
              .slice(1, -1)
              .map((d) => (
                <div
                  key={d.label}
                  className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
                >
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {d.label}
                  </div>
                  <div
                    className={cn(
                      "mt-2 text-xl font-semibold tabular-nums",
                      d.amount > 0 ? "text-destructive" : "text-success",
                    )}
                  >
                    {d.amount > 0 ? "+" : "−"}
                    {formatCurrency(Math.abs(d.amount))}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {d.amount > 0 ? "Increases" : "Reduces"} actual vs budget
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}