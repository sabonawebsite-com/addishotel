import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, formatBirr, getDishes, slugify } from "@/lib/dishes";

// Async Server Component: awaits slow data. Wrapped in <Suspense> by its parent.
export default async function DishList() {
  const dishes = await getDishes();

  return (
    <>
      {CATEGORIES.map((category) => (
        <section key={category} id={slugify(category)}>
          <h2>{category}</h2>
          <div className="grid">
            {dishes
              .filter((d) => d.category === category)
              .map((d) => (
                <Link key={d.slug} href={`/menu/${d.slug}`} className="card">
                  <Image
                    src={d.image}
                    alt={d.name}
                    width={400}
                    height={260}
                    className="dish-img"
                  />
                  <h3>{d.name}</h3>
                  <p>{d.description}</p>
                  <span className="price">{formatBirr(d.priceBirr)}</span>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </>
  );
}

export function DishListSkeleton() {
  return (
    <div className="grid" aria-busy="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="skeleton" />
      ))}
    </div>
  );
}