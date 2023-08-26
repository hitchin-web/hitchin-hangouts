import prisma from "../../lib/prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

import { Category } from "../../types";

/*******************************************************************************
  Types
 ******************************************************************************/

type Data = {
  categories: Category[];
};

/*******************************************************************************
  Handler
 ******************************************************************************/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const categories = await prisma.category.findMany();
  res.status(200).json({ categories });
}
