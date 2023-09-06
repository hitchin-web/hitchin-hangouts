import prisma from "../../../lib/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Place, NotFoundError } from "../../../types";
import { prismaPlaceToPlace } from "../../../lib/transforms";

/*******************************************************************************
  Handler
 ******************************************************************************/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Place | NotFoundError>
) {
  const slug = String(req.query.slug);
  const response = await prisma.place.findUnique({
    where: { slug },
    include: { tags: true, categories: true },
  });

  if (response == null) {
    res.status(404).json({ error: "not found" });
  } else {
    const place: Place = prismaPlaceToPlace(response);
    res.status(200).json(place);
  }
}
