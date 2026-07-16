"use client";

import React, { memo, useRef } from "react";

interface StandShapeProps {
  onMouseEnter?: (e: React.MouseEvent<SVGGElement>) => void;
  /** Fires when the element is tapped/clicked with minimal movement (< 8px).
   *  Works on both mouse and touch, even inside react-zoom-pan-pinch.
   *  The caller receives the element's DOMRect for tooltip positioning. */
  onTap?: (rect: DOMRect) => void;
  stand_no: string;
  category:
    | "goff-standard"
    | "goff-premium-1"
    | "goff-premium-2"
    | "goff-premium-3"
    | "goff-small"
    | "marquee-standard"
    | "marquee-premium-1"
    | "marquee-premium-2"
    | "marquee-premium-3"
    | "outdoor";
  fill: string | undefined;
  x: number;
  y: number;
}

/**
 * StandShape — memoized.
 *
 * Uses onPointerDown + onPointerUp for tap detection instead of onClick.
 * This bypasses the react-zoom-pan-pinch issue where touch-action:none on
 * the content div prevents the browser from synthesising click events on
 * mobile/tablet after a finger tap.
 *
 * Tooltip is no longer closed on mouse-leave — use outside click instead —
 * so the user can move the pointer into the tooltip and click "Book Now".
 */
const StandShape = memo(function StandShape({
  onMouseEnter,
  onTap,
  stand_no,
  category,
  fill,
  x,
  y,
}: StandShapeProps) {
  // Track pointer-down position to distinguish a tap from a pan drag
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  const renderShape = () => {
    switch (category) {
      // ===============================
      // GOFF STANDARD
      // ===============================
      case "goff-standard":
        return (
          <>
            <rect width="23" height="35" fill={fill} />

            <text
              x={12.5}
              y={19}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize={8}
              fontWeight="700"
              pointerEvents="none"
            >
              {stand_no}
            </text>
          </>
        );

      // ===============================
      // GOFF PREMIUM 1
      // ===============================
      case "goff-premium-1":
        return (
          <>
            <rect width="50" height="50" fill={fill} />

            <text
              x={25}
              y={25}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize={10}
              fontWeight="700"
              pointerEvents="none"
            >
              {stand_no}
            </text>
          </>
        );

      // ===============================
      // GOFF PREMIUM 2
      // ===============================
      case "goff-premium-2":
        return (
          <>
            <rect width="60" height="40" fill={fill} />

            <text
              x={30}
              y={20}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize={10}
              fontWeight="700"
              pointerEvents="none"
            >
              {stand_no}
            </text>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <g
      data-stand="true"
      onMouseEnter={(e) => onMouseEnter?.(e)}
      onPointerDown={(e) => {
        // Record start position to measure drag distance later
        pointerStart.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        if (!pointerStart.current) return;
        const dx = Math.abs(e.clientX - pointerStart.current.x);
        const dy = Math.abs(e.clientY - pointerStart.current.y);
        pointerStart.current = null;

        // Only treat as a tap if the pointer barely moved (< 8px)
        // This ignores pan/drag gestures from react-zoom-pan-pinch
        if (dx < 8 && dy < 8) {
          onTap?.(e.currentTarget.getBoundingClientRect());
        }
      }}
      onPointerCancel={() => {
        // react-zoom-pan-pinch or the browser cancelled the pointer gesture
        pointerStart.current = null;
      }}
      transform={`translate(${x}, ${y})`}
      style={{ cursor: "pointer" }}
    >
      {renderShape()}
    </g>
  );
});

export default StandShape;
