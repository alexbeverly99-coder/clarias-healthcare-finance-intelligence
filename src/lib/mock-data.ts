export type TenantId = "cascade" | "brightline" | "pinehurst";

export interface Tenant {
  id: TenantId;
  name: string;
  short: string;
  totalSpend: number;
  budget: number;
  variancePct: number;
  vendorCount: number;
  openContracts: number;
  flaggedLines: number;
}

export const tenants: Tenant[] = [
  {
    id: "cascade",
    name: "Cascade Health Network",
    short: "CHN",
    totalSpend: 184_320_000,
    budget: 178_900_000,
    variancePct: 3.03,
    vendorCount: 412,
    openContracts: 87,
    flaggedLines: 14,
  },
  {
    id: "brightline",
    name: "Brightline Medical Center",
    short: "BMC",
    totalSpend: 92_140_000,
    budget: 95_000_000,
    variancePct: -3.01,
    vendorCount: 238,
    openContracts: 41,
    flaggedLines: 6,
  },
  {
    id: "pinehurst",
    name: "Pinehurst Community Health",
    short: "PCH",
    totalSpend: 47_880_000,
    budget: 44_500_000,
    variancePct: 7.6,
    vendorCount: 156,
    openContracts: 29,
    flaggedLines: 11,
  },
];

export const getTenant = (id: TenantId) =>
  tenants.find((t) => t.id === id) ?? tenants[0];

export interface ReconciliationLine {
  id: string;
  costCenter: string;
  profitCenter: string;
  glAccount: string;
  description: string;
  budget: number;
  actual: number;
  predicted: number;
  status: "ok" | "warning" | "critical";
}

const seedLines = (tenantSeed: number): ReconciliationLine[] => {
  const base = [
    ["CC-1010", "PC-Cardio", "6100", "Surgical Implants"],
    ["CC-1010", "PC-Cardio", "6210", "Pharmaceuticals"],
    ["CC-2040", "PC-Imaging", "6320", "Contrast Media"],
    ["CC-3020", "PC-Lab", "6400", "Reagents & Assays"],
    ["CC-4010", "PC-Facilities", "7100", "Utilities"],
    ["CC-4010", "PC-Facilities", "7220", "Janitorial Services"],
    ["CC-5050", "PC-IT", "7800", "SaaS Subscriptions"],
    ["CC-5050", "PC-IT", "7820", "Hardware Refresh"],
    ["CC-6010", "PC-HR", "8100", "Travel & Lodging"],
    ["CC-7010", "PC-Admin", "8400", "Office Supplies"],
  ];
  return base.map(([cc, pc, gl, desc], i) => {
    const budget = (200_000 + ((i * 47 + tenantSeed * 13) % 9) * 65_000);
    const drift = (((i * 31 + tenantSeed * 17) % 19) - 9) / 100;
    const actual = Math.round(budget * (1 + drift));
    const predicted = Math.round(actual * (1 + (((i + tenantSeed) % 7) - 3) / 200));
    const v = Math.abs((actual - budget) / budget);
    const status: ReconciliationLine["status"] =
      v > 0.07 ? "critical" : v > 0.03 ? "warning" : "ok";
    return {
      id: `${cc}-${gl}-${i}`,
      costCenter: cc,
      profitCenter: pc,
      glAccount: gl,
      description: desc,
      budget,
      actual,
      predicted,
      status,
    };
  });
};

export const reconciliationByTenant: Record<TenantId, ReconciliationLine[]> = {
  cascade: seedLines(1),
  brightline: seedLines(2),
  pinehurst: seedLines(3),
};

export interface CausalDriver {
  label: string;
  amount: number;
}

export const causalDriversByTenant: Record<TenantId, CausalDriver[]> = {
  cascade: [
    { label: "Budgeted", amount: 1_200_000 },
    { label: "Rate increase", amount: 84_000 },
    { label: "Off-contract spend", amount: 51_000 },
    { label: "Volume change", amount: -22_000 },
    { label: "Contract renegotiation", amount: -14_000 },
    { label: "Actual", amount: 1_299_000 },
  ],
  brightline: [
    { label: "Budgeted", amount: 640_000 },
    { label: "Rate increase", amount: 18_000 },
    { label: "Volume change", amount: -38_000 },
    { label: "Contract renegotiation", amount: -9_000 },
    { label: "Actual", amount: 611_000 },
  ],
  pinehurst: [
    { label: "Budgeted", amount: 310_000 },
    { label: "Rate increase", amount: 41_000 },
    { label: "Off-contract spend", amount: 22_000 },
    { label: "Volume change", amount: 8_000 },
    { label: "Actual", amount: 381_000 },
  ],
};

export interface VendorRow {
  vendor: string;
  spend: number;
  contractCompliance: number;
  tier: "Preferred" | "Approved" | "Off-contract";
  trend: number;
}

export const vendorsByTenant: Record<TenantId, VendorRow[]> = {
  cascade: [
    { vendor: "MedSupply Global", spend: 12_400_000, contractCompliance: 0.94, tier: "Preferred", trend: 4.2 },
    { vendor: "Sterilis Pharma", spend: 8_900_000, contractCompliance: 0.88, tier: "Preferred", trend: -1.1 },
    { vendor: "Northwind Reagents", spend: 5_200_000, contractCompliance: 0.71, tier: "Approved", trend: 8.6 },
    { vendor: "Apex Imaging Co.", spend: 3_700_000, contractCompliance: 0.62, tier: "Approved", trend: 12.4 },
    { vendor: "Coastline Linens", spend: 1_840_000, contractCompliance: 0.48, tier: "Off-contract", trend: 22.1 },
    { vendor: "BlueRidge IT", spend: 1_210_000, contractCompliance: 0.92, tier: "Preferred", trend: 2.0 },
  ],
  brightline: [
    { vendor: "MedSupply Global", spend: 6_120_000, contractCompliance: 0.91, tier: "Preferred", trend: 1.8 },
    { vendor: "Beacon Diagnostics", spend: 3_280_000, contractCompliance: 0.84, tier: "Preferred", trend: -2.3 },
    { vendor: "Quill & Page Office", spend: 720_000, contractCompliance: 0.55, tier: "Off-contract", trend: 14.0 },
    { vendor: "Helio Cloud", spend: 940_000, contractCompliance: 0.97, tier: "Preferred", trend: 6.1 },
  ],
  pinehurst: [
    { vendor: "Northwind Reagents", spend: 2_100_000, contractCompliance: 0.66, tier: "Approved", trend: 9.4 },
    { vendor: "MedSupply Global", spend: 1_840_000, contractCompliance: 0.89, tier: "Preferred", trend: 3.2 },
    { vendor: "Coastline Linens", spend: 410_000, contractCompliance: 0.42, tier: "Off-contract", trend: 28.7 },
  ],
};

export interface ContractRenewal {
  vendor: string;
  category: string;
  value: number;
  daysToRenewal: number;
  urgency: "low" | "medium" | "high";
}

export const renewalsByTenant: Record<TenantId, ContractRenewal[]> = {
  cascade: [
    { vendor: "Sterilis Pharma", category: "Pharmaceuticals", value: 8_900_000, daysToRenewal: 18, urgency: "high" },
    { vendor: "Apex Imaging Co.", category: "Imaging", value: 3_700_000, daysToRenewal: 41, urgency: "medium" },
    { vendor: "BlueRidge IT", category: "IT Services", value: 1_210_000, daysToRenewal: 92, urgency: "low" },
    { vendor: "MedSupply Global", category: "Med/Surg", value: 12_400_000, daysToRenewal: 120, urgency: "low" },
  ],
  brightline: [
    { vendor: "Beacon Diagnostics", category: "Lab", value: 3_280_000, daysToRenewal: 24, urgency: "high" },
    { vendor: "Helio Cloud", category: "IT", value: 940_000, daysToRenewal: 60, urgency: "medium" },
  ],
  pinehurst: [
    { vendor: "Northwind Reagents", category: "Lab", value: 2_100_000, daysToRenewal: 12, urgency: "high" },
    { vendor: "Coastline Linens", category: "Facilities", value: 410_000, daysToRenewal: 75, urgency: "medium" },
  ],
};

export interface DepartmentLine {
  department: string;
  budget: number;
  actual: number;
  topDriver: string;
}

export const departmentsByTenant: Record<TenantId, DepartmentLine[]> = {
  cascade: [
    { department: "Cardiology", budget: 18_400_000, actual: 19_120_000, topDriver: "Implant rate +6%" },
    { department: "Imaging", budget: 9_200_000, actual: 9_640_000, topDriver: "Off-contract contrast media" },
    { department: "Lab", budget: 7_100_000, actual: 7_010_000, topDriver: "Volume -2%" },
    { department: "Facilities", budget: 6_300_000, actual: 6_580_000, topDriver: "Utilities +4%" },
    { department: "IT", budget: 5_900_000, actual: 6_240_000, topDriver: "SaaS sprawl" },
  ],
  brightline: [
    { department: "Lab", budget: 4_200_000, actual: 4_330_000, topDriver: "Reagent rate +3%" },
    { department: "IT", budget: 2_100_000, actual: 2_280_000, topDriver: "Cloud egress" },
    { department: "Admin", budget: 1_400_000, actual: 1_310_000, topDriver: "Travel -7%" },
  ],
  pinehurst: [
    { department: "Lab", budget: 2_900_000, actual: 3_240_000, topDriver: "Off-contract reagents" },
    { department: "Facilities", budget: 1_700_000, actual: 1_820_000, topDriver: "Linens off-contract" },
    { department: "Admin", budget: 900_000, actual: 940_000, topDriver: "Supplies +4%" },
  ],
};

export interface AlignmentRow {
  category: string;
  budget: number;
  actual: number;
  preferredShare: number;
  offContractShare: number;
}

export const alignmentByTenant: Record<TenantId, AlignmentRow[]> = {
  cascade: [
    { category: "Med/Surg", budget: 38_000_000, actual: 37_900_000, preferredShare: 0.82, offContractShare: 0.06 },
    { category: "Pharmacy", budget: 22_000_000, actual: 22_800_000, preferredShare: 0.74, offContractShare: 0.11 },
    { category: "Imaging", budget: 9_000_000, actual: 9_640_000, preferredShare: 0.58, offContractShare: 0.19 },
    { category: "Lab", budget: 7_100_000, actual: 7_010_000, preferredShare: 0.71, offContractShare: 0.09 },
    { category: "IT", budget: 5_900_000, actual: 6_240_000, preferredShare: 0.66, offContractShare: 0.14 },
  ],
  brightline: [
    { category: "Med/Surg", budget: 19_000_000, actual: 18_400_000, preferredShare: 0.86, offContractShare: 0.04 },
    { category: "Lab", budget: 4_200_000, actual: 4_330_000, preferredShare: 0.74, offContractShare: 0.08 },
    { category: "IT", budget: 2_100_000, actual: 2_280_000, preferredShare: 0.7, offContractShare: 0.1 },
  ],
  pinehurst: [
    { category: "Lab", budget: 2_900_000, actual: 3_240_000, preferredShare: 0.52, offContractShare: 0.22 },
    { category: "Med/Surg", budget: 6_400_000, actual: 6_310_000, preferredShare: 0.78, offContractShare: 0.07 },
    { category: "Facilities", budget: 1_700_000, actual: 1_820_000, preferredShare: 0.48, offContractShare: 0.21 },
  ],
};

export const formatCurrency = (n: number) => {
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
};

export const formatPct = (n: number, digits = 1) =>
  `${n > 0 ? "+" : ""}${n.toFixed(digits)}%`;