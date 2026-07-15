"use client";
import React, { useState } from "react";
import StandCategoryAccordion from "./StandCategoryAccordion";

const MapContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <section className="w-full min-h-screen  mt-12 flex gap-6">
      <div className="w-[320px] px-4 py-5 rounded-[20px] bg-white">
        <StandCategoryAccordion />
      </div>
      <div className="border border-red-500 flex-1"></div>
    </section>
  );
};

export default MapContent;
