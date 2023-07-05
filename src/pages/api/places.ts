// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    places: [
      {
        name: "Hitchin Coffee Lab",
        address: "29 Sun Street",
        telephone: null,
        url: null,
        latitude: null,
        longitude: null,
        what3Words: "",
        imageUrl:
          "https://ents24.imgix.net/image/000/287/826/3ec4c55a1abe70fd7894fdd622153a3068169059.jpg?auto=format&crop=edges&w=1200&h=630",
        tags: [
          "coffee",
          "cake",
          "vegan",
          "wifi",
          "dog-friendly",
          "laptop-friendly",
          "charging",
        ],
      },
    ],
  });
}
