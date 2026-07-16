"use client";

import { standData } from "@/data/exhibition-map/standData";
import StandShape from "./StandShape";
import { standLookup } from "@/lib/standLookup";
import { getStandColor } from "@/utils/getStandColor";

export default function StandLayer() {
  const stands = standData.map((stand) => ({
    ...stand,
    ...standLookup[stand.stand_no],
    category: stand.category,
  }));
  return (
    <>
      {stands.map((stand) => (
        <StandShape
          onClick={(id) => console.log(id)}
          key={stand.stand_no}
          {...stand}
          fill={getStandColor(stand.category, stand.status)}
        />
      ))}
    </>
  );
}
