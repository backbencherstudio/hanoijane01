"use client";
import StateCard2 from "@/components/dashboard/StateCard2";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import React, { useState } from "react";
import StandFilters from "./_components/StandFilters";

const stateData = [
  { title: "standard stand", value: 40 },
  { title: "Double Size Stand", value: 20 },
  { title: "Outdoor Stand", value: 12 },
];

const AllStandPage = () => {
  // Filter states
  const [typeFilter, setTypeFilter] = useState("All types");
  const [blockFilter, setBlockFilter] = useState("All Block");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const params = {
    type: typeFilter === "All types" ? undefined : typeFilter,
    block: blockFilter === "All Block" ? undefined : blockFilter,
    status: statusFilter === "All Status" ? undefined : statusFilter,
  };

  // ✅ RTK Query auto-fetches when `params` changes
  // const { data: stands, isLoading, isError } = useGetStandsQuery(params);

  // Log filter values whenever any changes
  React.useEffect(() => {
    console.log("Filters:", {
      type: typeFilter,
      block: blockFilter,
      status: statusFilter,
    });
  }, [typeFilter, blockFilter, statusFilter]);

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
        <Button>
          <Eye />
          View Map
        </Button>
      </div>

      {/* state card */}
      <div className="my-9 grid grid-cols-1 md:grid-cols-3 gap-5">
        {stateData.map((state) => (
          <StateCard2
            title={state.title}
            value={state.value}
            key={state.title}
          />
        ))}
      </div>

      {/* content or data table */}
      <div className="bg-white rounded-2xl px-5 py-4">
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-4">
          <p className="text-text-primary text-lg font-semibold">
            All Stand List
          </p>
          <StandFilters
            type={typeFilter}
            block={blockFilter}
            status={statusFilter}
            onTypeChange={setTypeFilter}
            onBlockChange={setBlockFilter}
            onStatusChange={setStatusFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default AllStandPage;
