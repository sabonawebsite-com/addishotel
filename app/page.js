import Link from "next/link";

export default function HomePage() {
  return (
    <section>
      <h1>Welcome to Addis Eats</h1>
      <p>Doro wat, kitfo, shiro and more, straight to your door.</p>
      <Link href="/menu">
        <button>Browse the menu</button>
      </Link>
    </section>
  );
}