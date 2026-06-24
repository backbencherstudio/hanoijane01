"use client";
import StateCard2 from "@/components/dashboard/StateCard2";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import React, { useCallback, useState } from "react";
import StandFilters from "./_components/StandFilters";
import {
  StandManagement,
  standManagementData,
} from "@/data/dashboard/standManagementData";
import CustomTable from "@/components/ui/Table";
import { GoDotFill } from "react-icons/go";
import { Column } from "@/types/table";

const stateData = [
  { title: "standard stand", value: 40 },
  { title: "Double Size Stand", value: 20 },
  { title: "Outdoor Stand", value: 12 },
];

const StandManagementPage = () => {
  const [filters, setFilters] = useState({ currentPage: 1, perPageItem: 8 });

  const startIndex = (filters.currentPage - 1) * filters.perPageItem;
  const endIndex = startIndex + filters.perPageItem;
  const currentData = standManagementData.slice(startIndex, endIndex);
  const totalItems = standManagementData.length;
  const totalPages = Math.ceil(totalItems / filters.perPageItem);

  const pagination = {
    currentPage: filters.currentPage,
    totalPages,
    totalItems,
    itemsPerPage: filters.perPageItem,
  };

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, currentPage: page }));
  }, []);

  const handleItemsPerPageChange = (newPerPage: number) => {
    setFilters({ currentPage: 1, perPageItem: newPerPage });
  };

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

  // table column
  const columns: Column<StandManagement>[] = [
    {
      header: "Booking ID",
      headerClassName: "text-left",
      accessor: "bookingId",
      cellClassName: "px-3 py-5 font-medium",
    },
    {
      header: "Stand No",
      accessor: "standNo",
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Block",
      accessor: "block",
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Stand Type",
      accessor: "standType",
      render: (value) => {
        const type = value as string;
        const colorMap: Record<string, string> = {
          Standard: "bg-[#d3e0fb] text-blue-700 border border-[#BED1F9]",
          Double: "bg-[#E8DEFD] text-[#8B5CF6] border border-[#DDCFFD]",
          Outdoor: "bg-[#FBF5EB] text-[#D79930] border border-[#F3E1C1]",
        };
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${colorMap[type] || ""}`}
          >
            {type}
          </span>
        );
      },
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Price ($)",
      accessor: "price",
      render: (value) => `$${value as number}`,
      cellClassName: "px-3 py-5 font-semibold text-center",
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => {
        const status = value as string;
        const colorMap: Record<string, string> = {
          Available: "bg-[#E9E9EA] border border-[#D4DAE3] text-[#777980]",
          Booked: "bg-[#F6F1E9] border border-[#E6C58C] text-[#D79930]",
          Reserved: "bg-[#F9EFEA] border border-[#EDCEBF] text-[#C25B29]",
          Cancelled: "bg-[#FDECEE] border border-[#F9C5CA] text-[#EB3D4D]",
        };
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 w-fit ${colorMap[status] || ""}`}
          >
            <GoDotFill className="size-3" />
            {status}
          </span>
        );
      },
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Size",
      accessor: "size",
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Exhibitor",
      accessor: "exhibitor",
      cellClassName: "px-3 py-5 text-center whitespace-nowrap",
    },
  ];
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
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-4 mb-4">
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
        {/* table */}
        <CustomTable
          data={currentData}
          columns={columns}
          showIndex={false}
          indexLabel="SN"
          isLoading={false}
          emptyMessage="No transactions found"
          pagination={pagination}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default StandManagementPage;
