"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import StandCategoryAccordion from "./StandCategoryAccordion";
import Image from "next/image";
import BaseMap from "@/components/map/BaseMap";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import MapControls from "./MapControls";
import StandLayer from "./StandLayer";
import StandTooltip, { type TooltipHandle } from "./StandTooltip";
import type { Stand } from "@/types/stand";
import { updateStand } from "@/src/redux/features/bookingSlice";

const MapContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const tooltipRef = useRef<TooltipHandle>(null);

  // ── Book Now handler ────────────────────────────────────────────────────
  const handleBookNow = useCallback(
    (stand: Stand) => {
      dispatch(
        updateStand({
          id: stand.stand_no,
          name: `Stand ${stand.stand_no}`,
          type: stand.standType,
          size: stand.size,
          price: stand.price,
        }),
      );
      router.push("/terms-and-conditions");
    },
    [dispatch, router],
  );

  // ── Reposition tooltip on page scroll ──────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      tooltipRef.current?.refreshPosition();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="w-full  mt-12 flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-[320px] px-4 py-5 rounded-[20px] bg-white ">
        <Image
          src="/logo-1.png"
          alt="Logo"
          width={151}
          height={124}
          className="mb-6 mx-auto"
        />

        <h3 className="text-xl font-semibold text-[#1C1F23] mb-6">
          Stand Category
        </h3>
        <StandCategoryAccordion />
      </div>
      <div className="w-full h-fit bg-white overflow-hidden relative p-4 rounded-[20px] ">
        <TransformWrapper
          initialScale={1}
          minScale={1}
          maxScale={8}
          centerOnInit
          limitToBounds={true}
          smooth
          wheel={{
            disabled: true,
          }}
          doubleClick={{
            disabled: true,
          }}
          pinch={{
            disabled: false,
          }}
          panning={{
            disabled: false,
          }}
          onPanning={() => {
            tooltipRef.current?.refreshPosition();
          }}
          onZoom={() => {
            tooltipRef.current?.refreshPosition();
          }}
        >
          <MapControls />
          <TransformComponent
            wrapperClass="w-full! h-full! "
            contentClass="w-full!"
          >
            <svg viewBox="0 0 998 1274" className="w-full h-auto">
              <BaseMap />

              <StandLayer tooltipRef={tooltipRef} />
            </svg>
          </TransformComponent>
        </TransformWrapper>

        <StandTooltip ref={tooltipRef} onBookNow={handleBookNow} />
      </div>
    </section>
  );
};

export default MapContent;
