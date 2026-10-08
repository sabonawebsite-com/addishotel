"use client";

export default function CheckoutError({ error, reset }) {
  return (
    <section>
      <h2>Checkout failed</h2>
      <p className="muted">{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </section>
  );
}