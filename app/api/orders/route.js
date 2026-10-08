import { NextResponse } from "next/server";
import { createOrder } from "@/lib/orders";
import { fieldErrors, orderSchema } from "@/lib/schema";
import { canOrder, getSession } from "@/lib/session";

// POST /api/orders: reads the session cookie, so it is always dynamic (ƒ).
export async function POST(request) {
  const session = await getSession();
  if (!canOrder(session)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body must be valid JSON" }, { status: 400 });
  }

  const parsed = orderSchema.safeParse(body); // same schema as the server action
  if (!parsed.success) {
    return NextResponse.json({ errors: fieldErrors(parsed.error) }, { status: 400 });
  }

  const result = await createOrder(parsed.data, session.name);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 422 });

  return NextResponse.json(result.order, { status: 201 });
}