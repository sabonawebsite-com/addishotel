import { Suspense } from "react";
import DishList, { DishListSkeleton } from "@/components/DishList";

// ISR: dishes and prices change a few times a day, not per request.
// 5 minutes keeps the menu fresh while serving it from the cache.
// The route stays static (○ / ISR) in the build output.
export const revalidate = 300;

export const metadata = { title: "Menu" };

export default function MenuPage() {
  return (
    <>
      <h1>Menu</h1>
      {/* Sidebar (in layout) paints immediately; the dish list streams in. */}
      <Suspense fallback={<DishListSkeleton />}>
        <DishList />
      </Suspense>
    </>
  );
}