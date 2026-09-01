"use client";

import React from "react";
import ButtonGroup from "../ui/ButtonGroup";
import { useGetExhibitionMapQuery } from "@/src/redux/api/exhibition/exhibitionApi";

const getOrdinalSuffix = (day: number) => {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const formatBookingDeadline = (dateString?: string) => {
  if (!dateString) return "October 30th 2026";
  const date = new Date(dateString);
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}${getOrdinalSuffix(day)} ${year}`;
};

const ContactCTA = () => {
  const { data } = useGetExhibitionMapQuery(null);
  const exhibition = data?.data;
  const bookingDeadline = formatBookingDeadline(exhibition?.bookingEndedAt);

  return (
    <section className="bg-background padding-default">
      <div className="container bg-[url('/assets/contact_cta.webp')] bg-cover bg-center py-15 lg:py-20 rounded-3xl">
        {/* Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#316BFF] px-4 py-1.5 font-medium text-[#316BFF] mb-4">
            ✦ Platform Features
          </div>
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center mx-auto text-center justify-center max-w-165">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-8 md:leading-10 lg:leading-12">
            Reserve Your Exhibition Space Today
          </h2>

          <p className="mx-auto mt-2 lg:mt-4 text-sm md:text-base lg:text-lg text-[#D2D2D5] font-normal">
            Don&apos;t miss your opportunity to exhibit{" "}
            <b>at the thoroughbred industry’s premier event.</b> Stands are
            filling up fast, secure your space before the booking deadline of{" "}
            <b>{bookingDeadline}</b>
          </p>
        </div>
        {/* cta button */}
        <div className="flex justify-center items-center w-full">
          <ButtonGroup
            pathName="/contact"
            className="bg-white text-primary mt-12 px-6 hover:bg-gray-100"
          >
            {" "}
            Contact Organizer
          </ButtonGroup>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
