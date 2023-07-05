export type Place = {
  id: string;
  slug: string;
  name: string;
  address: string;
  telephone: string | null;
  url: string | null;
  latitude: number | null;
  longitude: number | null;
  what3Words: string | null;
  imageUrl: string;
  tags: string[];
};
