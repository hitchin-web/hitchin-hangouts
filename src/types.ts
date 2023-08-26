export type Tag = {
  slug: string;
  name: string;
};

export type Category = {
  slug: string;
  name: string;
};

export type Place = {
  slug: string;
  name: string;
  address: string;
  telephone: string | null;
  url: string | null;
  latitude: number | null;
  longitude: number | null;
  what3Words: string | null;
  imageUrl: string;
  openingTimes: string | null;
  categories: Category[];
  tags: Tag[];
};
