"use server";

import { cookies } from "next/headers";

// Cart is stored per user in a cookie (no database needed).
export async function addToCart(slug) {
  const store = await cookies();
  const current = JSON.parse(store.get("cart")?.value ?? "[]");
  store.set("cart", JSON.stringify([...current, slug]), {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });
}

export async function clearCart() {
  (await cookies()).delete("cart");
}