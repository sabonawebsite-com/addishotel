"use client";

export default function RootError({ error, reset }) {
  return (
    <section>
      <h2>Something went wrong</h2>
      <p className="muted">{error?.message ?? "An unexpected error occurred."}</p>
      <button onClick={() => reset?.()}>Try again</button>
    </section>
  );
}