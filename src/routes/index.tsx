import { createFileRoute } from "@tanstack/react-router";
import ClariasDashboard from "@/components/clarias/clarias-dashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clarias — Healthcare Financial Intelligence" },
      {
        name: "description",
        content:
          "Six intelligence engines for healthcare finance: reconciliation, causal spend, budget/intent alignment, vendor benchmarking, forecasting, and department self-service.",
      },
      { property: "og:title", content: "Clarias — Healthcare Financial Intelligence" },
      {
        property: "og:description",
        content:
          "Multi-tenant financial intelligence across GL, AP, contracts and budgets.",
      },
    ],
  }),
  component: ClariasDashboard,
});
