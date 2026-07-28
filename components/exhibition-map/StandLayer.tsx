"use client";

import React, { memo, useMemo, type RefObject } from "react";

import { standData } from "@/data/exhibition-map/standData";
import { standManagementData } from "@/data/dashboard/standManagementData";
import { getStandColor } from "@/utils/getStandColor";
import { truncateWords } from "@/lib/utils";
import type { Stand, ApiStand } from "@/types/stand";
import type { TooltipHandle } from "./StandTooltip";

import StandShape from "./StandShape";

interface StandLayerProps {
  /** Ref to the always-mounted StandTooltip — updated imperatively, no setState. */
  tooltipRef: RefObject<TooltipHandle | null>;
  /** Stands from the API (live availability, pricing, etc.). Falls back to hardcoded data when not provided. */
  apiStands?: ApiStand[];
}

/**
 * StandLayer — memoized.
 *
 * When `apiStands` is provided, merges the hardcoded SVG position data (standData)
 * with live API data by matching standData.categorySlug ⟷ api.categorySlug and
 * standData.stand_no ⟷ api.standNumber.
 * When `apiStands` is NOT provided (dashboard usage), falls back to the old
 * hardcoded standManagementData merged via standLookup.
 */
const StandLayer = memo(function StandLayer({
  tooltipRef,
  apiStands,
}: StandLayerProps) {
  // ── Build merged stands ────────────────────────────────────────────────
  const stands = useMemo<Stand[]>(() => {
    if (apiStands) {
      // ── API mode: merge with standData positions ────────────────────────
      const apiLookup = Object.fromEntries(
        apiStands.map((s) => [s.standNumber, s]),
      );

      return standData
        .map((sd) => {
          const api = apiLookup[sd.stand_no];
          if (!api) return null;

          // Use the category from standData (for StandShape SVG rendering)
          const category = sd.category;

          return {
            ...sd,
            stand_no: sd.stand_no,
            id: api.id,
            category,
            standType: truncateWords(api.categoryTitle, 2),
            size: api.size,
            price: api.totalPrice,
            isAvailable: api.isAvailable,
            title: api.title,
            categorySlug: api.categorySlug,
            exhibitor: null as string | null,
          } as Stand;
        })
        .filter((s): s is Stand => s !== null);
    }

    // ── Fallback: hardcoded mode (dashboard page) ───────────────────────────
    const hardcodedLookup = Object.fromEntries(
      standManagementData.map((s) => [s.standNo, s]),
    );

    return standData
      .map((sd) => {
        const hc = hardcodedLookup[sd.stand_no];
        if (!hc) return null;

        return {
          ...sd,
          stand_no: sd.stand_no,
          category: sd.category,
          standType: hc.standType,
          size: hc.size,
          price: hc.price,
          isAvailable: hc.status === "Available",
          title: `Stand ${sd.stand_no}`,
          categorySlug: hc.standType.toLowerCase().replace(/\s+/g, "-"),
          exhibitor: hc.exhibitor,
        } as Stand;
      })
      .filter((s): s is Stand => s !== null);
  }, [apiStands]);

  // ── Stable per-stand onMouseEnter handlers (desktop hover preview) ────────
  const enterHandlers = useMemo(
    () =>
      new Map(
        stands.map((stand) => [
          stand.stand_no,
          (e: React.MouseEvent<SVGGElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            tooltipRef.current?.show(
              stand,
              rect.left + rect.width / 2,
              rect.bottom + 12,
            );
          },
        ]),
      ),
    [stands, tooltipRef],
  );

  // ── Stable per-stand onTap handlers (click + touch via pointer events) ────
  const tapHandlers = useMemo(
    () =>
      new Map(
        stands.map((stand) => [
          stand.stand_no,
          (rect: DOMRect) => {
            tooltipRef.current?.show(
              stand,
              rect.left + rect.width / 2,
              rect.bottom + 12,
            );
          },
        ]),
      ),
    [stands, tooltipRef],
  );

  return (
    <>
      {stands.map((stand) => (
        <StandShape
          key={stand.stand_no}
          {...stand}
          fill={getStandColor(stand.category, stand.isAvailable)}
          onMouseEnter={enterHandlers.get(stand.stand_no)}
          onTap={tapHandlers.get(stand.stand_no)}
        />
      ))}
    </>
  );
});

export default StandLayer;