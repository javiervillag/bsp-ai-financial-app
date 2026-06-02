import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getSession } from "@/lib/auth";

export default async function Home() {
  const user = await getSession();
  if (!user) redirect("/login");

  return (
    <main className="min-h-screen bg-[#f7f3ed] text-[#151923]">
      <AppShell user={user} />
    </main>
  );
}
