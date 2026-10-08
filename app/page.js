import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <span className="eyebrow">Fresh Ethiopian flavours</span>
        <h1>Authentic dishes, delivered with a warm Addis touch.</h1>
        <p>
          Enjoy slow-cooked doro wat, rich shiro, juicy kitfo, and fresh injera
          made for cozy meals and unforgettable evenings.
        </p>

        <div className="hero-actions">
          <Link href="/menu" className="primary-btn">
            Browse the menu
          </Link>
          <Link href="/checkout" className="secondary-btn">
            View cart
          </Link>
        </div>

        <div className="hero-highlights">
          <div>
            <strong>12k+</strong>
            <span>happy meals</span>
          </div>
          <div>
            <strong>15 min</strong>
            <span>average delivery</span>
          </div>
          <div>
            <strong>4.9/5</strong>
            <span>customer rating</span>
          </div>
        </div>
      </div>

      <div className="hero-visual" aria-label="Featured Addis Eats food images">
        <div className="hero-image-card main-card">
          <Image
            src="/images/header_img.png"
            alt="Ethiopian platter and drinks"
            width={700}
            height={700}
            priority
          />
        </div>

        <div className="floating-badge badge-top">
          <Image src="/images/food_4.png" alt="Doro Wat" width={80} height={80} />
          <div>
            <strong>Doro Wat</strong>
            <span>Spiced & comforting</span>
          </div>
        </div>

        <div className="floating-badge badge-bottom">
          <Image src="/images/food_2.png" alt="Coffee" width={70} height={70} />
          <div>
            <strong>Ethiopian Coffee</strong>
            <span>Freshly roasted</span>
          </div>
        </div>
      </div>
    </section>
  );
}