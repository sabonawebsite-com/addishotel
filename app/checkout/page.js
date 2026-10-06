import { cookies } from "next/headers";
import { formatBirr, getDish } from "@/lib/dishes";

// Forced dynamic: this page reads the request's `cookies()` (the user's cart),
// which only exists per request, so it can never be prerendered or shared.
export const dynamic = "force-dynamic";

export const metadata = { title: "Checkout" };

export default async function CheckoutPage() {
  const store = await cookies();
  const slugs = JSON.parse(store.get("cart")?.value ?? "[]");
  const dishes = (await Promise.all(slugs.map(getDish))).filter(Boolean);
  const total = dishes.reduce((sum, d) => sum + d.priceBirr, 0);

  return (
    <section>
      <h1>Checkout</h1>
      {dishes.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {dishes.map((d, i) => (
              <li key={`${d.slug}-${i}`}>
                {d.name} — {formatBirr(d.priceBirr)}
              </li>
            ))}
          </ul>
          <p className="price">Total: {formatBirr(total)}</p>
        </>
      )}
    </section>
  );
}