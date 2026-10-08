import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { formatBirr } from "@/lib/dishes";

export default function FoodCard({ food }) {
  return (
    <article className="card">
      <Link href={`/menu/${food.slug}`}>
        <Image
          src={food.image}
          alt={food.name}
          width={400}
          height={260}
          className="dish-img"
        />
      </Link>
      <h3>{food.name}</h3>
      <p>{food.description}</p>
      <p className="price">{formatBirr(food.priceBirr)}</p>
      <AddToCartButton slug={food.slug} />
    </article>
  );
}
