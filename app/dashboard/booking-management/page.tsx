import StateCard2 from "@/components/dashboard/StateCard2";
import { Button } from "@/components/ui/button";
import React from "react";

const stateData = [
  { title: "Available Stand", value: 40 },
  { title: "Booked Stand", value: 20 },
  { title: "Reserved Stand", value: 12 },
  { title: "Canceled Stand", value: 5 },
];

const BookingManagementPage = () => {
  return (
    <div>
      {/* heading */}
      <div className="w-full flex flex-col gap-4 sm:flex-row justify-between items-center">
        <div className="w-full">
          <h2 className="text-text-primary text-xl md:text-2xl font-semibold">
            Stand Management
          </h2>
          <p className="text-sm text-[#64748B] mt-3">
            Industry Expo 2027, Overview for Wednesday, 10 June 2026
          </p>
        </div>
      </div>

      {/* state card */}
      <div className="my-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stateData.map((state) => (
          <StateCard2
            title={state.title}
            value={state.value}
            key={state.title}
          />
        ))}
      </div>
    </div>
  );
};

export default BookingManagementPage;
