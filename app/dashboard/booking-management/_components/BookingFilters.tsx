"use client";

import { cn } from "@/lib/utils";

interface BookingStatusFilterProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
}

const statuses = [
  { label: "All", value: "all" },
  { label: "Booked", value: "booked" },
  { label: "Pending", value: "pending" },
  { label: "Canceled", value: "canceled" },
];

const BookingStatusFilter = ({
  currentStatus,
  onStatusChange,
}: BookingStatusFilterProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {statuses.map((status) => (
        <button
          key={status.value}
          onClick={() => onStatusChange(status.value)}
          className={cn(
            "px-4 py-2.25 rounded-lg border text-sm font-medium transition-all duration-200 cursor-pointer",
            currentStatus === status.value
              ? "bg-primary border-primary text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200",
          )}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
};

export default BookingStatusFilter;
