"use client";
import StateCard2 from "@/components/dashboard/StateCard2";
import CustomTable from "@/components/ui/Table";
import { Column } from "@/types/table";
import { bookingManagementData } from "@/data/dashboard/bookingManagementData";
import React, { useCallback, useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { useRouter, useSearchParams } from "next/navigation";
import BookingStatusFilter from "./BookingFilters";
import { Button } from "@/components/ui/button";
import BookingDetailsModal from "./BookingDetailsModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Compute status counts from data
const statusCounts = bookingManagementData.reduce(
  (acc, item) => {
    const status = item.status as string;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>,
);

const stateData = [
  { title: "Booked", value: statusCounts.booked || 0 },
  { title: "Reserved", value: statusCounts.reserved || 0 },
  { title: "Request", value: statusCounts.request || 0 },
  { title: "Overdue", value: statusCounts.overdue || 0 },
  { title: "Cancel", value: statusCounts.cancel || 0 },
].filter((item) => item.value > 0);

const BookingManagementPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status") || "all";

  const [filters, setFilters] = useState({ currentPage: 1, perPageItem: 8 });
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({
    isOpen: false,
    id: null,
  });

  // Filter data by status
  const filteredData = bookingManagementData.filter((item) => {
    if (statusParam === "all") return true;
    return item.status === statusParam;
  });

  const startIndex = (filters.currentPage - 1) * filters.perPageItem;
  const endIndex = startIndex + filters.perPageItem;
  const currentData = filteredData.slice(startIndex, endIndex);
  const totalItems = filteredData.length;
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

  // Update URL when status changes
  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", status);
    router.push(`?${params.toString()}`, { scroll: false });
    // Reset to first page when filter changes
    setFilters((prev) => ({ ...prev, currentPage: 1 }));
  };

  // Log filter changes
  useEffect(() => {
    console.log("Status filter:", statusParam);
  }, [statusParam]);

  const columns: Column<(typeof bookingManagementData)[0]>[] = [
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
      header: "Exhibitor",
      headerClassName: "text-left  pl-12",
      accessor: "exhibitor",
      cellClassName: "px-3 py-5 pl-12",
      render: (value) => {
        const text = value as string;
        const displayText = text.length > 20 ? text.slice(0, 20) + "..." : text;
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="block max-w-45 truncate">{displayText}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{text}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      header: "Stand Type",
      accessor: "standType",
      render: (value) => {
        const type = value as string;
        const colorMap: Record<string, string> = {
          Standard: "bg-[#d3e0fb] text-blue-700 border border-[#BED1F9]",
          Outdoor: "bg-[#FBF5EB] text-[#D79930] border border-[#F3E1C1]",
          Double: "bg-[#E8DEFD] text-[#8B5CF6] border border-[#DDCFFD]",
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
      cellClassName: "px-3 py-5 font-medium text-center",
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => {
        const status = value as string;
        const colorMap: Record<string, string> = {
          booked: "bg-green-100 border border-green-200 text-green-700",
          reserved: "bg-[#F9EFEA] border border-[#EDCEBF] text-[#C25B29]",
          request: "bg-[#EBF2FD] border border-[#C5D9F7] text-[#2A6BCA]",
          overdue: "bg-[#FEECEE] border border-[#FBD8DB] text-[#EB3D4D]",
          cancel: "bg-[#FEECEE] border border-[#FBD8DB] text-[#EB3D4D]",
        };
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium flex items-center  gap-1 w-fit ${colorMap[status] || ""}`}
          >
            <GoDotFill className="size-3" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
      cellClassName: "px-3 py-5 text-center flex justify-center",
    },
    {
      header: "Action",
      render: (_, row) => (
        <div className="flex justify-center gap-2 overflow-visible py-2">
          <Button
            onClick={() => {
              setBookingModal({
                isOpen: true,
                id: row.bookingId,
              });
            }}
            variant="outline"
            className="h-6 text-[12px] font-normal rounded-[5px]"
          >
            View Details
          </Button>
        </div>
      ),
      cellClassName: "px-3 py-5 text-center",
    },
  ];

  return (
    <div>
      {/* heading */}
      <div className="w-full flex flex-col gap-4 sm:flex-row justify-between items-center">
        <div className="w-full">
          <h2 className="text-text-primary text-xl md:text-2xl font-semibold">
            Booking Management
          </h2>
          <p className="text-sm text-[#64748B] mt-3">
            Industry Expo 2027, Overview for Wednesday, 10 June 2026
          </p>
        </div>
      </div>

      {/* state cards */}
      <div className="my-9 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
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
        <div className="flex flex-col justify-between  items-center lg:items-start gap-4 mb-4">
          <p className="text-text-primary text-lg font-semibold">
            All Bookings
          </p>
          <BookingStatusFilter
            currentStatus={statusParam}
            onStatusChange={handleStatusChange}
          />
        </div>
        {/* table */}
        <CustomTable
          data={currentData}
          columns={columns}
          showIndex={false}
          indexLabel="SN"
          isLoading={false}
          emptyMessage="No bookings found"
          pagination={pagination}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
      <BookingDetailsModal
        isOpen={bookingModal.isOpen}
        bookingId={bookingModal.id}
        onClose={() => {
          setBookingModal({
            isOpen: false,
            id: null,
          });
        }}
      />
    </div>
  );
};

export default BookingManagementPageContent;
