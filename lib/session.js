import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "session";
const SECRET = process.env.SESSION_SECRET ?? "dev-secret-change-me";

const hmac = (body) => createHmac("sha256", SECRET).update(body).digest("base64url");

// Signed token: base64url(payload).signature (tamper-proof, not encrypted).
export function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${hmac(body)}`;
}

export function verify(token) {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const a = Buffer.from(sig);
  const b = Buffer.from(hmac(body));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString());
  } catch {
    return null;
  }
}

export async function getSession() {
  const store = await cookies();
  return verify(store.get(SESSION_COOKIE)?.value);
}

// Authorisation rule: only logged-in customers/admins may order.
export const canOrder = (session) =>
  Boolean(session) && ["customer", "admin"].includes(session.role);