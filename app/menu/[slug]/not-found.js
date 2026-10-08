import Link from "next/link";

export default function DishNotFound() {
  return (
    <section>
      <h2>We do not serve that dish</h2>
      <Link href="/menu">See the full menu</Link>
    </section>
  );
}