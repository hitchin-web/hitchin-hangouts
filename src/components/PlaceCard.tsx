import { Place } from "../types";

import { Card } from "flowbite-react";

/*******************************************************************************
  Types
 ******************************************************************************/

type Props = {
  place: Place;
};

/*******************************************************************************
  Component
 ******************************************************************************/

export default function PlaceCard(props: Props) {
  const { place } = props;

  // ----------------------------
  // Render:

  return (
    <Card imgAlt={place.name} imgSrc={place.imageUrl} className="w-96">
      <main>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
          {place.name}
        </h5>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {place.address} • Open today until 5pm
        </p>
      </main>
    </Card>
  );
}
