"use client";

import { standData } from "@/data/exhibition-map/standData";
import { standLookup } from "@/lib/standLookup";
import { getStandColor } from "@/utils/getStandColor";
import type { Stand } from "@/types/stand";

import StandShape from "./StandShape";

interface StandLayerProps {
  setTooltip: React.Dispatch<
    React.SetStateAction<{
      stand: Stand | null;
      x: number;
      y: number;
    }>
  >;
}

export default function StandLayer({
  setTooltip,
}: StandLayerProps) {
  const stands: Stand[] = standData.map((stand) => ({
    ...stand,
    ...standLookup[stand.stand_no],
    category: stand.category,
  }));

  return (
    <>
      {stands.map((stand) => (
        <StandShape
          key={stand.stand_no}
          {...stand}
          fill={getStandColor(stand.category, stand.status)}
          onMouseEnter={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();

            setTooltip({
              stand,

              x: rect.left + rect.width / 2,

              y: rect.bottom + 12,
            });
          }}
          onMouseLeave={() => {
            setTooltip({
              stand: null,

              x: 0,

              y: 0,
            });
          }}
          onClick={(standNo) => console.log(standNo)}
        />
      ))}
    </>
  );
}
