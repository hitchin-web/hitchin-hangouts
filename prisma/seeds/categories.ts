/**
 * A "Plain Old Javascript Object" type to represent a category without the need
 * for a Prisma model.
 */
export type PlainCategory = {
  slug: string;
  name: string;
};

/**
 * A list of Categories to be seeded into the database.
 */
export const categories: PlainCategory[] = [
  { slug: "coffee-shop", name: "Coffee shop" },
  { slug: "pub", name: "Pub" },
  { slug: "restaurant", name: "Restaurant" },
];
