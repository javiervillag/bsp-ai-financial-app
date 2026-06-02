import "server-only";
import bcrypt from "bcryptjs";
import { demoUsers } from "./demo-data";

const passwordHashes: Record<string, string> = {
  "admin@barker-ai.local": "$2b$10$qPRfNIR6R8G5mfdrnr91pu7Ry.4gwzP295a97F6Mc0UdzNxKX1Oge",
  "brenda@barker-ai.local": "$2b$10$zhW8j1BK.KCo4Ywaf3rG6OW9EHusW/W9.76GEsgpWZOVW4.dN4VXO",
  "cat@barker-ai.local": "$2b$10$1fHTElG.hSnJY53/mTioyObzUkqz/Mh/bryX67u6LzWLv3RyUZsXK",
};

export async function verifyDemoUser(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = demoUsers.find((candidate) => candidate.email === normalizedEmail);
  const hash = passwordHashes[normalizedEmail];
  if (!user || !hash) return null;

  const valid = await bcrypt.compare(password, hash);
  return valid ? user : null;
}
