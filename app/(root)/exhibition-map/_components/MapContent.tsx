"use client";
import React, { useState } from "react";
import StandCategoryAccordion from "./StandCategoryAccordion";
import Image from "next/image";
import BaseMap from "@/components/map/BaseMap";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import MapControls from "./MapControls";

const MapContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <section className="w-full min-h-screen  mt-12 flex gap-6">
      <div className="w-[320px] px-4 py-5 rounded-[20px] bg-white">
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
      <div className="w-full overflow-hidden border border-red-500 relative p-4 bg-white rounded-[20px] ">
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
            wrapperClass="w-full! h-full! border! border-green-500! "
            contentClass="w-full!"
          >
            <BaseMap />
          </TransformComponent>
        </TransformWrapper>
      </div>
    </section>
  );
};

export default MapContent;
