import { useRouter } from 'next/router'
import type { GetStaticProps, GetStaticPaths } from "next";
import { Place } from "../../types";

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.HOST}/api/places`);
  const json = await res.json();
  const places = json.places;

  return {
    paths: places.map((place: Place) => ({ params: { slug: place.slug }})),
    fallback: true, // false or "blocking"
  }
}

export const getStaticProps: GetStaticProps<{
  place: Place
}> = async (props) => {
  console.log('>>>getStaticProps', props)

  const res = await fetch(`${process.env.HOST}/api/places`);
  const json = await res.json();
  const place = json.places.find((place: Place) => place.slug === props.params?.slug)

  if (place == null) {
    return { notFound: true };
  }

  return { props: { place } };
};


export default function Place(props: {places: Place[]}) {
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <h1>Hitchin Hangouts</h1>
      
    </main>
  );
}
