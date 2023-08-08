# Database

The data is stored in [PostgreSQL]. The code interacts with the database via an ORM
(Object Relational Mapper) called [Prisma]. Prisma also handles schema migrations
and seeding.

## Local Development

For local development an instance of PostgreSQL is run in [Docker] with [Adminer]
for database management. Docker containers are run using [Docker Compose][compose].
See the [README Getting Started](README.md#getting-started) section for instructions
to start your development environment.

## Models

Models all live in [/prisma/schema.prisma](/prisma/schema.prisma). They are created
as Prisma Models which are then converted into Migrations and a set of TypeScript
types are generated.

To generate a migration:

```bash
npx prisma migrate dev --name [your_change]
```

Replace `[your_change]` with a simple name describing your change.

This will generate a new migration in [/prisma/migrations/](/prisma/migrations/),
run that migration and generate the types.

## Seeds

Seeds populate the database with default information for the application to work.
For the time being these include some example places to be used in development.

Individual seeds are in [/prisma/seeds/](/prisma/seeds/) and there is a main runner
[/prisma/seed.ts](/prisma/seed.ts) which reads the data from the seeds directory
and inserts it into the database.

[PostgreSQL]: <https://www.postgresql.org/> "The World's Most Advanced Open Source Relational Database"
[Prisma]: <https://prisma.io> "Next-generation Node.js and TypeScript ORM"
[Docker]: <https://www.docker.com/> ""
[compose]: <https://docs.docker.com/compose/> "A tool for defining and running multi-container Docker applications"
[Adminer]: <https://www.adminer.org/> "Database management in a single PHP file"