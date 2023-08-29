/**
 * A "Plain Old Javascript Object" type to represent a place without the need
 * for a Prisma model.
 */
export type PlainPlace = {
  slug: string;
  name: string;
  address: string;
  telephone?: string;
  url?: string;
  latitude: number;
  longitude: number;
  what3Words?: string;
  openingTimes?: string;
  imageUrl: string;
  categories: string[];
  tags: string[];
};

/**
 * A list of Places to be seeded into the database.
 */
export const places: PlainPlace[] = [
  {
    slug: "hitchin-coffee-lab",
    name: "Hitchin Coffee Lab",
    address: "29 Sun Street",
    latitude: -0.27872891608801553,
    longitude: 51.946891735289995,
    what3Words: "thus.cone.renew",
    openingTimes: "Mo–Su:0900–1700",
    imageUrl: "/images/coffee-lab.jpg",
    categories: ["coffee-shop"],
    tags: [
      "coffee",
      "cake",
      "vegan-friendly",
      "wifi",
      "dog-friendly",
      "laptop-friendly",
      "charging",
    ],
  },
  {
    slug: "coopers-arms",
    name: "Coopers Arms",
    address: "81 Tilehouse Street",
    latitude: -0.28116041608801745,
    longitude: 51.94699036916356,
    what3Words: "editor.quiz.kinks",
    imageUrl: "/images/coopers-arms.jpg",
    categories: ["pub"],
    tags: [
      "beer",
      "pub-grub",
      "vegan-friendly",
      "dog-friendly",
      "laptop-friendly",
    ],
  },
  {
    slug: "the-victoria",
    name: "The Victoria",
    address: "1 Ickleford Road",
    latitude: -0.27537061608765967,
    longitude: 51.95375615156744,
    what3Words: "port.pilots.data",
    imageUrl: "/images/the-victoria.jpg",
    categories: ["pub", "restaurant"],
    tags: ["beer", "pizza", "burgers", "wifi", "dog-friendly"],
  },
];
