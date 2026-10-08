// "use server";

// import { cookies } from "next/headers";

// // Cart is stored per user in a cookie (no database needed).
// export async function addToCart(slug) {
//   const store = await cookies();
//   const current = JSON.parse(store.get("cart")?.value ?? "[]");
//   store.set("cart", JSON.stringify([...current, slug]), {
//     path: "/",
//     httpOnly: true,
//     maxAge: 60 * 60 * 24,
//   });
// }

// export async function clearCart() {
//   (await cookies()).delete("cart");
// }

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getDish } from "@/lib/dishes";
import { readCart } from "@/lib/cart";
import { createOrder } from "@/lib/orders";
import { fieldErrors, loginSchema, orderSchema } from "@/lib/schema";
import { SESSION_COOKIE, canOrder, getSession, sign } from "@/lib/session";

export async function addToCart(slug) {
  if (typeof slug !== "string" || !(await getDish(slug))) return;
  const store = await cookies();
  store.set("cart", JSON.stringify([...readCart(store), slug]), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });
  revalidatePath("/checkout");
}

export async function login(_prevState, formData) {
  const parsed = loginSchema.safeParse({
    name: formData.get("name") ?? "",
    password: formData.get("password") ?? "",
  });
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) };

  // Demo credential. Replace with a real user lookup + password hash check.
  if (parsed.data.password !== (process.env.DEMO_PASSWORD ?? "addis123")) {
    return { ok: false, message: "Wrong name or password." };
  }

  const role = parsed.data.name.toLowerCase() === "admin" ? "admin" : "customer";
  const store = await cookies();
  store.set(SESSION_COOKIE, sign({ name: parsed.data.name, role }), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
  });
  redirect("/checkout");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/");
}

export async function placeOrder(_prevState, formData) {
  // 1. AUTHORISATION lives here, in the action, never in the component
  //    that renders the button (anyone can call an action directly).
  const session = await getSession();
  if (!canOrder(session)) {
    return { ok: false, message: "Please log in to place an order." };
  }

  // 2. VALIDATION with the shared schema.
  const store = await cookies();
  const parsed = orderSchema.safeParse({
    address: formData.get("address") ?? "",
    phone: formData.get("phone") ?? "",
    items: readCart(store), // cart comes from the server-side cookie, not the form
  });
  if (!parsed.success) return { ok: false, errors: fieldErrors(parsed.error) };

  // 3. WORK
  const result = await createOrder(parsed.data, session.name);
  if (result.error) return { ok: false, message: result.error };

  store.delete("cart");
  revalidatePath("/checkout");
  return {
    ok: true,
    message: `Order ${result.order.id.slice(0, 8)} placed. Total: ${result.order.totalBirr} Birr.`,
  };
}