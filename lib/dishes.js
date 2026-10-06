export const CATEGORIES = [
  "Breakfast",
  "Platters",
  "Sides",
  "Drinks",
];

const DISHES = [
  {
    slug: "doro-wat",
    name: "Doro Wat",
    category: "Breakfast",
    priceBirr: 420,
    description: "A rich chicken stew simmered with berbere, onions, and warm Ethiopian spices.",
    image: "/images/food_4.png",
  },
  {
    slug: "kitfo",
    name: "Kitfo",
    category: "Breakfast",
    priceBirr: 390,
    description: "Lean beef tartare served with mitmita, ayib, and injera for a classic start.",
    image: "/images/food_3.png",
  },
  {
    slug: "shiro",
    name: "Shiro",
    category: "Platters",
    priceBirr: 280,
    description: "Creamy chickpea stew with fragrant herbs, onion, and a gentle spice finish.",
    image: "/images/food_1.png",
  },
  {
    slug: "tibs",
    name: "Beef Tibs",
    category: "Platters",
    priceBirr: 460,
    description: "Sautéed strips of beef with peppers, onions, and a smoky Ethiopian seasoning.",
    image: "/images/food_5.png",
  },
  {
    slug: "injera-bread",
    name: "Fresh Injera",
    category: "Sides",
    priceBirr: 120,
    description: "Soft, spongy sourdough flatbread made fresh for every order.",
    image: "/images/food_6.png",
  },
  {
    slug: "teff-salad",
    name: "Teff Salad",
    category: "Sides",
    priceBirr: 170,
    description: "A crisp salad with greens, tomato, onion, and a zesty lemon dressing.",
    image: "/images/food_7.png",
  },
  {
    slug: "tej",
    name: "Tej",
    category: "Drinks",
    priceBirr: 180,
    description: "Traditional honey wine with a floral aroma and warm, sweet finish.",
    image: "/images/food_8.png",
  },
  {
    slug: "coffee",
    name: "Ethiopian Coffee",
    category: "Drinks",
    priceBirr: 150,
    description: "Slow-roasted coffee brewed fresh and served with a hint of cardamom.",
    image: "/images/food_2.png",
  },
];

export async function getDishes() {
  return DISHES;
}

export function getDish(slug) {
  return DISHES.find((dish) => dish.slug === slug) ?? null;
}

export function getAllSlugs() {
  return DISHES.map((dish) => dish.slug);
}

export function formatBirr(value) {
  return `ETB ${Number(value).toLocaleString("en-ET")}`;
}

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
