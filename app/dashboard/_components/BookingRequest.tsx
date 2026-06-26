"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { CiImageOn } from "react-icons/ci";

const bookingRequests = [
  {
    id: 1,
    company: "TechForge Ltd",
    stand: "A12",
    status: "Reserved",
    logo: "",
  },
  {
    id: 2,
    company: "TechForge Ltd",
    stand: "A12",
    status: "Booked",
    logo: "",
  },
  {
    id: 3,
    company: "TechForge Ltd",
    stand: "A12",
    status: "Reserved",
    logo: "",
  },
];

const statusStyle = {
  Booked: "bg-[#FFF4EC] text-[#F97316] border border-[#FFD8BF]",
  Reserved: "bg-[#FFF4EC] text-[#F97316] border border-[#FFD8BF]",
};

const BookingRequest = () => {
  return (
    <div className="rounded-3xl bg-white p-4">
      <h3 className="mb-4 px-2 text-lg font-semibold text-text-primary">
        Booking Request
      </h3>

      <div className="space-y-4">
        {bookingRequests.map((booking) => (
          <div
            key={booking.id}
            className="rounded-2xl border border-gray-200 p-4 bg-[#F9FAFB] "
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-full bg-gray-100">
                  {booking.logo ? (
                    <Image
                      src={booking.logo}
                      alt={booking.company}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/5 text-primary flex justify-center items-center">
                      <CiImageOn />
                    </div>
                  )}
                </div>

                <div>
                  <h4 className=" font-semibold text-text-primary">
                    {booking.company}
                  </h4>

                  <p className="mt-1 text-sm text-[#777980]">
                    Stand: {booking.stand}
                  </p>
                </div>
              </div>

              <span
                className={`rounded-md px-2 py-1 text-xs font-medium ${
                  statusStyle[booking.status as keyof typeof statusStyle]
                }`}
              >
                {booking.status}
              </span>
            </div>

            <Button
              variant="outline"
              className="mt-5 bg-[#F9FAFB] h-11 w-full rounded-lg border-primary text-base font-medium text-primary hover:bg-primary hover:text-white"
            >
              View Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingRequest;
