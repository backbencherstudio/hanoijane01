"use client";
import StateCard2 from "@/components/dashboard/StateCard2";
import CustomTable from "@/components/ui/Table";
import { Column } from "@/types/table";
import { paymentTrackingData } from "@/data/dashboard/paymentTrackingData";
import React, { useCallback, useState, useEffect } from "react";
import { GoDotFill } from "react-icons/go";
import { useRouter, useSearchParams } from "next/navigation";
import PaymentStatusFilter from "./PaymentStatusFilter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Compute stats from data (static for now, but we'll compute for demo)
const totalRevenue = paymentTrackingData.reduce(
  (sum, item) => sum + item.amount,
  0,
);
const paidTotal = paymentTrackingData
  .filter((item) => item.status === "paid")
  .reduce((sum, item) => sum + item.amount, 0);
const pendingTotal = paymentTrackingData
  .filter((item) => item.status === "pending")
  .reduce((sum, item) => sum + item.amount, 0);
const overdueTotal = paymentTrackingData
  .filter((item) => item.status === "overdue")
  .reduce((sum, item) => sum + item.amount, 0);

const stateData = [
  { title: "Total Revenue", value: `$${totalRevenue.toLocaleString()}` },
  { title: "Paid", value: `$${paidTotal.toLocaleString()}` },
  { title: "Pending", value: `$${pendingTotal.toLocaleString()}` },
  { title: "Overdue", value: `$${overdueTotal.toLocaleString()}` },
];

const PaymentTrackingPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status") || "paid";

  const [filters, setFilters] = useState({ currentPage: 1, perPageItem: 8 });

  // Filter data by status
  const filteredData = paymentTrackingData.filter((item) => {
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
    setFilters((prev) => ({ ...prev, currentPage: 1 }));
  };

  const columns: Column<(typeof paymentTrackingData)[0]>[] = [
    {
      header: "Payment Ref",
      headerClassName: "text-left",
      accessor: "paymentRef",
      cellClassName: "px-3 py-5 font-medium",
    },
    {
      header: "Stand",
      accessor: "stand",
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
      header: "Amount ($)",
      accessor: "amount",
      render: (value) => `$${value as number}`,
      cellClassName: "px-3 py-5 font-medium text-center",
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => {
        const status = value as string;
        const colorMap: Record<string, string> = {
          paid: "bg-[#E9FAF7] border border-[#D3F4EF] text-[#22CAAD]",
          pending: "bg-[#FBF5EB] border border-[#EDCEBF] text-[#D79930]",
          overdue: "bg-[#FBD8DB] border border-[#F7B1B8] text-[#EB3D4D]",
        };
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 w-fit ${colorMap[status] || ""}`}
          >
            <GoDotFill className="size-3" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
      cellClassName: "px-3 py-5 text-center flex justify-center items-center",
    },
    {
      header: `${statusParam === "all" ? "Payment / Due Date" : statusParam === "paid" ? "Payment Date" : "Due Date"} `,
      render: (_, row) => {
        if (row.status === "paid") {
          return <span className="text-center">{row.paymentDate}</span>;
        } else {
          return (
            <span className="text-center text-red-600">{row.dueDate}</span>
          );
        }
      },
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Method",
      render: (_, row) => {
        if (row.status === "paid") {
          return <span className="text-center">{row.method}</span>;
        } else {
          return <span className="text-center text-gray-400">N/A</span>;
        }
      },
      cellClassName: "px-3 py-5 text-center",
    },
  ];

  return (
    <div>
      {/* heading */}
      <div className="w-full flex flex-col gap-4 sm:flex-row justify-between items-center">
        <div className="w-full">
          <h2 className="text-text-primary text-xl md:text-2xl font-semibold">
            Payment Tracking
          </h2>
          <p className="text-sm text-[#64748B] mt-3">
            Industry Expo 2027, Overview for Wednesday, 10 June 2026
          </p>
        </div>
      </div>

      {/* state cards */}
      <div className="my-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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
        <div className="flex flex-col justify-between items-center lg:items-start gap-4 mb-4">
          <p className="text-text-primary text-lg font-semibold">
            All Payments
          </p>
          <PaymentStatusFilter
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
          emptyMessage="No payments found"
          pagination={pagination}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default PaymentTrackingPageContent;
