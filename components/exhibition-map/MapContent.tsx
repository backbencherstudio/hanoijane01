"use client";
import React, { useRef, useState } from "react";
import StandCategoryAccordion from "./StandCategoryAccordion";
import Image from "next/image";
import BaseMap from "@/components/map/BaseMap";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import MapControls from "./MapControls";
import StandLayer from "./StandLayer";
import StandTooltip, { type TooltipHandle } from "./StandTooltip";

const MapContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /**
   * tooltipRef is passed down to StandLayer.
   * Hover events call tooltipRef.current.show/hide() directly — no React
   * state update, so MapContent (and the entire subtree) never re-renders
   * when a stand is hovered.
   */
  const tooltipRef = useRef<TooltipHandle>(null);

  return (
    <section className="w-full  mt-12 flex gap-6">
      <div className="w-[320px] px-4 py-5 rounded-[20px] bg-white hidden lg:block">
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
        >
          <MapControls />
          <TransformComponent
            wrapperClass="w-full! h-full! "
            contentClass="w-full!"
          >
            <svg viewBox="0 0 998 1274" className="w-full h-auto">
              <BaseMap />

              {/*
               * StandLayer is React.memo'd and receives only the stable tooltipRef.
               * It will never re-render from MapContent's own state changes.
               */}
              <StandLayer tooltipRef={tooltipRef} />
            </svg>
          </TransformComponent>
        </TransformWrapper>

        {/*
         * StandTooltip is always mounted — visibility is driven imperatively
         * via tooltipRef.current.show/hide(), not by conditional rendering.
         * This eliminates the mount/unmount cost and the React re-render
         * that previously occurred on every hover enter/leave.
         */}
        <StandTooltip ref={tooltipRef} />
      </div>
    </section>
  );
};

export default MapContent;
