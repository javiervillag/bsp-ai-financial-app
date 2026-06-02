"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession } from "@/lib/auth";
import { demoUsers } from "@/lib/demo-data";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const user = demoUsers.find((candidate) => candidate.email === email && candidate.password === password);

  if (!user) {
    redirect("/login?error=invalid");
  }

  await createSession({
    email: user.email,
    name: user.name,
    role: user.role,
    title: user.title,
  });
  redirect("/");
}

export async function logoutAction() {
  await destroySession();
  redirect("/login");
}
