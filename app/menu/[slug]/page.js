import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { formatBirr, getAllSlugs, getDish } from "@/lib/dishes";

// One static page per dish, generated at build time.
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Unknown slugs return 404 instead of being rendered on demand.
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dish = await getDish(slug);
  return { title: dish?.name ?? "Dish" };
}

export default async function DishPage({ params }) {
  const { slug } = await params;
  const dish = await getDish(slug);
  if (!dish) notFound();

  return (
    <article className="card">
      <Image
        src={dish.image}
        alt={dish.name}
        width={800}
        height={500}
        className="dish-img"
        priority
      />
      <h1>{dish.name}</h1>
      <p>{dish.category}</p>
      <p>{dish.description}</p>
      <p className="price">{formatBirr(dish.priceBirr)}</p>
      <AddToCartButton slug={dish.slug} />
    </article>
  );
}