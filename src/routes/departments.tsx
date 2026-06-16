import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { PageHeader } from "@/components/clarias/page-header";
import { useTenant } from "@/lib/tenant-context";
import { departmentsByTenant, formatCurrency, formatPct } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/departments")({
  head: () => ({
    meta: [
      { title: "Department Budget Intelligence · Clarias" },
      {
        name: "description",
        content: "Self-service view for departments to see why their own budget line moved.",
      },
    ],
  }),
  component: DepartmentsPage,
});

function makeTrend(seed: number) {
  return Array.from({ length: 12 }).map((_, i) => ({
    m: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
    budget: 100 + ((i * 5 + seed * 3) % 12),
    actual: 100 + ((i * 7 + seed * 5) % 18) + (i > 6 ? 8 : 0),
  }));
}

function DepartmentsPage() {
  const { tenantId } = useTenant();
  const rows = departmentsByTenant[tenantId];
  const [selected, setSelected] = useState(rows[0]?.department ?? "");
  const current = rows.find((r) => r.department === selected) ?? rows[0];
  const trend = makeTrend(current?.department.length ?? 1);

  return (
    <div>
      <PageHeader
        eyebrow="Engine 06"
        title="Department Budget Intelligence"
        description="A direct, self-service view for a department to see why its own budget moved this period."
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {rows.map((r) => (
          <button
            key={r.department}
            onClick={() => setSelected(r.department)}
            className={cn(
              "rounded-md border px-3 py-1.5 text-xs font-medium transition",
              selected === r.department
                ? "border-primary bg-primary/15 text-primary"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {r.department}
          </button>
        ))}
      </div>

      {current && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Budget
            </div>
            <div className="mt-2 text-2xl font-semibold tabular-nums">
              {formatCurrency(current.budget)}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">FY plan</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Actual
            </div>
            <div className="mt-2 text-2xl font-semibold tabular-nums">
              {formatCurrency(current.actual)}
            </div>
            <div
              className={cn(
                "mt-1 text-xs font-medium",
                current.actual > current.budget ? "text-destructive" : "text-success",
              )}
            >
              {formatPct(((current.actual - current.budget) / current.budget) * 100)} vs budget
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Top Driver
            </div>
            <div className="mt-2 text-base font-semibold">{current.topDriver}</div>
            <div className="mt-1 text-xs text-muted-foreground">Auto-detected by Clarias</div>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="mb-1 text-sm font-semibold">12-Month Trend</div>
        <div className="mb-4 text-xs text-muted-foreground">
          Indexed to plan (100 = on budget)
        </div>
        <div className="h-64">
          <ResponsiveContainer>
            <AreaChart data={trend} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="aFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="bFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="budget"
                stroke="var(--chart-1)"
                fill="url(#bFill)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="var(--chart-2)"
                fill="url(#aFill)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}