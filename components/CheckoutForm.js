"use client";

import { useActionState } from "react";
import { placeOrder } from "@/app/actions";

const initialState = { ok: false };

// Always rendered. It does NOT decide who may order: placeOrder() does.
export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(placeOrder, initialState);

  return (
    <form action={formAction} className="form">
      <label>
        Delivery address
        <input name="address" placeholder="Bole, Addis Ababa" required />
      </label>
      {state.errors?.address && <p className="error">{state.errors.address}</p>}

      <label>
        Phone
        <input name="phone" placeholder="0911223344" required />
      </label>
      {state.errors?.phone && <p className="error">{state.errors.phone}</p>}
      {state.errors?.items && <p className="error">{state.errors.items}</p>}

      <button disabled={pending}>{pending ? "Placing order…" : "Place order"}</button>

      {state.message && (
        <p className={state.ok ? "success" : "error"}>{state.message}</p>
      )}
    </form>
  );
}