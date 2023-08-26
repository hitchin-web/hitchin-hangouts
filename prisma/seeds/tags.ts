/**
 * A "Plain Old Javascript Object" type to represent a tag without the need
 * for a Prisma model.
 */
export type PlainTag = {
  slug: string;
  name: string;
};

/**
 * A list of Tags to be seeded into the database.
 */
export const tags: PlainTag[] = [
  { slug: "beer", name: "Beer" },
  { slug: "burgers", name: "Burgers" },
  { slug: "cake", name: "Cake" },
  { slug: "charging", name: "Charging" },
  { slug: "coffee", name: "Coffee" },
  { slug: "dog-friendly", name: "Dog-friendly" },
  { slug: "laptop-friendly", name: "Laptop-friendly" },
  { slug: "pizza", name: "Pizza" },
  { slug: "pub grub", name: "Pub grub" },
  { slug: "vegan-friendly", name: "Vegan-friendly" },
  { slug: "wifi", name: "Wifi" },
];
