import { useRouter } from "next/router";
import type { GetStaticProps, GetStaticPaths } from "next";
import { Place, Tag } from "../../types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "flowbite-react";

import PlaceCard from "../../components/PlaceCard";
import Footer from "../../components/Footer";

/*******************************************************************************
  Types
 ******************************************************************************/

type Props = {
  tag: Tag;
  places: Place[];
};

/*******************************************************************************
  Server-side
 ******************************************************************************/

// To statically generate all the tag listings pages, Nextjs needs to know the
// params to pass to each page. We load all the tags and return the slugs
// of each as params.
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.HOST}/api/tags`);
  const json = await response.json();
  const tags = json.tags;

  return {
    paths: tags.map((tag: Tag) => ({ params: { slug: tag.slug } })),
    fallback: true,
  };
};

// And for each page, where the tag slug is passed, we return alls the place
// objects for the matching places.
export const getStaticProps: GetStaticProps<Props> = async (props) => {
  const slug = String(props.params?.slug ?? "");

  const promises = [
    await fetch(`${process.env.HOST}/api/tags/${slug}`).then((r) => r.json()),
    await fetch(`${process.env.HOST}/api/places/by-tag/${slug}`).then((r) =>
      r.json()
    ),
  ];
  const responses = await Promise.all(promises);
  const [tag, placesResponse] = responses;
  const { places } = placesResponse;

  return { props: { tag, places } };
};

/*******************************************************************************
  Component
 ******************************************************************************/

export default function TagListing(props: Props) {
  const { tag, places } = props;

  // ----------------------------
  // Render:

  return (
    <section className="h-full flex flex-col">
      <header className="px-4 py-2">
        <Link href="/">
          <h1 className="text-3xl font-bold">Hitchin Hangouts</h1>
        </Link>
        <p className="text-md text-gray-500">
          Your guide to where to go in Hitchin
        </p>
      </header>
      <h2 className="m-4 mt-8 text-3xl font-bold">
        {tag.name} places in Hitchin
      </h2>
      <section className="flex-grow py-6">
        <div className="flex gap-4 items-center justify-center flex-wrap">
          {places.map((place) => (
            <Link key={place.slug} href={`/places/${place.slug}`}>
              <PlaceCard place={place} />
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </section>
  );
}
