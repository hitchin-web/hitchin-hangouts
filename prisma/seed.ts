import { PrismaClient } from '@prisma/client'
import { places } from './seeds/places'

const prisma = new PrismaClient()

/**
 * Seeds the databaes with default data.
 */
async function main() {
  // Convert places from POJO to Prisma upsert
  const result = places.map(async place => prisma.place.upsert({
    where: { slug: place.slug },
    update: {},
    create: {
      ...place,
      // Tags are a joined model, so need to connect or create by unique name
      tags: {
        connectOrCreate: place.tags.map(tag => ({
          where: { name: tag },
          create: { name: tag },
        })),
      }
    },
  }))

  await Promise.all(result)

  // Some feedback to the user
  console.log(result);
}

// Run seeds then safely close the database connection
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
