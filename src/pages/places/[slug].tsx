import { useRouter } from "next/router";
import type { GetStaticProps, GetStaticPaths } from "next";
import { Place, Tag } from "../../types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "flowbite-react";

import Footer from "../../components/Footer";

const ZOOM_FACTOR = 0.0002;

/*******************************************************************************
  Types
 ******************************************************************************/

type Props = {
  place: Place;
};

/*******************************************************************************
  Server-side
 ******************************************************************************/

// To statically generate all the details pages, Nextjs needs to know the
// params to pass to each variant. We load all the places and return the slugs
// of each as params.
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.HOST}/api/places`);
  const json = await response.json();
  const places = json.places;

  return {
    paths: places.map((place: Place) => ({ params: { slug: place.slug } })),
    fallback: false,
  };
};

// And for each page, where the slug is passed, we return the place object.
export const getStaticProps: GetStaticProps<Props> = async (props) => {
  const slug = String(props.params?.slug ?? "");

  const response = await fetch(`${process.env.HOST}/api/places/${slug}`);
  const place = await response.json();

  if (place == null) {
    return { notFound: true };
  }

  return { props: { place } };
};

/*******************************************************************************
  Component
 ******************************************************************************/

export default function Place(props: Props) {
  const { place } = props;

  const latitude = place.latitude == null ? null : Number(place.latitude);
  const longitude = place.longitude == null ? null : Number(place.longitude);

  // ----------------------------
  // Render:

  return (
    <section className="min-h-full flex flex-col">
      <header>
        {latitude != null && longitude != null && (
          <iframe
            title="Map"
            className="w-full h-72"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            width="100%"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${
              latitude - ZOOM_FACTOR
            }%2C${longitude - ZOOM_FACTOR * 5}%2C${latitude + ZOOM_FACTOR}%2C${
              longitude + ZOOM_FACTOR
            }&layer=hot&marker=${longitude}%2C${latitude}`}
            loading="lazy"
          ></iframe>
        )}
        {latitude == null ||
          (longitude == null && <div className="w-full h-64 bg-gray-200" />)}
        <Image
          src={place.imageUrl}
          width={200}
          height={200}
          alt={place.name}
          className="mx-auto rounded-full w-48 h-48 object-cover -mt-24 relative border-8 border-white"
        />
        <h1 className="m-2 text-4xl font-bold text-center">{place.name}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-center">
          {place.address}
        </p>
      </header>
      <section className="max-w-md flex-grow py-12 mx-auto">
        <div className="flex flex-wrap gap-2">
          {/* @ts-ignore: Not sure why it thinks there's no tags property on place 🤷 */}
          {place.tags.map((tag: Tag) => (
            <Link key={tag.id} href={`/tags/${tag.slug}`}>
              <Badge color="gray">{tag.name}</Badge>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </section>
  );
}
