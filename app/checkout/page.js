// import { cookies } from "next/headers";
// import { formatBirr, getDish } from "@/lib/dishes";

// // Forced dynamic: this page reads the request's `cookies()` (the user's cart),
// // which only exists per request, so it can never be prerendered or shared.
// export const dynamic = "force-dynamic";

// export const metadata = { title: "Checkout" };

// export default async function CheckoutPage() {
//   const store = await cookies();
//   const slugs = JSON.parse(store.get("cart")?.value ?? "[]");
//   const dishes = (await Promise.all(slugs.map(getDish))).filter(Boolean);
//   const total = dishes.reduce((sum, d) => sum + d.priceBirr, 0);

//   return (
//     <section>
//       <h1>Checkout</h1>
//       {dishes.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <ul>
//             {dishes.map((d, i) => (
//               <li key={`${d.slug}-${i}`}>
//                 {d.name} — {formatBirr(d.priceBirr)}
//               </li>
//             ))}
//           </ul>
//           <p className="price">Total: {formatBirr(total)}</p>
//         </>
//       )}
//     </section>
//   );
// }


import { cookies } from "next/headers";
import CheckoutForm from "@/components/CheckoutForm";
import { logout } from "@/app/actions";
import { readCart } from "@/lib/cart";
import { formatBirr, getDish } from "@/lib/dishes";
import { getSession } from "@/lib/session";

// Forced dynamic: this page reads the request's cookies() (the user's cart and
// session cookie), which only exist per request, so it can never be prerendered.
export const dynamic = "force-dynamic";

export const metadata = { title: "Checkout" };

export default async function CheckoutPage() {
  const store = await cookies();
  const session = await getSession();
  const dishes = (await Promise.all(readCart(store).map(getDish))).filter(Boolean);
  const total = dishes.reduce((sum, d) => sum + d.priceBirr, 0);

  return (
    <section>
      <h1>Checkout</h1>

      {/* Display only. The real permission check is inside placeOrder(). */}
      {session ? (
        <form action={logout}>
          <p className="muted">
            Signed in as {session.name} <button>Log out</button>
          </p>
        </form>
      ) : (
        <p className="muted">
          You are not signed in. <a href="/login"><u>Log in</u></a> to order.
        </p>
      )}

      {dishes.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {dishes.map((d, i) => (
            <li key={`${d.slug}-${i}`}>
              {d.name} — {formatBirr(d.priceBirr)}
            </li>
          ))}
        </ul>
      )}
      <p className="price">Total: {formatBirr(total)}</p>

      <CheckoutForm />
    </section>
  );
}