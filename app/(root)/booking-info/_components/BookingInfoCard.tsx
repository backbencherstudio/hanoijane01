import React from "react";

const BookingInfoCard = () => {
  return (
    <div>
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="bg-primary text-white p-5">
          <div className="w-full flex justify-between items-center">
            <h4 className="text-2xl font-semibold">Stand B05</h4>
            <p className="bg-[#E6D8C3] px-2 py-1 text-sm text-[#5E3B06] rounded-full font-medium">
              Reserved
            </p>
          </div>
          <p className="mt-2.5">Block A standard stand</p>
        </div>
        <div className="p-5 mt-4 space-y-4 text-[#4A4C56]">
          <div className="flex items-center justify-between">
            <p className="text-lg">Type</p>{" "}
            <p className="text-lg font-semibold">Standard</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg">Size</p>{" "}
            <p className="text-lg font-semibold">(3×3m)</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg">Area</p>{" "}
            <p className="text-lg font-semibold">Indoor Stand</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg">Event</p>{" "}
            <p className="text-lg font-semibold">ITBA EXPO The NEXT 100</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg">Date</p>{" "}
            <p className="text-lg font-semibold">14-16 March 2027</p>
          </div>
        </div>
      </div>
      <div className="p-5 mt-3 space-y-4 bg-white rounded-lg text-[#4A4C56]">
        <h4 className="font-semibold">ORDER SUMMARY</h4>
        <div className="flex items-center justify-between">
          <p className="text-lg">Stand A02</p>{" "}
          <p className="text-lg font-semibold">$400</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg">VAT(20%)</p>{" "}
          <p className="text-lg font-semibold">$40</p>
        </div>
        <div className="h-px bg-gray-400"></div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Total Due</p>{" "}
          <p className="text-xl text-primary font-bold">$440</p>
        </div>
      </div>
    </div>
  );
};

export default BookingInfoCard;
