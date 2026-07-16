"use client";

import React, { memo, useMemo, type RefObject } from "react";

import { standData } from "@/data/exhibition-map/standData";
import { standLookup } from "@/lib/standLookup";
import { getStandColor } from "@/utils/getStandColor";
import type { Stand } from "@/types/stand";
import type { TooltipHandle } from "./StandTooltip";

import StandShape from "./StandShape";

interface StandLayerProps {
  /** Ref to the always-mounted StandTooltip — updated imperatively, no setState. */
  tooltipRef: RefObject<TooltipHandle | null>;
}

/**
 * StandLayer — memoized.
 *
 * Accepts a stable `tooltipRef` (a React ref, not a value), so this component
 * will never re-render from a parent state change. All child handlers are
 * built once via useMemo so StandShape's React.memo bailout is 100% effective.
 *
 * Merged stand data is computed once via useMemo (both source arrays are
 * static module-level constants, so the dep array is empty).
 *
 * Tooltip lifecycle:
 * - onMouseEnter → show  (desktop hover preview)
 * - onTap        → show  (click / tap on any device via pointer events)
 * - close        → only via outside-click (so Book Now button is reachable)
 */
const StandLayer = memo(function StandLayer({ tooltipRef }: StandLayerProps) {
  // ── Merge layout data with management data once ──────────────────────────
  const stands: Stand[] = useMemo(
    () =>
      standData.map((stand) => ({
        ...stand,
        ...standLookup[stand.stand_no],
        category: stand.category,
      })),
    [] // static imports never change
  );

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
              rect.bottom + 12
            );
          },
        ])
      ),
    [stands, tooltipRef]
  );

  // ── Stable per-stand onTap handlers (click + touch via pointer events) ────
  // Always calls show() — outside click is the universal close mechanism.
  // No onMouseLeave close, so the tooltip stays open when the pointer moves
  // toward the tooltip to click the "Book Now" button.
  const tapHandlers = useMemo(
    () =>
      new Map(
        stands.map((stand) => [
          stand.stand_no,
          (rect: DOMRect) => {
            tooltipRef.current?.show(
              stand,
              rect.left + rect.width / 2,
              rect.bottom + 12
            );
          },
        ])
      ),
    [stands, tooltipRef]
  );

  return (
    <>
      {stands.map((stand) => (
        <StandShape
          key={stand.stand_no}
          {...stand}
          fill={getStandColor(stand.category, stand.status)}
          onMouseEnter={enterHandlers.get(stand.stand_no)}
          onTap={tapHandlers.get(stand.stand_no)}
        />
      ))}
    </>
  );
});

export default StandLayer;
