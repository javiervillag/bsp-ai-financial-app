import { loginAction } from "@/app/actions";
import { demoCredentials } from "@/lib/demo-data";

export default function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-[#151923]">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12">
        <section className="grid w-full gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#e6ded1] bg-white/75 px-4 py-2 shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff4a13]" />
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#ff4a13]">Barker & Sons AI</span>
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
                Financial intelligence for closeout, cash, and payroll readiness.
              </h1>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-[#626676]">
              A Volca-inspired command center built around Barker and Sons&apos; ServiceTitan closeout workflow, service-manager review bottleneck, and payment follow-up risk.
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {["ServiceTitan context", "AI exception review", "Role-based views"].map((item) => (
                <div key={item} className="rounded-md border border-[#ded8cf] bg-white/80 p-4 text-sm font-semibold shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[#ded8cf] bg-white p-6 shadow-md shadow-[#1519230d]">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#777b87]">Sign in</p>
              <h2 className="mt-2 text-2xl font-semibold">Open Barker AI</h2>
            </div>
            <form action={loginAction} className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-[#4d5160]">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue="brenda@barker-ai.local"
                  className="mt-2 w-full rounded-md border border-[#d8dce3] px-3 py-3 outline-none focus:border-[#ff4a13]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-[#4d5160]">Password</span>
                <input
                  name="password"
                  type="password"
                  required
                  defaultValue="BarkerExec!2026"
                  className="mt-2 w-full rounded-md border border-[#d8dce3] px-3 py-3 outline-none focus:border-[#ff4a13]"
                />
              </label>
              <ErrorMessage searchParams={searchParams} />
              <button className="w-full rounded-md bg-[#ff4a13] px-4 py-3 font-semibold text-white transition hover:bg-[#e53e0d]">
                Sign in
              </button>
            </form>
            <div className="mt-8 space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#777b87]">Demo accounts</p>
              {demoCredentials.map((user) => (
                <div key={user.email} className="rounded-md border border-[#ece8e1] bg-[#fbfaf7] p-3 text-sm">
                  <div className="font-semibold">{user.label} · {user.role}</div>
                  <div className="text-[#686d7a]">{user.email}</div>
                  <div className="text-[#686d7a]">{user.password}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

async function ErrorMessage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  if (params.error !== "invalid") return null;
  return <p className="rounded-md bg-[#fff0ec] px-3 py-2 text-sm font-medium text-[#c82706]">Invalid email or password.</p>;
}
