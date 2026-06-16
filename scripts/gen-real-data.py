import csv, json, os
from collections import defaultdict

BASE = os.path.join(os.path.dirname(__file__), "..", "..", "clarias_demo_data_v2")
TENANTS = {
    "cascade": {"name": "Cascade Health Network", "short": "CHN"},
    "brightline": {"name": "Brightline Medical Center", "short": "BMC"},
    "pinehurst": {"name": "Pinehurst Community Health", "short": "PCH"},
}
TODAY = (2026, 9, 30)

def read_csv(tenant, name):
    path = os.path.join(BASE, tenant, f"{name}.csv")
    with open(path, newline="") as f:
        return list(csv.DictReader(f))

def days_between(d1, d2):
    import datetime
    a = datetime.date(*d1)
    b = datetime.date(*[int(x) for x in d2.split("-")])
    return (b - a).days

result = {}

for tid, meta in TENANTS.items():
    gl = read_csv(tid, "general_ledger")
    budgets = read_csv(tid, "budgets")
    contracts = read_csv(tid, "contracts")
    ap = read_csv(tid, "accounts_payable")

    # ---- Reconciliation lines: aggregate actual (GL) vs budget by cc/pc/gl ----
    budget_by_key = defaultdict(float)
    meta_by_key = {}
    for row in budgets:
        key = (row["cost_center_code"], row["profit_center_code"], row["gl_code"])
        budget_by_key[key] += float(row["budgeted_amount"])
        meta_by_key[key] = (row["cost_center_name"], row["profit_center_name"], row["gl_account_name"])

    actual_by_key = defaultdict(float)
    for row in gl:
        key = (row["cost_center_code"], row["profit_center_code"], row["gl_code"])
        actual_by_key[key] += float(row["amount"])
        if key not in meta_by_key:
            meta_by_key[key] = (row["cost_center_name"], row["profit_center_name"], row["gl_account_name"])

    recon_lines = []
    for key, budget in budget_by_key.items():
        actual = actual_by_key.get(key, 0.0)
        predicted = round(actual * 0.995, 2)  # simple proxy; real predictions come from forecasting engine later
        v = abs(actual - budget) / budget if budget else 0
        status = "critical" if v > 0.15 else "warning" if v > 0.05 else "ok"
        cc, pc, glname = meta_by_key[key]
        recon_lines.append({
            "id": f"{key[0]}-{key[2]}",
            "costCenter": f"{key[0]} {cc}",
            "profitCenter": f"{key[1]} {pc}",
            "glAccount": f"{key[2]} {glname}",
            "description": glname,
            "budget": round(budget, 2),
            "actual": round(actual, 2),
            "predicted": predicted,
            "status": status,
        })
    recon_lines.sort(key=lambda r: -abs(r["actual"] - r["budget"]))

    total_budget = sum(budget_by_key.values())
    total_actual = sum(actual_by_key.values())
    flagged = sum(1 for r in recon_lines if r["status"] != "ok")

    # ---- Vendors: aggregate spend by vendor from GL, tier from contract presence ----
    # Note: GL's own contract_id column is mostly blank, so "is this vendor contracted"
    # has to be determined by matching vendor_name against contracts.csv, not that column.
    contract_vendors = {c["vendor_name"] for c in contracts}
    vendor_spend = defaultdict(float)
    vendor_contracted_spend = defaultdict(float)
    vendor_periods = defaultdict(lambda: defaultdict(float))
    for row in gl:
        v = row["vendor_name"]
        amt = float(row["amount"])
        vendor_spend[v] += amt
        vendor_periods[v][int(row["period"])] += amt
        if v in contract_vendors:
            vendor_contracted_spend[v] += amt

    vendors = []
    for v, spend in vendor_spend.items():
        compliance = vendor_contracted_spend[v] / spend if spend else 0
        tier = "Preferred" if v in contract_vendors and compliance > 0.9 else \
               "Approved" if v in contract_vendors else "Off-contract"
        periods = vendor_periods[v]
        if periods:
            last_p = max(periods)
            prior = [periods[p] for p in periods if p < last_p]
            prior_avg = sum(prior) / len(prior) if prior else periods[last_p]
            trend = round(((periods[last_p] - prior_avg) / prior_avg) * 100, 1) if prior_avg else 0.0
        else:
            trend = 0.0
        vendors.append({
            "vendor": v, "spend": round(spend, 2),
            "contractCompliance": round(compliance, 2),
            "tier": tier, "trend": trend,
        })
    vendors.sort(key=lambda r: -r["spend"])

    # ---- Renewals: from contracts.csv ----
    renewals = []
    for c in contracts:
        d = days_between(TODAY, c["end_date"])
        urgency = "high" if d <= 60 else "medium" if d <= 120 else "low"
        renewals.append({
            "vendor": c["vendor_name"],
            "category": c["category"],
            "value": float(c["annual_value_estimate"]),
            "daysToRenewal": d,
            "urgency": urgency,
        })
    renewals.sort(key=lambda r: r["daysToRenewal"])

    # ---- Departments: aggregate by cost center ----
    dept_budget = defaultdict(float)
    dept_actual = defaultdict(float)
    dept_name = {}
    dept_lines = defaultdict(list)
    for row in budgets:
        dept_budget[row["cost_center_code"]] += float(row["budgeted_amount"])
        dept_name[row["cost_center_code"]] = row["cost_center_name"]
    for row in gl:
        cc = row["cost_center_code"]
        dept_actual[cc] += float(row["amount"])
        dept_name[cc] = row["cost_center_name"]
        dept_lines[cc].append((row["gl_account_name"], float(row["amount"])))

    departments = []
    for cc, budget in dept_budget.items():
        actual = dept_actual.get(cc, 0.0)
        lines = dept_lines.get(cc, [])
        top_driver = max(lines, key=lambda x: x[1])[0] if lines else dept_name[cc]
        departments.append({
            "department": dept_name[cc],
            "budget": round(budget, 2),
            "actual": round(actual, 2),
            "topDriver": top_driver,
        })
    departments.sort(key=lambda r: -abs(r["actual"] - r["budget"]))

    # ---- Alignment: aggregate by profit center, preferred/off-contract share of spend ----
    pc_budget = defaultdict(float)
    pc_actual = defaultdict(float)
    pc_name = {}
    pc_preferred = defaultdict(float)
    pc_offcontract = defaultdict(float)
    pc_total = defaultdict(float)
    for row in budgets:
        pc_budget[row["profit_center_code"]] += float(row["budgeted_amount"])
        pc_name[row["profit_center_code"]] = row["profit_center_name"]
    for row in gl:
        pc = row["profit_center_code"]
        amt = float(row["amount"])
        pc_actual[pc] += amt
        pc_total[pc] += amt
        pc_name[pc] = row["profit_center_name"]
        v = row["vendor_name"]
        if v in contract_vendors and vendor_spend[v] and (vendor_contracted_spend[v] / vendor_spend[v]) > 0.9:
            pc_preferred[pc] += amt
        if v not in contract_vendors:
            pc_offcontract[pc] += amt

    alignment = []
    for pc, budget in pc_budget.items():
        actual = pc_actual.get(pc, 0.0)
        total = pc_total.get(pc, 0.0) or 1.0
        alignment.append({
            "category": pc_name[pc],
            "budget": round(budget, 2),
            "actual": round(actual, 2),
            "preferredShare": round(pc_preferred[pc] / total, 2),
            "offContractShare": round(pc_offcontract[pc] / total, 2),
        })
    alignment.sort(key=lambda r: -abs(r["actual"] - r["budget"]))

    result[tid] = {
        "name": meta["name"], "short": meta["short"],
        "totalSpend": round(total_actual, 2), "budget": round(total_budget, 2),
        "variancePct": round(((total_actual - total_budget) / total_budget) * 100, 2) if total_budget else 0,
        "vendorCount": len(vendor_spend), "openContracts": len(contracts), "flaggedLines": flagged,
        "reconciliation": recon_lines, "vendors": vendors, "renewals": renewals,
        "departments": departments, "alignment": alignment,
    }

print(json.dumps(result, indent=2))
