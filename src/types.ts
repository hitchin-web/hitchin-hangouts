import { Prisma, Place as PrismaPlace } from "@prisma/client";

export type { Tag, Category } from "@prisma/client";

export type Place = Omit<PrismaPlace, "latitude" | "longitude"> & {
  latitude: number | null;
  longitude: number | null;
};

export type NotFoundError = {
  error: "not found";
};
