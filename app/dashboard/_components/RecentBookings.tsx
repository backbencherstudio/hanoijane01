"use client";

import Link from "next/link";
import CustomTable from "@/components/ui/Table";
import { Column } from "@/types/table";
import { GoDotFill } from "react-icons/go";

interface Booking {
  id: string;
  ref: string;
  company: string;
  stand: string;
  amount: number;
  status: "reserved" | "paid" | "overdue" | "pending";
  date: string;
}

const data: Booking[] = [
  {
    id: "1",
    ref: "BK-1042",
    company: "Abstergo Ltd.",
    stand: "A12",
    amount: 3200,
    status: "reserved",
    date: "10 Jun 2026",
  },
  {
    id: "2",
    ref: "BK-1043",
    company: "Barone LLC.",
    stand: "A13",
    amount: 3200,
    status: "paid",
    date: "10 Jun 2026",
  },
  {
    id: "3",
    ref: "BK-1044",
    company: "Acme Co.",
    stand: "A14",
    amount: 3200,
    status: "overdue",
    date: "10 Jun 2026",
  },
  {
    id: "4",
    ref: "BK-1045",
    company: "Wayne Enterprises",
    stand: "B01",
    amount: 4500,
    status: "pending",
    date: "09 Jun 2026",
  },
  {
    id: "5",
    ref: "BK-1046",
    company: "Stark Industries",
    stand: "C03",
    amount: 2800,
    status: "paid",
    date: "08 Jun 2026",
  },
];

const RecentBookings = () => {
  const columns: Column<Booking>[] = [
    {
      header: "Ref",
      accessor: "ref",
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
      render: (value) => `$${value as number}`,
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
        data={data}
        columns={columns}
        showIndex={false}
        isLoading={false}
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
