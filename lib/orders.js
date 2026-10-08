import "server-only";
import { getDish } from "@/lib/dishes";

// In-memory store for the demo (resets on restart). Swap for a database later.
const orders = globalThis.__orders ?? (globalThis.__orders = []);

export async function createOrder({ address, phone, items }, user) {
  const dishes = await Promise.all(items.map(getDish));
  if (dishes.some((d) => !d)) return { error: "Order contains an unknown dish" };

  const order = {
    id: crypto.randomUUID(),
    user,
    address,
    phone,
    items,
    totalBirr: dishes.reduce((sum, d) => sum + d.priceBirr, 0),
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  return { order };
}