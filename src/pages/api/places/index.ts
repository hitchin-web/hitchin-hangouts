import prisma from "../../../lib/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Place } from "../../../types";

/*******************************************************************************
  Types
 ******************************************************************************/

type Data = {
  places: Place[];
};

/*******************************************************************************
  Handler
 ******************************************************************************/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const places = await prisma.place.findMany({
    include: { tags: true, categories: true },
  });
  res.status(200).json({
    places: places.map((place) => ({
      ...place,
      longitude: place.longitude.toNumber(),
      latitude: place.latitude.toNumber(),
    })),
  });
}
