"use client";
import React, { useState } from "react";
import StandCategoryAccordion from "./StandCategoryAccordion";
import Image from "next/image";

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
      <div className="border border-red-500 flex-1"></div>
    </section>
  );
};

export default MapContent;
