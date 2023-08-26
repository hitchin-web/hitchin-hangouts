import prisma from "../../../../lib/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Place } from "../../../../types";

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
  const slug = String(req.query.slug);
  const places = await prisma.place.findMany({
    where: { tags: { some: { slug } } },
    include: { tags: true, categories: true },
  });

  res.status(200).json({ places });
}
