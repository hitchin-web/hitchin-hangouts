import prisma from "../../../lib/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

import { Tag } from "../../../types";

/*******************************************************************************
  Handler
 ******************************************************************************/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Tag>
) {
  const slug = String(req.query.slug);
  const tag = await prisma.tag.findUnique({ where: { slug } });
  res.status(200).json(tag);
}
