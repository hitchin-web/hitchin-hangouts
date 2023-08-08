import { Prisma, PrismaClient } from '@prisma/client';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import type { Place } from "../../types";

const prisma = new PrismaClient();

type Data = {
  places: Place[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const places = await prisma.place.findMany({ include: { tags: true } });
  res.status(200).json({
    places: places.map(place => ({
      ...place,
      longitude: place.longitude.toNumber(),
      latitude: place.latitude.toNumber(),
      tags: place.tags.map(tag => tag.name),
    }))
  });
}
