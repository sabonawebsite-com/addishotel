import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <h2>Page not found</h2>
      <p>That page does not exist.</p>
      <Link href="/menu">Back to the menu</Link>
    </section>
  );
}