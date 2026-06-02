export type Role = "admin" | "executive" | "ops";

export type DemoUser = {
  email: string;
  name: string;
  role: Role;
  title: string;
};

export const demoUsers: DemoUser[] = [
  {
    email: "admin@barker-ai.local",
    name: "Barker Admin",
    role: "admin",
    title: "System administrator",
  },
  {
    email: "brenda@barker-ai.local",
    name: "Brenda Barker",
    role: "executive",
    title: "Executive leadership",
  },
  {
    email: "cat@barker-ai.local",
    name: "Cat Gutierrez",
    role: "ops",
    title: "Finance and operations",
  },
];

export const demoCredentials = [
  { email: "admin@barker-ai.local", password: "BarkerAdmin!2026", label: "Barker Admin", role: "admin" },
  { email: "brenda@barker-ai.local", password: "BarkerExec!2026", label: "Brenda Barker", role: "executive" },
  { email: "cat@barker-ai.local", password: "BarkerOps!2026", label: "Cat Gutierrez", role: "ops" },
];

export const kpis = [
  { label: "Revenue this week", value: "$418K", detail: "+11.8% vs. last week", tone: "good" },
  { label: "Cash collected", value: "$356K", detail: "85% same-day collection", tone: "good" },
  { label: "Open balance risk", value: "$62K", detail: "18 jobs need follow-up", tone: "warn" },
  { label: "Payroll readiness", value: "91%", detail: "23 blockers before Friday", tone: "warn" },
  { label: "Completed job exceptions", value: "14.6%", detail: "Target under 8%", tone: "bad" },
  { label: "Gross margin", value: "53.4%", detail: "+2.1 pts after drain work", tone: "good" },
];

export const revenueTrend = [
  { day: "Mon", revenue: 72000, collected: 61000, exceptions: 11 },
  { day: "Tue", revenue: 81000, collected: 76000, exceptions: 9 },
  { day: "Wed", revenue: 69000, collected: 54000, exceptions: 16 },
  { day: "Thu", revenue: 94000, collected: 83000, exceptions: 13 },
  { day: "Fri", revenue: 102000, collected: 82000, exceptions: 23 },
];

export const serviceLines = [
  { name: "Mainline drain", revenue: 94000, margin: 61, jobs: 44, exceptions: 5 },
  { name: "Secondary drain", revenue: 43000, margin: 56, jobs: 38, exceptions: 4 },
  { name: "Plumbing repair", revenue: 128000, margin: 49, jobs: 76, exceptions: 13 },
  { name: "Sewer repair", revenue: 87000, margin: 58, jobs: 18, exceptions: 2 },
  { name: "Water heater", revenue: 66000, margin: 45, jobs: 22, exceptions: 7 },
];

export const reviewQueues = [
  { lane: "Dispatch closeout", ready: 126, pending: 21, blocked: 9, owner: "Dispatch" },
  { lane: "Service manager review", ready: 88, pending: 37, blocked: 18, owner: "Service managers" },
  { lane: "Finance/payment", ready: 112, pending: 19, blocked: 14, owner: "Cat + finance" },
  { lane: "Payroll review", ready: 135, pending: 12, blocked: 7, owner: "Payroll" },
];

export const exceptions = [
  {
    id: "JOB-74219",
    customer: "Nguyen Residence",
    service: "Mainline drain",
    tech: "Ray M.",
    owner: "Rick",
    age: "5h",
    amount: "$4,820",
    severity: "high",
    issue: "Payment path missing after completed job",
    action: "Confirm financing or collect before payroll review",
  },
  {
    id: "JOB-74244",
    customer: "Victoria L.",
    service: "Plumbing repair",
    tech: "Landon K.",
    owner: "Dispatch",
    age: "2h",
    amount: "$1,470",
    severity: "medium",
    issue: "Invoice summary too thin for payroll handoff",
    action: "Rewrite summary and attach job notes",
  },
  {
    id: "JOB-74280",
    customer: "Jim D.",
    service: "Water heater",
    tech: "Austin B.",
    owner: "Cat",
    age: "1d",
    amount: "$3,260",
    severity: "high",
    issue: "Net-15 receipt not confirmed",
    action: "Call customer, confirm invoice receipt, post status",
  },
  {
    id: "JOB-74302",
    customer: "Orange County HOA",
    service: "Sewer repair",
    tech: "Camera team",
    owner: "Service manager",
    age: "7h",
    amount: "$12,900",
    severity: "low",
    issue: "Photos complete, but business unit mismatch",
    action: "Correct ServiceTitan tag before batch export",
  },
];

export const agentRules = [
  "Photos/videos attached before closeout",
  "Invoice summary and job summary present",
  "Business unit, tags, and opportunity checkbox verified",
  "Payment collected or financing/net terms routed",
  "Estimate total matches invoice total",
  "Service-manager review due before payroll cutoff",
  "Payroll blocks unresolved high-severity exceptions",
];

export const integrations = [
  { name: "ServiceTitan", status: "Demo connected", detail: "Jobs, invoices, tags, photos, payments" },
  { name: "Slack", status: "Demo connected", detail: "Exception notifications and owner follow-up" },
  { name: "Broccoli + phone intake", status: "Mapped", detail: "Lead source and booking context" },
  { name: "Payroll provider", status: "Future", detail: "Clean payroll readiness export" },
  { name: "Accounting", status: "Future", detail: "Open balances, job costs, and GL sync" },
  { name: "CXE / coaching", status: "Future", detail: "Technician coaching adoption and call insights" },
];

export const aiContext = {
  summary:
    "Barker's main financial constraint is the manual closeout-to-payroll review chain in ServiceTitan. Dispatch, service managers, finance, and payroll each review job completion evidence. The highest pain is service-manager review because field leaders avoid or rush admin work, which creates payroll delays and collection risk.",
  metrics: kpis,
  serviceLines,
  reviewQueues,
  exceptions,
  rules: agentRules,
};
