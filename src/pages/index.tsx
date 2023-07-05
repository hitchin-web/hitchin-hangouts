import Image from "next/image";
import type { GetStaticProps } from "next";

import { Place } from "../types";

type Props = {
  places: Place[];
};

export const getStaticProps: GetStaticProps<{
  places: Place[];
}> = async () => {
  const res = await fetch(`${process.env.HOST}/api/places`);
  const json = await res.json();
  const places = json.places;
  return { props: { places } };
};

export default function Home(props: Props) {
  const { places } = props;

  console.log(">>", places);
  return (
    <div className="h-full">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-0 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Hitchin Hangouts
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Your friendly guide to hanging out in Hitchin
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 p-6 flex-wrap">
        {places.map((place) => (
          <div key={place.slug} className="group relative max-w-xs">
            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
              <img
                src={place.imageUrl}
                alt={place.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <h3 className="mt-6 text-base font-semibold text-gray-900">
              <a href={`/places/${place.slug}`}>
                <span className="absolute inset-0" />
                {place.name}
              </a>
            </h3>
            <p className="text-sm text-gray-500">{place.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
