import { stateData } from "@/data/dashboard/homeData";
import React from "react";
import StateCard from "./_components/StateCard";
import StandOverviewChart from "./_components/StandOverviewChart";
import RecentBookings from "./_components/RecentBookings";
import BookingRequest from "./_components/BookingRequest";

const DashboardHome = () => {
  return (
    <div>
      {/* heading */}
      <div className="w-full flex flex-col gap-4 sm:flex-row justify-between items-center">
        <div className="w-full">
          <h2 className="text-text-primary text-xl md:text-2xl font-semibold">
            Admin Dashboard
          </h2>
          <p className="text-sm text-[#64748B] mt-3">
            Industry Expo 2027, Overview for Wednesday, 10 June 2026
          </p>
        </div>
      </div>
      {/* states */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stateData.map((state, idx) => {
          return <StateCard state={state} key={idx} />;
        })}
      </div>
      {/* content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* left side */}
        <div className="lg:col-span-2">
          <div>
            <StandOverviewChart />
          </div>
           <div className="my-6">
        <RecentBookings />
      </div>
        </div>
        {/* right side */}
        <div>
          <div>
            <BookingRequest/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
