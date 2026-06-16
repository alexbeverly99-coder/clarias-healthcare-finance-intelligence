# Plan: Replace Clarias dashboard with prototype v2

Throw out the current page implementations and use the uploaded `clarias_dashboard_v2.jsx` (1,028 lines) as the literal source of truth for structure, data, and logic across all six engines. Only the visual styling is adapted to our existing design system (light teal theme, shadcn primitives, semantic tokens from `src/styles.css`).

## What gets replaced

Delete and rewrite from the prototype:
- `src/routes/index.tsx` (Executive Overview / engine 1)
- `src/routes/causal.tsx` (engine 2)
- `src/routes/alignment.tsx` (engine 3)
- `src/routes/vendors.tsx` (engine 4)
- `src/routes/forecasting.tsx` (engine 5)
- `src/routes/departments.tsx` (engine 6)
- `src/lib/mock-data.ts` — replaced with prototype's embedded datasets

Keep as-is (styling/shell only):
- `src/routes/__root.tsx`, `src/components/clarias/app-sidebar.tsx`, `topbar.tsx`, `tenant-switcher.tsx`, `page-header.tsx`, `kpi-card.tsx`, `tenant-context.tsx`
- `src/styles.css` (teal light theme stays the canonical token source)

## How the port works

1. **Extract data** from the prototype's top `DATA` section into a single `src/lib/clarias-data.ts` module, preserving exact values, tenant keys, and shapes (`MONTHS`, GL lines, vendors, contracts, departments, causal drivers, alignment rows, forecast items). No reinterpretation of numbers or logic.
2. **Extract each engine's component body** verbatim (state, `useMemo`, derived calcs, chart configs, table columns, conditional rendering) into the matching route file. Only changes:
   - Replace prototype's inline Tailwind color classes (`bg-slate-900`, `text-emerald-500`, hex literals) with our semantic tokens (`bg-card`, `text-success`, `var(--chart-1)`, etc.).
   - Swap raw `<button>`/`<table>`/`<input>` for our shadcn equivalents where the prototype uses unstyled HTML, keeping identical props/handlers.
   - Recharts components keep the same data props; only `stroke`/`fill` strings switch to `var(--chart-*)` tokens.
3. **Tenant switching** continues to flow through `useTenant()`; the prototype's tenant selector logic is wired to our existing `TenantProvider` (no duplicate state).
4. **Sidebar nav labels** updated to match the prototype's six engine names/order exactly.

## Out of scope

- No CSV ingestion — the `clarias_demo_data_v2/` CSVs are reference only; the JSX already contains the hardcoded mock data we'll use.
- No new backend, no Lovable Cloud.
- No new routes beyond the existing six.
- No changes to fonts, color palette, spacing scale, or shell chrome beyond what's needed to host the new content.

## Verification

After the rewrite, walk each of the six routes in the preview, confirm every chart, KPI, table, and interactive control from the prototype is present and reacts to tenant switching, and that no hardcoded colors leaked through.
