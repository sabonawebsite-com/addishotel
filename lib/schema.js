import { z } from "zod";

// ONE schema shared by the server action AND the route handler.
export const orderSchema = z.object({
  address: z.string().trim().min(5, "Address must be at least 5 characters"),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+251|0)9\d{8}$/, "Enter a valid Ethiopian mobile number"),
  items: z.array(z.string().min(1)).min(1, "Your cart is empty"),
});

export const loginSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  password: z.string().min(1, "Password is required"),
});

// Turns a ZodError into { fieldName: "first message" }.
export function fieldErrors(error) {
  const out = {};
  for (const issue of error.issues) {
    const key = issue.path[0] ?? "form";
    out[key] ??= issue.message;
  }
  return out;
}