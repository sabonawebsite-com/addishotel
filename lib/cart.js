// Reads the cart cookie safely (a tampered cookie must never crash the page).
export function readCart(store) {
  try {
    const value = JSON.parse(store.get("cart")?.value ?? "[]");
    return Array.isArray(value) ? value.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
}