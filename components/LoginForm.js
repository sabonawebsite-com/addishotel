"use client";

import { useActionState } from "react";
import { login } from "@/app/actions";

const initialState = { ok: false };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="form">
      <label>
        Name
        <input name="name" required />
      </label>
      {state.errors?.name && <p className="error">{state.errors.name}</p>}

      <label>
        Password
        <input name="password" type="password" required />
      </label>
      {state.errors?.password && <p className="error">{state.errors.password}</p>}

      <button disabled={pending}>{pending ? "Logging in…" : "Log in"}</button>
      {state.message && <p className="error">{state.message}</p>}
    </form>
  );
}