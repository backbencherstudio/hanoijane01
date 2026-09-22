'use client';

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import type { Stand } from '@/types/stand';
import { BadgeCheck } from 'lucide-react';

export type TooltipPlacement = 'bottom' | 'right' | 'left';

// ─── Imperative handle exposed to parent ────────────────────────────────────
export interface TooltipHandle {
  show: (
    stand: Stand,
    x: number,
    y: number,
    placement?: TooltipPlacement,
  ) => void;
  hide: () => void;
  /** Toggle open/close — same stand tap closes, different stand tap switches. */
  toggle: (
    stand: Stand,
    x: number,
    y: number,
    placement?: TooltipPlacement,
  ) => void;
  /**
   * Re-read the currently-shown stand's bounding rect and reposition the
   * tooltip. Call this during pan/zoom so the tooltip follows the stand.
   */
  refreshPosition: () => void;
}

export interface StandTooltipProps {
  /** Fires when "Book Now" is clicked with the selected stand */
  onBookNow?: (stand: Stand) => void;
  /** Whether the current user is authenticated */
  isLoggedIn?: boolean;
  /** Whether the current user is an admin */
  isAdmin?: boolean;
}

// ─── Internal DOM refs (one per text node we need to update) ─────────────────
interface InternalRefs {
  root: React.RefObject<HTMLDivElement | null>;
  arrow: React.RefObject<HTMLDivElement | null>;
  standNo: React.RefObject<HTMLSpanElement | null>;
  statusBadge: React.RefObject<HTMLSpanElement | null>;
  standType: React.RefObject<HTMLSpanElement | null>;
  size: React.RefObject<HTMLSpanElement | null>;
  price: React.RefObject<HTMLSpanElement | null>;
  exhibitorRow: React.RefObject<HTMLDivElement | null>;
  exhibitorName: React.RefObject<HTMLSpanElement | null>;
  bookBtn: React.RefObject<HTMLButtonElement | null>;
}

/**
 * StandTooltip
 *
 * Always mounted (never conditionally rendered).
 * Shown / hidden imperatively via `tooltipRef.current.show(stand, x, y)` and
 * `tooltipRef.current.hide()` — completely bypassing React state so that
 * hovering 80+ stands never triggers a single React re-render.
 */
const StandTooltip = forwardRef<TooltipHandle, StandTooltipProps>(
  ({ onBookNow, isLoggedIn, isAdmin }, ref) => {
    const r: InternalRefs = {
      root: useRef<HTMLDivElement>(null),
      arrow: useRef<HTMLDivElement>(null),
      standNo: useRef<HTMLSpanElement>(null),
      statusBadge: useRef<HTMLSpanElement>(null),
      standType: useRef<HTMLSpanElement>(null),
      size: useRef<HTMLSpanElement>(null),
      price: useRef<HTMLSpanElement>(null),
      exhibitorRow: useRef<HTMLDivElement>(null),
      exhibitorName: useRef<HTMLSpanElement>(null),
      bookBtn: useRef<HTMLButtonElement>(null),
    };

    // Tracks which stand is currently shown (no state — just a ref)
    const currentStandNo = useRef<string | null>(null);
    const currentStand = useRef<Stand | null>(null);

    // Stable reference to the outside-close handler so we can remove it later
    const outsideHandler = useRef<((e: PointerEvent) => void) | null>(null);

    /** Helper to configure tooltip transform and arrow direction */
    const applyPlacement = (placement: TooltipPlacement) => {
      const el = r.root.current;
      const arrow = r.arrow.current;
      if (!el || !arrow) return;

      if (placement === 'right') {
        el.style.transform = 'translate(0, -24px)';
        arrow.className =
          'absolute -left-2 top-8 h-4 w-4 -translate-y-1/2 rotate-45 border-l border-b border-[#E4E7EC] bg-white';
      } else if (placement === 'left') {
        el.style.transform = 'translate(-100%, -24px)';
        arrow.className =
          'absolute -right-2 top-8 h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t border-[#E4E7EC] bg-white';
      } else {
        // default "bottom"
        el.style.transform = 'translate(-50%, 0)';
        arrow.className =
          'absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-[#E4E7EC] bg-white';
      }
    };

    /** Returns true if the Book Now button should be visible */
    const shouldShowBookBtn = (stand: Stand) => {
      if (!stand.isAvailable) return false;
      if (stand.isPending) return false;
      if (isAdmin) return false;
      return true;
    };

    useImperativeHandle(ref, () => ({
      show(
        stand: Stand,
        x: number,
        y: number,
        placement: TooltipPlacement = 'bottom',
      ) {
        const el = r.root.current;
        if (!el) return;

        applyPlacement(placement);

        // ── store stand ref for Book Now ──────────────────────────────────
        currentStand.current = stand;

        // ── position ────────────────────────────────────────────────────────
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;

        // ── stand number ─────────────────────────────────────────────────────
        if (r.standNo.current) r.standNo.current.textContent = stand.stand_no;

        // ── status badge ─────────────────────────────────────────────────────
        if (r.statusBadge.current) {
          const statusText = stand.isPending
            ? 'pending'
            : stand.isAvailable
              ? 'available'
              : 'booked';
          r.statusBadge.current.textContent = statusText;

          if (stand.isPending) {
            r.statusBadge.current.className =
              'rounded-sm px-1.5 py-1 text-sm font-semibold bg-amber-100 text-amber-700';
          } else if (!stand.isAvailable) {
            r.statusBadge.current.className =
              'rounded-sm px-1.5 py-1 text-sm font-semibold bg-gray-200 text-gray-700';
          } else {
            r.statusBadge.current.className =
              'rounded-sm px-1.5 py-1 text-sm font-semibold bg-green-100 text-green-700';
          }
        }

        // ── other fields ──────────────────────────────────────────────────────
        if (r.standType.current)
          r.standType.current.textContent = stand.standType;
        if (r.size.current) r.size.current.textContent = stand.size;
        if (r.price.current) r.price.current.textContent = `€ ${stand.price}`;

        // ── exhibitor row (conditional) ───────────────────────────────────────
        if (r.exhibitorRow.current) {
          if (stand.exhibitor) {
            r.exhibitorRow.current.style.display = 'flex';
            if (r.exhibitorName.current)
              r.exhibitorName.current.textContent = stand.exhibitor;
          } else {
            r.exhibitorRow.current.style.display = 'none';
          }
        }

        // ── book button (conditional) ─────────────────────────────────────────
        if (r.bookBtn.current) {
          r.bookBtn.current.style.display = shouldShowBookBtn(stand)
            ? 'block'
            : 'none';
        }

        // ── make visible ──────────────────────────────────────────────────────
        currentStandNo.current = stand.stand_no;
        el.style.opacity = '1';
        el.style.pointerEvents = 'auto';

        // ── outside-tap to dismiss ────────────────────────────────────────────
        if (outsideHandler.current) {
          document.removeEventListener('pointerdown', outsideHandler.current);
        }
        const handler = (evt: PointerEvent) => {
          const target = evt.target as Element;
          if (target.closest?.('[data-stand="true"]')) return;
          if (el && el.contains(target as Node)) return;
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
          currentStandNo.current = null;
          currentStand.current = null;
          document.removeEventListener('pointerdown', handler);
          outsideHandler.current = null;
        };
        outsideHandler.current = handler;
        document.addEventListener('pointerdown', handler);
      },

      hide() {
        const el = r.root.current;
        if (!el) return;
        el.style.opacity = '0';
        el.style.pointerEvents = 'none';
        currentStandNo.current = null;
        currentStand.current = null;
        if (outsideHandler.current) {
          document.removeEventListener('pointerdown', outsideHandler.current);
          outsideHandler.current = null;
        }
      },

      refreshPosition() {
        const el = r.root.current;
        if (!el) return;
        const standNo = currentStandNo.current;
        if (!standNo) return;
        const standEl = document.querySelector<Element>(
          `[data-stand-no="${standNo}"]`,
        );
        if (!standEl) return;
        const rect = standEl.getBoundingClientRect();

        if (standNo === '18') {
          const fitsRight = rect.right + 12 + 220 <= window.innerWidth;
          const placement: TooltipPlacement = fitsRight ? 'right' : 'left';
          applyPlacement(placement);
          el.style.left = `${placement === 'right' ? rect.right + 12 : rect.left - 12}px`;
          el.style.top = `${rect.top + 20}px`;
        } else {
          applyPlacement('bottom');
          el.style.left = `${rect.left + rect.width / 2}px`;
          el.style.top = `${rect.bottom + 12}px`;
        }
      },

      toggle(
        stand: Stand,
        x: number,
        y: number,
        placement: TooltipPlacement = 'bottom',
      ) {
        const el = r.root.current;
        if (!el) return;
        const isVisible = el.style.opacity === '1';
        const isSameStand = currentStandNo.current === stand.stand_no;

        if (isVisible && isSameStand) {
          this.hide();
        } else {
          this.show(stand, x, y, placement);
        }
      },
    }));

    return (
      <div
        ref={r.root}
        className="fixed z-9999 w-52 rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-xl
                 transition-opacity duration-150"
        style={{
          opacity: 0,
          pointerEvents: 'none',
          transform: 'translate(-50%, 0)',
          left: 0,
          top: 0,
        }}
      >
        {/* Dynamic Arrow */}
        <div
          ref={r.arrow}
          className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-[#E4E7EC] bg-white"
        />

        <h3 className="text-sm font-semibold text-primary flex items-center justify-between">
          <span className="space-x-1">
            {' '}
            Stand <span ref={r.standNo} />
          </span>{' '}
          <span ref={r.statusBadge} />
        </h3>

        <div className="mt-4 text-sm">
          {/* Type */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-accent">Type</span>
            <span ref={r.standType} className="font-medium text-[#4A4C56]" />
          </div>

          {/* Size */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-accent">Size</span>
            <span ref={r.size} className="font-medium text-[#4A4C56]" />
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-accent">Price</span>
            <span ref={r.price} className="font-semibold text-[#4A4C56]" />
          </div>

          {/* Book Now button — shown/hidden imperatively */}
          <button
            ref={r.bookBtn}
            type="button"
            className="mt-2 w-full rounded-full bg-primary h-8.5 text-sm font-medium text-white hover:opacity-90 transition-opacity cursor-pointer active:scale-99"
            style={{ display: 'none' }}
            onClick={e => {
              e.stopPropagation();
              const stand = currentStand.current;
              if (stand && onBookNow) {
                onBookNow(stand);
              }
            }}
          >
            <span className="flex gap-1.5 items-center justify-center">
              {' '}
              <BadgeCheck size={16} /> Book Now
            </span>
          </button>
        </div>
      </div>
    );
  },
);

StandTooltip.displayName = 'StandTooltip';

export default StandTooltip;
