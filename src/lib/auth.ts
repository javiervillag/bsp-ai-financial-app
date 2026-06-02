import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import type { Role } from "./demo-data";
import { demoUsers } from "./demo-data";

const COOKIE_NAME = "bsp_ai_session";

export type SessionUser = {
  email: string;
  name: string;
  role: Role;
  title: string;
};

function secret() {
  const raw = process.env.AUTH_SECRET || "local-dev-secret-change-before-production";
  return new TextEncoder().encode(raw);
}

export async function createSession(user: SessionUser) {
  const token = await new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret());

  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    const email = String(payload.email || "");
    const role = payload.role as Role;
    const user = demoUsers.find((candidate) => candidate.email === email && candidate.role === role);
    if (!user) return null;
    return { email: user.email, name: user.name, role: user.role, title: user.title };
  } catch {
    return null;
  }
}

export function canAccess(role: Role, area: "executive" | "ops" | "admin") {
  if (role === "admin") return true;
  if (area === "admin") return false;
  if (area === "executive") return role === "executive";
  return role === "ops" || role === "executive";
}
