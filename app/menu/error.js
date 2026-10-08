"use client";

export default function MenuError({ error, reset }) {
  return (
    <section>
      <h2>The menu could not be loaded</h2>
      <p className="muted">{error.message}</p>
      <button onClick={() => reset()}>Retry</button>
    </section>
  );
}