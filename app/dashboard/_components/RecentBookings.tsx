"use client";

import { useState } from "react";
import Link from "next/link";
import CustomTable from "@/components/ui/Table";
import { Column } from "@/types/table";
import { GoDotFill } from "react-icons/go";
import { useGetAdminBookingsQuery } from "@/src/redux/api/booking/bookingApi";
import { AdminBooking } from "@/types/booking.types";
import { CheckCheck, Copy } from "lucide-react";
import { toast } from "sonner";

const RecentBookings = () => {
  const [copiedRef, setCopiedRef] = useState<string | null>(null);
  const { data, isLoading, isFetching } = useGetAdminBookingsQuery({
    status: "all",
    page: 1,
    limit: 5,
  });

  const bookings = data?.data || [];

  // Map AdminBooking to the table format
  const mappedBookings = bookings.map((booking: AdminBooking) => ({
    id: booking.id,
    ref: booking.id,
    company: booking.exhibitor,
    stand: booking.standNumber,
    amount: booking.pricePerDay,
    status: booking.paymentStatus.toLowerCase() as "reserved" | "paid" | "overdue" | "pending",
    date: new Date(booking.bookingDate).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  }));
  const columns: Column<typeof mappedBookings[0]>[] = [
    {
      header: "Booking ID",
      accessor: "ref",
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
              setCopiedRef((prev: string | null) => (prev === bookingId ? null : prev));
            }, 2000);
          } catch {
            toast.error("Failed to copy booking ID");
          }
        };

        return (
          <span
            className="ct-text group inline-flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer"
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
      cellClassName: "px-4 py-3 font-medium",
    },
    {
      header: "Company",
      accessor: "company",
      cellClassName: "px-4 py-3",
    },
    {
      header: "Stand",
      accessor: "stand",
      cellClassName: "px-4 py-3 text-center",
    },
    {
      header: "Amount",
      accessor: "amount",
      render: (value) => `€${value as number}`,
      cellClassName: "px-4 py-3 font-semibold",
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
          paid: "bg-[#E9FAF7] border border-[#D3F4EF] text-[#22CAAD]",
          pending: "bg-[#FBF5EB] border border-[#EDCEBF] text-[#D79930]",
          unpaid: "bg-[#FBF5EB] border border-[#EDCEBF] text-[#D79930]",
          refunded: "bg-gray-100 border border-gray-200 text-gray-700",
          canceled: "bg-[#FEECEE] border border-[#FBD8DB] text-[#EB3D4D]",
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
      cellClassName: "px-3 py-5 text-center flex justify-center",
    },
    {
      header: "Date",
      accessor: "date",
      cellClassName: "px-4 py-3",
    },
  ];

  return (
    <div className="bg-white rounded-2xl px-4 py-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Recent Bookings
        </h3>
        <Link
          href="/dashboard/booking-management?status=all"
          className="text-sm text-primary hover:underline font-semibold"
        >
          View all →
        </Link>
      </div>
      <CustomTable
        data={mappedBookings}
        columns={columns}
        showIndex={false}
        isLoading={isLoading || isFetching}
        emptyMessage="No recent bookings"
        pagination={undefined}
        rounded="rounded-none"
        rowClassName="hover:bg-gray-50"
        headerRowClassName="bg-[#F8F9FA] text-[#6C7278]"
        tbodyClassName=""
      />
    </div>
  );
};

export default RecentBookings;
