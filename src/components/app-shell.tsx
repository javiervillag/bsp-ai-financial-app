"use client";

import { useEffect, useMemo, useState } from "react";
import type React from "react";
import {
  AlertTriangle,
  BarChart3,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  DatabaseZap,
  Layers3,
  LineChart,
  Lock,
  RefreshCcw,
  Send,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SessionUser } from "@/lib/auth";
import {
  agentRules,
  exceptions,
  integrations,
  kpis,
  revenueTrend,
  reviewQueues,
  serviceLines,
} from "@/lib/demo-data";

type Tab = "executive" | "operations" | "ai" | "reports" | "integrations" | "admin";

type Health = {
  ok: boolean;
  checks: {
    authSecret: boolean;
    databaseUrl: boolean;
    openAiKey: boolean;
    openAiModel: string;
  };
};

const tabs: { id: Tab; label: string; icon: typeof BarChart3 }[] = [
  { id: "executive", label: "Executive", icon: BarChart3 },
  { id: "operations", label: "Operations", icon: ClipboardCheck },
  { id: "ai", label: "AI Analyst", icon: Bot },
  { id: "reports", label: "Reports", icon: LineChart },
  { id: "integrations", label: "Integrations", icon: DatabaseZap },
  { id: "admin", label: "Admin", icon: Settings },
];

export function AppShell({ user }: { user: SessionUser }) {
  const [active, setActive] = useState<Tab>(user.role === "ops" ? "operations" : "executive");
  const [health, setHealth] = useState<Health | null>(null);
  const allowed = useMemo(() => {
    if (user.role === "admin") return new Set<Tab>(tabs.map((tab) => tab.id));
    if (user.role === "executive") return new Set<Tab>(["executive", "operations", "ai", "reports", "integrations"]);
    return new Set<Tab>(["operations", "ai", "reports", "integrations"]);
  }, [user.role]);

  const visibleTabs = tabs.filter((tab) => allowed.has(tab.id));

  useEffect(() => {
    fetch("/api/health")
      .then((response) => response.json())
      .then(setHealth)
      .catch(() => setHealth(null));
  }, []);

  return (
    <div className="mx-auto max-w-[1480px] px-4 py-5 md:px-6">
      <header className="mb-5 flex flex-col gap-4 rounded-lg border border-[#ddd6cb] bg-white px-4 py-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#151923] text-xl font-black text-[#ff4a13]">B</div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff4a13]">Barker AI</p>
            <h1 className="text-2xl font-semibold tracking-tight">Financial Intelligence Command Center</h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge icon={ShieldCheck} text={health?.checks.authSecret ? "Production auth" : "Auth needs secret"} tone={health?.checks.authSecret ? "green" : "red"} />
          <Badge icon={Sparkles} text={health?.checks.openAiKey ? `OpenAI ${health.checks.openAiModel}` : "OpenAI key missing"} tone={health?.checks.openAiKey ? "green" : "red"} />
          <div className="rounded-md border border-[#e5e0d8] px-3 py-2 text-sm">
            <span className="font-semibold">{user.name}</span>
            <span className="ml-2 text-[#6b707c]">{user.title}</span>
          </div>
        </div>
      </header>

      <nav className="mb-5 flex gap-2 overflow-x-auto rounded-lg border border-[#ddd6cb] bg-white p-2 shadow-sm">
        {visibleTabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold transition ${
              active === id ? "bg-[#151923] text-white" : "text-[#525766] hover:bg-[#f4f1eb]"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      {active === "executive" && <Executive />}
      {active === "operations" && <Operations />}
      {active === "ai" && <AiAnalyst />}
      {active === "reports" && <Reports />}
      {active === "integrations" && <Integrations health={health} />}
      {active === "admin" && <Admin health={health} />}
    </div>
  );
}

function Executive() {
  return (
    <section className="space-y-5">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
        {kpis.map((item) => (
          <Kpi key={item.label} {...item} />
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.45fr_0.9fr]">
        <Panel title="Cash and Revenue Trend" eyebrow="Week in ServiceTitan">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e2da" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#ff4a13" fill="#ff4a1328" name="Revenue" />
                <Area type="monotone" dataKey="collected" stroke="#07996f" fill="#07996f20" name="Collected" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="AI Executive Readout" eyebrow="What changed">
          <div className="space-y-4 text-sm leading-6 text-[#535866]">
            <p>
              Revenue is healthy, but Friday&apos;s payroll-ready jobs are carrying a higher exception load. The biggest financial risk is not demand; it is completed work that still needs payment path confirmation or manager review before payroll.
            </p>
            <div className="rounded-md border border-[#ffd5c8] bg-[#fff4ef] p-4">
              <div className="mb-1 flex items-center gap-2 font-semibold text-[#c82706]">
                <AlertTriangle size={16} /> Watch today
              </div>
              23 payroll blockers are concentrated in service-manager review and finance/payment follow-up.
            </div>
            <div className="rounded-md border border-[#cdeede] bg-[#f1fff8] p-4">
              <div className="mb-1 flex items-center gap-2 font-semibold text-[#047857]">
                <CheckCircle2 size={16} /> Working well
              </div>
              Mainline drain jobs are producing the best margin and shortest closeout cycle.
            </div>
          </div>
        </Panel>
      </div>
      <Panel title="Service-Line Profitability" eyebrow="Operational drivers behind financial health">
        <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceLines}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e2da" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#151923" name="Revenue" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="divide-y divide-[#eee9e2]">
            {serviceLines.map((line) => (
              <div key={line.name} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 py-3 text-sm">
                <strong>{line.name}</strong>
                <span>{line.jobs} jobs</span>
                <span>{line.margin}% margin</span>
                <span className={line.exceptions > 6 ? "text-[#c82706]" : "text-[#047857]"}>{line.exceptions} exceptions</span>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </section>
  );
}

function Operations() {
  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_1fr]">
      <Panel title="Closeout Command Center" eyebrow="Barker workflow from completed job to payroll">
        <div className="space-y-3">
          {reviewQueues.map((queue) => (
            <div key={queue.lane} className="rounded-lg border border-[#e5e0d8] bg-[#fbfaf7] p-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{queue.lane}</h3>
                  <p className="text-sm text-[#6c717d]">{queue.owner}</p>
                </div>
                <span className="rounded-full bg-[#fff1e9] px-3 py-1 text-sm font-semibold text-[#ff4a13]">
                  {queue.blocked} blockers
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <Status label="Verified" value={queue.ready} tone="green" />
                <Status label="Pending" value={queue.pending} tone="yellow" />
                <Status label="Blocked" value={queue.blocked} tone="red" />
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Exception Queue" eyebrow="Jobs that need human review">
        <div className="space-y-3">
          {exceptions.map((item) => (
            <div key={item.id} className={`rounded-lg border p-4 ${item.severity === "high" ? "border-[#ffb5a3] bg-[#fff7f4]" : "border-[#e5e0d8] bg-white"}`}>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{item.id} · {item.customer}</h3>
                  <p className="text-sm text-[#6c717d]">{item.service} · {item.tech} · {item.amount}</p>
                </div>
                <Badge icon={AlertTriangle} text={`${item.age} · ${item.owner}`} tone={item.severity === "high" ? "red" : "orange"} />
              </div>
              <p className="text-sm font-semibold">{item.issue}</p>
              <p className="mt-1 text-sm text-[#626774]">{item.action}</p>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Agent Rules" eyebrow="Trained from Barker closeout process">
        <div className="grid gap-3 md:grid-cols-2">
          {agentRules.map((rule) => (
            <div key={rule} className="flex items-center gap-3 rounded-lg border border-[#e5e0d8] bg-white p-3">
              <CheckCircle2 className="text-[#07996f]" size={18} />
              <span className="text-sm font-medium">{rule}</span>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="AI Batch Processing" eyebrow="Volca-style agent delivery">
        <div className="space-y-4">
          {["Scanning completed ServiceTitan jobs", "Checking photos, summaries, payments, tags", "Flagging payroll-blocking exceptions", "Generating executive and operations reports"].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 className="text-[#07996f]" />
              <span className="font-medium">{item}</span>
            </div>
          ))}
          <div className="h-3 overflow-hidden rounded-full bg-[#ece8e1]">
            <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-[#f31305] to-[#ff8a00]" />
          </div>
        </div>
      </Panel>
    </section>
  );
}

function AiAnalyst() {
  const [message, setMessage] = useState("What should Barker leadership inspect before payroll Friday?");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask() {
    setLoading(true);
    setAnswer("");
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    setAnswer(data.answer || data.error || "No answer returned.");
    setLoading(false);
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <Panel title="Ask Barker AI" eyebrow="Real OpenAI endpoint">
        <div className="space-y-4">
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="min-h-36 w-full rounded-md border border-[#dcd7ce] p-3 outline-none focus:border-[#ff4a13]"
          />
          <button onClick={ask} disabled={loading} className="inline-flex items-center gap-2 rounded-md bg-[#ff4a13] px-4 py-3 font-semibold text-white disabled:opacity-60">
            {loading ? <RefreshCcw className="animate-spin" size={18} /> : <Send size={18} />}
            Ask analyst
          </button>
        </div>
      </Panel>
      <Panel title="Answer" eyebrow="No scripted fallback">
        <div className="min-h-56 whitespace-pre-wrap rounded-lg border border-[#e5e0d8] bg-[#fbfaf7] p-4 text-sm leading-7 text-[#414653]">
          {answer || "Ask a question about revenue, closeout exceptions, service-manager review, payment risk, or payroll readiness."}
        </div>
      </Panel>
    </section>
  );
}

function Reports() {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      {[
        ["Executive Brief", "Revenue is strong, but open-balance exposure and service-manager review backlog are the main constraints this week."],
        ["Payroll Readiness", "91% ready. High-severity blockers are mostly missing payment path confirmation and overdue second review."],
        ["Closeout Exceptions", "Completed job exception rate is 14.6%, above the target of 8%. Dispatch closeout quality is improving but inconsistent."],
        ["Collections Risk", "$62K in open balance risk. Net-15 receipt confirmation and financing routing are the top follow-up causes."],
      ].map(([title, copy]) => (
        <Panel key={title} title={title} eyebrow="Generated report">
          <p className="text-sm leading-7 text-[#555b68]">{copy}</p>
          <button className="mt-5 rounded-md border border-[#dcd7ce] px-3 py-2 text-sm font-semibold hover:border-[#ff4a13]">Preview report</button>
        </Panel>
      ))}
    </section>
  );
}

function Integrations({ health }: { health: Health | null }) {
  const liveIntegrations = integrations.map((item) =>
    item.name === "Accounting" && health?.checks.databaseUrl
      ? { ...item, status: "Database ready", detail: "Railway Postgres is configured for production data persistence" }
      : item,
  );

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {liveIntegrations.map((item) => (
        <div key={item.name} className="rounded-lg border border-[#ddd6cb] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DatabaseZap className="text-[#ff4a13]" />
              <h2 className="font-semibold">{item.name}</h2>
            </div>
            <span className="rounded-full bg-[#f4f1eb] px-3 py-1 text-xs font-semibold">{item.status}</span>
          </div>
          <p className="text-sm leading-6 text-[#626774]">{item.detail}</p>
        </div>
      ))}
    </section>
  );
}

function Admin({ health }: { health: Health | null }) {
  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <Panel title="Security and Roles" eyebrow="Production-oriented controls">
        <div className="space-y-3">
          {["Admin can manage settings and users", "Executive can view financial and operations intelligence", "Finance/ops can work exceptions and reports", "All pages require a signed HTTP-only session"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-lg border border-[#e5e0d8] p-3 text-sm">
              <Lock size={17} className="text-[#151923]" />
              {item}
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Demo Controls" eyebrow="Seeded Barker data">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Refresh demo data", RefreshCcw],
            ["Adjust rules", SlidersHorizontal],
            ["Manage users", Users],
            ["Review context layer", Layers3],
          ].map(([label, Icon]) => {
            const ControlIcon = Icon as typeof RefreshCcw;
            return (
              <button key={label as string} className="flex items-center gap-3 rounded-lg border border-[#e5e0d8] bg-white p-4 text-left font-semibold hover:border-[#ff4a13]">
                <ControlIcon size={18} />
                {label as string}
              </button>
            );
          })}
        </div>
      </Panel>
      <Panel title="Runtime Health" eyebrow="Live deployment readiness">
        <div className="grid gap-3 sm:grid-cols-2">
          <Status label="Auth secret" value={health?.checks.authSecret ? 1 : 0} tone={health?.checks.authSecret ? "green" : "red"} />
          <Status label="Database" value={health?.checks.databaseUrl ? 1 : 0} tone={health?.checks.databaseUrl ? "green" : "red"} />
          <Status label="OpenAI key" value={health?.checks.openAiKey ? 1 : 0} tone={health?.checks.openAiKey ? "green" : "red"} />
          <div className="rounded-md bg-[#f4f1eb] px-3 py-2 text-center">
            <div className="text-xl font-semibold">{health?.checks.openAiModel || "gpt-4.1"}</div>
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5f6470]">AI model</div>
          </div>
        </div>
      </Panel>
    </section>
  );
}

function Panel({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-[#ddd6cb] bg-white p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8c909b]">{eyebrow}</p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Kpi({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: string }) {
  const color = tone === "good" ? "text-[#047857]" : tone === "bad" ? "text-[#c82706]" : "text-[#b45f00]";
  return (
    <div className="rounded-lg border border-[#ddd6cb] bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#858a96]">{label}</p>
      <div className="mt-3 text-3xl font-semibold">{value}</div>
      <p className={`mt-2 text-sm font-medium ${color}`}>{detail}</p>
    </div>
  );
}

function Status({ label, value, tone }: { label: string; value: number; tone: "green" | "yellow" | "red" }) {
  const color = tone === "green" ? "bg-[#ebfff6] text-[#047857]" : tone === "yellow" ? "bg-[#fff8df] text-[#9a6500]" : "bg-[#fff0ec] text-[#c82706]";
  return (
    <div className={`rounded-md px-3 py-2 ${color}`}>
      <div className="text-xl font-semibold">{value}</div>
      <div className="text-xs font-semibold uppercase tracking-[0.12em]">{label}</div>
    </div>
  );
}

function Badge({ icon: Icon, text, tone }: { icon: typeof CheckCircle2; text: string; tone: "green" | "orange" | "red" }) {
  const cls = tone === "green" ? "bg-[#eafaf2] text-[#047857]" : tone === "red" ? "bg-[#fff0ec] text-[#c82706]" : "bg-[#fff1e9] text-[#d1460c]";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${cls}`}>
      <Icon size={14} />
      {text}
    </span>
  );
}
