import { redirect } from "next/navigation";
import { logoutAction } from "@/app/actions";
import { AppShell } from "@/components/app-shell";
import { getSession } from "@/lib/auth";

export default async function Home() {
  const user = await getSession();
  if (!user) redirect("/login");

  return (
    <main className="min-h-screen bg-[#f7f3ed] text-[#151923]">
      <form action={logoutAction} className="absolute right-6 top-6 z-20">
        <button className="rounded-md border border-[#d9d4ca] bg-white/90 px-3 py-2 text-sm font-semibold text-[#4d5160] shadow-sm hover:border-[#ff4a13]">
          Sign out
        </button>
      </form>
      <AppShell user={user} />
    </main>
  );
}
