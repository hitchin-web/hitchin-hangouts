import { useState, useMemo } from "react";
import Link from "next/link";
import type { GetStaticProps } from "next";
import { Place, Category, Tag } from "../types";
import Head from "next/head";
import { Button } from "flowbite-react";

import PlaceCard from "../components/PlaceCard";
import Footer from "../components/Footer";
import prisma from "../lib/prismaClient";
import { prismaPlaceToPlace } from "../lib/transforms";

/*******************************************************************************
  Types
 ******************************************************************************/

type Props = {
  places: Place[];
  categories: Category[];
  tags: Tag[];
};

/*******************************************************************************
  Server-side
 ******************************************************************************/

export const getStaticProps: GetStaticProps<{
  places: Place[];
  categories: string[];
  tags: string[];
}> = async () => {

  const promises = [
    prisma.place.findMany({
      include: { tags: true, categories: true },
    }).then(res => res.map(prismaPlaceToPlace)),
    prisma.category.findMany(),
    prisma.tag.findMany()
  ];
  const responses = Object.assign({}, ...(await Promise.all(promises)));
  const { places, categories, tags } = responses;
  return { props: { places, categories, tags } };
};

/*******************************************************************************
  Component
 ******************************************************************************/

export default function Home(props: Props) {
  const { places, categories, tags } = props;

  // ----------------------------
  // State:

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  // ----------------------------
  // Effects:

  const filteredPlaces = useMemo(() => {
    return places.filter((place: Place) => {
      // @ts-ignore: Not sure why it thinks there's no categories property on place 🤷
      const placeCategorySlugs = place.categories.map(
        (category: Category) => category.slug
      );

      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.some((category: Category) =>
          placeCategorySlugs.includes(category.slug)
        );

      if (!categoryMatch) {
        return false;
      }

      // @ts-ignore: Not sure why it thinks there's no tags property on place 🤷
      const placeTagSlugs = place.tags.map((tag: Tag) => tag.slug);
      const tagMatch =
        selectedTags.length === 0 ||
        selectedTags.every((tag: Tag) => placeTagSlugs.includes(tag.slug));

      return tagMatch;
    });
  }, [places, selectedCategories, selectedTags]);

  // ----------------------------
  // Event handlers:

  const onToggleCategory = (category: Category) => {
    setSelectedCategories((existing) => {
      const isSelected = existing.includes(category);
      if (isSelected) {
        return existing.filter((item) => item !== category);
      }
      return [...existing, category];
    });
  };

  const onToggleTag = (tag: Tag) => {
    setSelectedTags((existing) => {
      const isSelected = existing.includes(tag);
      if (isSelected) {
        return existing.filter((item) => item !== tag);
      }
      return [...existing, tag];
    });
  };

  // ----------------------------
  // Render:

  return (
    <section className="h-full flex flex-col">
      <header className="px-4 py-2">
        <h1 className="text-3xl font-bold">Hitchin Hangouts</h1>
        <p className="text-md text-gray-500">
          Your guide to where to go in Hitchin
        </p>
      </header>
      <section>
        <fieldset className="flex flex-wrap gap-2 items-center justify-center my-12">
          <legend className="text-xl font-bold text-center relative -top-4">
            What would you like to discover?
          </legend>
          {categories.map((category) => (
            <Button
              key={category.slug}
              aria-checked={selectedCategories.includes(category)}
              gradientDuoTone="pinkToOrange"
              outline={!selectedCategories.includes(category)}
              onClick={() => onToggleCategory(category)}
            >
              {category.name}
            </Button>
          ))}
        </fieldset>
        <fieldset className="flex flex-wrap gap-2 items-center justify-center my-12">
          <legend className="text-xl font-bold text-center relative -top-4">
            ...and what whould you like to find?
          </legend>
          {tags.map((tag) => (
            <Button
              key={tag.slug}
              aria-checked={selectedTags.includes(tag)}
              gradientDuoTone="pinkToOrange"
              outline={!selectedTags.includes(tag)}
              onClick={() => onToggleTag(tag)}
            >
              {tag.name}
            </Button>
          ))}
        </fieldset>
      </section>
      <section className="py-6 flex-grow">
        <div className="flex gap-4 items-center justify-center flex-wrap">
          {filteredPlaces.map((place) => (
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
