import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/">
        <strong>🍲 Addis Eats</strong>
      </Link>
      <nav>
        <Link href="/menu">Menu</Link>
        <Link href="/checkout">Checkout</Link>
      </nav>
    </header>
  );
}