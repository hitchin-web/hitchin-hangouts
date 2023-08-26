import { PrismaClient } from "@prisma/client";
import { categories } from "./seeds/categories";
import { places } from "./seeds/places";
import { tags } from "./seeds/tags";

const prisma = new PrismaClient();

/**
 * Seeds the databaes with default data.
 */
async function main() {
  // Seed categories and tags
  const prerequisites = [
    ...categories.map((category) =>
      prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: category,
      })
    ),
    ...tags.map((tag) =>
      prisma.tag.upsert({
        where: { slug: tag.slug },
        update: {},
        create: tag,
      })
    ),
  ];
  await Promise.all(prerequisites);

  // Convert places from POJO to Prisma upsert
  const result = [
    places.map(async (place) =>
      prisma.place.upsert({
        where: { slug: place.slug },
        update: {},
        create: {
          ...place,
          categories: {
            connect: place.categories.map((category) => ({
              slug: category,
            })),
          },
          tags: {
            connect: place.tags.map((tag) => ({
              slug: tag,
            })),
          },
        },
      })
    ),
  ];

  await Promise.all(result);

  // Some feedback to the user
  console.log(result);
}

// Run seeds then safely close the database connection
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
