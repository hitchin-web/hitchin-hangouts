import prisma from "../../../lib/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

import { Tag } from "../../../types";

/*******************************************************************************
  Types
 ******************************************************************************/

type Data = {
  tags: Tag[];
};

/*******************************************************************************
  Handler
 ******************************************************************************/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tags = await prisma.tag.findMany();
  res.status(200).json({ tags });
}
