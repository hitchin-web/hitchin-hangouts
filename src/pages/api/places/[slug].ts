import prisma from "../../../lib/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Place } from "../../../types";

/*******************************************************************************
  Handler
 ******************************************************************************/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Place | null>
) {
  const slug = String(req.query.slug);
  const result = await prisma.place.findUnique({
    where: { slug },
    include: { tags: true, categories: true },
  });

  const place: Place = {
    ...result,
    longitude: place.longitude.toNumber(),
    latitude: place.latitude.toNumber(),
  };

  res.status(200).json(place ?? null);
}
