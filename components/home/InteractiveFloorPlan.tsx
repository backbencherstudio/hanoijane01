import Image from "next/image";
import React from "react";
import ButtonGroup from "../ui/ButtonGroup";

const InteractiveFloorPlan = () => {
  return (
    <section className="bg-[url('/assets/horses.webp')] bg-cover bg-center padding-default relative">
      <div className="bg-primary/80 absolute top-0 left-0 w-full h-full contrast-75"></div>
      <div className="container relative  z-10">
        {/* Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D2D2D5] px-4 py-1.5 font-medium text-[#D2D2D5] mb-4">
            ✦ Interactive Floor Plan
          </div>
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center mx-auto text-center justify-center max-w-145 text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight  leading-8 md:leading-10 lg:leading-12">
            Exhibition Floor Map
          </h2>

          <p className="mx-auto mt-2 lg:mt-4 text-sm md:text-base lg:text-lg font-normal">
            Hover over any stand to view details. Click to begin booking.
          </p>
        </div>
        {/* content */}
        <Image
          src="/assets/map.png"
          alt="map"
          width={1304}
          height={688}
          className="mt-12"
        />
        {/* cta button */}
        <div className="w-full flex justify-center items-center">
          <ButtonGroup className="px-6 mt-12 bg-white text-primary hover:bg-gray-100">
            Explore Full Floor Map
          </ButtonGroup>
        </div>
      </div>
    </section>
  );
};

export default InteractiveFloorPlan;
