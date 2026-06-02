"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession } from "@/lib/auth";
import { verifyDemoUser } from "@/lib/server-users";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const user = await verifyDemoUser(email, password);

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
