import Image from "next/image";
import React from "react";
import BookingInfoForm from "./BookingInfoForm";
import BookingInfoCard from "./BookingInfoCard";

const BookingInfo = ({ nextStep }: { nextStep: () => void }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 border p-6 bg-white rounded-xl">
        <div className="bg-white rounded-xl">
          <Image src="/logo.webp" alt="logo" width={110} height={90} />
          <h2 className="text-[32px] font-semibold text-primary mt-5">
            Company Details
          </h2>
          <p className="lg:text-lg font-normal text-[#4A4C56] mt-3 pb-6 border-b-2">
            Appears on your booking confirmation and exhibitor badge.
          </p>
          <div className="mt-6">
            <BookingInfoForm nextStep={nextStep} />
          </div>
        </div>
      </div>
      <div className="border">
        <BookingInfoCard />
      </div>
    </div>
  );
};

export default BookingInfo;
