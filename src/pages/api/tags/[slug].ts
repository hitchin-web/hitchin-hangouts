import prisma from "../../../lib/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

import { Tag, NotFoundError } from "../../../types";

/*******************************************************************************
  Handler
 ******************************************************************************/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Tag | NotFoundError>
) {
  const slug = String(req.query.slug);
  const tag = await prisma.tag.findUnique({ where: { slug } });

  if (tag == null) {
    res.status(404).json({ error: "not found" });
  } else {
    res.status(200).json(tag);
  }
}
