"use client";
import StateCard2 from "@/components/dashboard/StateCard2";
import CustomTable from "@/components/ui/Table";
import { Column } from "@/types/table";
import React, { useCallback, useState } from "react";
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
import {
  useGetBookingStatsQuery,
  useGetAdminBookingsQuery,
} from "@/src/redux/api/booking/bookingApi";
import type { AdminBooking } from "@/types/booking.types";
import { CheckCheck, Copy } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentOverviewDate } from "@/lib/utils";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const BookingManagementPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status") || "all";

  const [page, setPage] = useState(1);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);
  const limit = 8;

  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({
    isOpen: false,
    id: null,
  });

  // Get current date for display
  const { year: currentYear, formattedDate } = getCurrentOverviewDate();

  const { data: bookingStatsData, isLoading: isStateLoading } =
    useGetBookingStatsQuery(null);
  const bookingStats = bookingStatsData?.data;

  const stateData = bookingStats
    ? [
        { title: "Available", value: bookingStats.availableStands },
        { title: "Booked", value: bookingStats.bookedStands },
        { title: "Canceled", value: bookingStats.canceledStands },
      ]
    : [];

  const {
    data: bookingsData,
    isLoading,
    isFetching,
  } = useGetAdminBookingsQuery({
    status: statusParam !== "all" ? statusParam : undefined,
    page,
    limit,
  });

  const bookings: AdminBooking[] = bookingsData?.data ?? [];
  const meta = bookingsData?.metaData;

  const pagination = meta
    ? {
        currentPage: meta.currentPage,
        totalPages: meta.totalPages,
        totalItems: meta.totalItems,
        itemsPerPage: meta.itemsPerPage,
      }
    : {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: limit,
      };

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleItemsPerPageChange = (_newPerPage: number) => {
    // Keep fixed at 8 per page
  };

  // Update URL when status changes
  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", status);
    router.push(`?${params.toString()}`, { scroll: false });
    setPage(1);
  };

  const columns: Column<AdminBooking>[] = [
    {
      header: "Booking ID",
      headerClassName: "text-left",
      accessor: "id",
      render: (value) => {
        const bookingId = value as string;
        const MAX_LENGTH = 28;
        const isLong = bookingId.length > MAX_LENGTH;
        const display = isLong
          ? `${bookingId.slice(0, MAX_LENGTH)}...`
          : bookingId;

        const handleCopy = async () => {
          try {
            await navigator.clipboard.writeText(bookingId);
            setCopiedRef(bookingId);
            toast.success("Booking ID copied to clipboard");
            setTimeout(() => {
              setCopiedRef((prev) => (prev === bookingId ? null : prev));
            }, 2000);
          } catch {
            toast.error("Failed to copy booking ID");
          }
        };

        return (
          <span
            className="ct-text group inline-flex items-center gap-1.5 hover:text-primary transition-colors cursor-copy!"
            title={isLong ? bookingId : "Click to copy"}
            onClick={handleCopy}
          >
            <span className="ct-text">{display}</span>
            {copiedRef === bookingId ? (
              <CheckCheck className="size-3.5 text-green-500 shrink-0" />
            ) : (
              <Copy className="size-3.5 text-gray-400 group-hover:text-primary shrink-0" />
            )}
          </span>
        );
      },
      cellClassName: "px-3 py-3 font-medium",
    },
    {
      header: "Stand No",
      accessor: "standNumber",
      cellClassName: "px-3 py-3 text-center",
    },
    {
      header: "Hall",
      accessor: "hall",
      cellClassName: "px-3 py-3 text-center",
    },
    {
      header: "Exhibitor",
      headerClassName: "text-left  pl-12",
      accessor: "exhibitor",
      cellClassName: "px-3 py-3 pl-12",
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
      header: "Category",
      accessor: "standCategory",
      render: (value) => {
        const cat = value as string;
        const colorMap: Record<string, string> = {
          "Standard Size": "bg-[#d3e0fb] text-blue-700 border border-[#BED1F9]",
          "Premium Size 1":
            "bg-[#E8DEFD] text-[#8B5CF6] border border-[#DDCFFD]",
          "Premium Size 2":
            "bg-[#E8DEFD] text-[#8B5CF6] border border-[#DDCFFD]",
          "Premium Size 3":
            "bg-[#E8DEFD] text-[#8B5CF6] border border-[#DDCFFD]",
          "Premium Size A":
            "bg-[#E8DEFD] text-[#8B5CF6] border border-[#DDCFFD]",
          "Premium Size B":
            "bg-[#E8DEFD] text-[#8B5CF6] border border-[#DDCFFD]",
          "Premium Size C":
            "bg-[#E8DEFD] text-[#8B5CF6] border border-[#DDCFFD]",
          "Premium Size D":
            "bg-[#E8DEFD] text-[#8B5CF6] border border-[#DDCFFD]",
          "Small Size": "bg-[#FBF5EB] text-[#D79930] border border-[#F3E1C1]",
        };
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${colorMap[cat] || ""}`}
          >
            {cat}
          </span>
        );
      },
      cellClassName: "px-3 py-3 text-center",
    },
    {
      header: "Price (€)",
      accessor: "pricePerDay",
      render: (value) => `€${value as number}`,
      cellClassName: "px-3 py-3 font-medium text-center",
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => {
        const status = value as string;
        const colorMap: Record<string, string> = {
          BOOKED: "bg-green-100 border border-green-200 text-green-700",
          PENDING: "bg-[#FBF5EB] border border-[#EDCEBF] text-[#D79930]",
          CANCELED: "bg-[#FEECEE] border border-[#FBD8DB] text-[#EB3D4D]",
          REFUNDED: "bg-[#EBF2FD] border border-[#C5D9F7] text-[#2A6BCA]",
        };
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 w-fit ${colorMap[status] || ""}`}
          >
            <GoDotFill className="size-3" />
            {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
          </span>
        );
      },
      cellClassName: "px-3 py-3 ",
    },
    {
      header: "Payment Status",
      accessor: "paymentStatus",
      render: (value) => {
        const paymentStatus = value as string;
        const colorMap: Record<string, string> = {
          PAID: "bg-[#E9FAF7] border border-[#D3F4EF] text-[#22CAAD]",
          UNPAID: "bg-[#FBF5EB] border border-[#EDCEBF] text-[#D79930]",
          REFUNDED: "bg-[#EBF2FD] border border-[#C5D9F7] text-[#2A6BCA]",
          CANCELED: "bg-[#FEECEE] border border-[#FBD8DB] text-[#EB3D4D]",
        };
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 w-fit ${colorMap[paymentStatus] || ""}`}
          >
            <GoDotFill className="size-3" />
            {paymentStatus.charAt(0).toUpperCase() +
              paymentStatus.slice(1).toLowerCase()}
          </span>
        );
      },
      cellClassName: "px-3 py-3 ",
    },
    {
      header: "Booking Date",
      accessor: "bookingDate",
      render: (value) => formatDate(value as string),
      cellClassName: "px-3 py-3 text-center",
    },
    {
      header: "Action",
      render: (_, row) => (
        <div className="flex justify-center gap-2 overflow-visible py-2">
          <Button
            onClick={() => {
              setBookingModal({
                isOpen: true,
                id: row.id,
              });
            }}
            variant="outline"
            className="h-6 text-[12px] font-normal rounded-[5px]"
          >
            View Details
          </Button>
        </div>
      ),
      cellClassName: "px-3 py-3 text-center",
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
            Industry Expo {currentYear}, Overview for {formattedDate}
          </p>
        </div>
      </div>

      {/* state cards */}
      <div className="my-9 grid grid-cols-1 md:grid-cols-3 gap-5">
        {isStateLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 space-y-3 border"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>
            ))
          : stateData.map((state) => (
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
          data={bookings}
          columns={columns}
          showIndex={false}
          indexLabel="SN"
          isLoading={isLoading || isFetching}
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
