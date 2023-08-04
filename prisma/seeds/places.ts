/**
 * A "Plain Old Javascript Object" type to represent a place without the need
 * for a Prisma model.
 */
export type PlainPlace = {
  slug: string,
  name: string,
  address: string,
  telephone?: string,
  url?: string,
  latitude: number,
  longitude: number,
  what3Words?: string,
  imageUrl: string,
  tags: string[],
}

/**
 * A list of Places to be seeded into the database.
 */
export const places: PlainPlace[] = [
  {
    slug: 'hitchin-coffee-lab',
    name: 'Hitchin Coffee Lab',
    address: "29 Sun Street",
    latitude: 51.946891735289995,
    longitude: -0.27872891608801553,
    what3Words: "",
    imageUrl: "https://ents24.imgix.net/image/000/287/826/3ec4c55a1abe70fd7894fdd622153a3068169059.jpg?auto=format&crop=edges&w=1200&h=630",
    tags: [
      'coffee',
      'cake',
      'vegan',
      'wifi',
      'dog-friendly',
      'laptop-friendly',
      'charging',
    ],
  },
  {
    slug: 'coopers-arms',
    name: 'Coopers Arms',
    address: "81 Tilehouse Street",
    latitude: 51.94699036916356,
    longitude: -0.28116041608801745,
    what3Words: "",
    imageUrl: "https://whatpub-new.s3.eu-west-1.amazonaws.com/images/pubs/800x600%402x/HEN-419-1314-coopers-arms-hitchin.jpg",
    tags: [
      'beer',
      'pub-grub',
      'wifi',
      'dog-friendly',
      'laptop-friendly',
      'charging',
    ],
  },
  {
    slug: 'the-victoris',
    name: 'The Victoria',
    address: "1 Ickleford Road",
    latitude: 51.95375615156744,
    longitude: -0.27537061608765967,
    what3Words: "",
    imageUrl: "https://www.thevictoriahitchin.com/perch/resources/vic-exterior-7-w400h400.jpg",
    tags: [
      'beer',
      'pizza',
      'burgers',
      'wifi',
      'dog-friendly',
      'laptop-friendly',
      'charging',
    ],
  },
]
