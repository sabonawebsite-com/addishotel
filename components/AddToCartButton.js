"use client";

import { useTransition } from "react";
import { addToCart } from "@/app/actions";

export default function AddToCartButton({ slug }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      disabled={pending}
      onClick={() => startTransition(() => addToCart(slug))}
    >
      {pending ? "Adding…" : "Add to cart"}
    </button>
  );
}