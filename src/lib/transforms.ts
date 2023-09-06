import { Place as PrismaPlace } from "@prisma/client";
import { Place } from "../types";

// Transform a place object from the database into a place object used
// on the site.
export function prismaPlaceToPlace(place: PrismaPlace): Place {
  const { latitude, longitude, ...rest } = place ?? {};
  return {
    ...rest,
    longitude: longitude?.toNumber() ?? null,
    latitude: latitude?.toNumber() ?? null,
  };
}
