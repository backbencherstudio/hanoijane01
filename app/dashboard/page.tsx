import React from "react";
import StandOverviewChart from "./_components/StandOverviewChart";
import RecentBookings from "./_components/RecentBookings";
import DashboardStats from "./_components/DashboardStats";
import { getCurrentOverviewDate } from "@/lib/utils";

const DashboardHome = () => {
  const { year: currentYear, formattedDate } = getCurrentOverviewDate();
  
  return (
    <div>
      {/* heading */}
      <div className="w-full flex flex-col gap-4 sm:flex-row justify-between items-center">
        <div className="w-full">
          <h2 className="text-text-primary text-xl md:text-2xl font-semibold">
            Admin Dashboard
          </h2>
          <p className="text-sm text-[#64748B] mt-3">
            Industry Expo {currentYear}, Overview for {formattedDate}
          </p>
        </div>
      </div>
      {/* states */}
      <DashboardStats />
      {/* content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* left side */}
        <div className="lg:col-span-full">
          <div>
            <StandOverviewChart />
          </div>
        </div>
        {/* right side */}
        <div>
          <div>{/* <BookingRequest /> */}</div>
        </div>
      </div>
      <div className="my-6">
        <RecentBookings />
      </div>
    </div>
  );
};

export default DashboardHome;
