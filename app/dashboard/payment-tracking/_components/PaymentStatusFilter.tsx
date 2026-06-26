"use client";

import { cn } from "@/lib/utils";

interface PaymentStatusFilterProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
}

const statuses = [
  { label: "All", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Pending", value: "pending" },
  { label: "Overdue", value: "overdue" },
];

const PaymentStatusFilter = ({
  currentStatus,
  onStatusChange,
}: PaymentStatusFilterProps) => {
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

export default PaymentStatusFilter;
