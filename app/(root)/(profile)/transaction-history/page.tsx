"use client";
import CustomTable from "@/components/ui/Table";
import { Column } from "@/types/table";
import { Dot } from "lucide-react";
import React, { useCallback, useState } from "react";
import { GoDotFill } from "react-icons/go";

export interface Transaction {
  id: number;
  paymentRef: string;
  payCategory: string;
  stand: string;
  amount: number;
  status: string;
  paymentDate: string;
  method: string;
}

export const transactions: Transaction[] = [
  {
    id: 1,
    paymentRef: "PAY-2201",
    payCategory: "Booking",
    stand: "A01",
    amount: 200,
    status: "Paid",
    paymentDate: "20 Jun 2026",
    method: "Credit Card",
  },
  {
    id: 2,
    paymentRef: "PAY-2202",
    payCategory: "Add On",
    stand: "A02",
    amount: 200,
    status: "Pending",
    paymentDate: "18 Jun 2026",
    method: "Credit Card",
  },
  {
    id: 3,
    paymentRef: "PAY-2203",
    payCategory: "Booking",
    stand: "A03",
    amount: 200,
    status: "Overdue",
    paymentDate: "15 Jun 2026",
    method: "Credit Card",
  },
  {
    id: 4,
    paymentRef: "PAY-2204",
    payCategory: "Booking",
    stand: "A04",
    amount: 200,
    status: "Paid",
    paymentDate: "13 Jun 2026",
    method: "Credit Card",
  },
  {
    id: 5,
    paymentRef: "PAY-2205",
    payCategory: "Booking",
    stand: "B01",
    amount: 350,
    status: "Paid",
    paymentDate: "10 Jun 2026",
    method: "Bank Transfer",
  },
  {
    id: 6,
    paymentRef: "PAY-2206",
    payCategory: "Add On",
    stand: "B03",
    amount: 120,
    status: "Pending",
    paymentDate: "08 Jun 2026",
    method: "PayPal",
  },
  {
    id: 7,
    paymentRef: "PAY-2207",
    payCategory: "Booking",
    stand: "C05",
    amount: 500,
    status: "Paid",
    paymentDate: "05 Jun 2026",
    method: "Credit Card",
  },
  {
    id: 8,
    paymentRef: "PAY-2208",
    payCategory: "Booking",
    stand: "D02",
    amount: 450,
    status: "Overdue",
    paymentDate: "02 Jun 2026",
    method: "Bank Transfer",
  },
  {
    id: 9,
    paymentRef: "PAY-2209",
    payCategory: "Add On",
    stand: "D07",
    amount: 180,
    status: "Paid",
    paymentDate: "30 May 2026",
    method: "Credit Card",
  },
  {
    id: 10,
    paymentRef: "PAY-2210",
    payCategory: "Booking",
    stand: "E10",
    amount: 600,
    status: "Pending",
    paymentDate: "28 May 2026",
    method: "PayPal",
  },
  {
    id: 11,
    paymentRef: "PAY-2211",
    payCategory: "Booking",
    stand: "F01",
    amount: 300,
    status: "Paid",
    paymentDate: "25 May 2026",
    method: "Credit Card",
  },
  {
    id: 12,
    paymentRef: "PAY-2212",
    payCategory: "Add On",
    stand: "F03",
    amount: 90,
    status: "Pending",
    paymentDate: "24 May 2026",
    method: "PayPal",
  },
  {
    id: 13,
    paymentRef: "PAY-2213",
    payCategory: "Booking",
    stand: "F05",
    amount: 450,
    status: "Paid",
    paymentDate: "22 May 2026",
    method: "Bank Transfer",
  },
  {
    id: 14,
    paymentRef: "PAY-2214",
    payCategory: "Booking",
    stand: "G02",
    amount: 550,
    status: "Overdue",
    paymentDate: "20 May 2026",
    method: "Credit Card",
  },
  {
    id: 15,
    paymentRef: "PAY-2215",
    payCategory: "Add On",
    stand: "G04",
    amount: 140,
    status: "Paid",
    paymentDate: "18 May 2026",
    method: "Credit Card",
  },
  {
    id: 16,
    paymentRef: "PAY-2216",
    payCategory: "Booking",
    stand: "G06",
    amount: 400,
    status: "Pending",
    paymentDate: "16 May 2026",
    method: "PayPal",
  },
  {
    id: 17,
    paymentRef: "PAY-2217",
    payCategory: "Booking",
    stand: "H01",
    amount: 650,
    status: "Paid",
    paymentDate: "14 May 2026",
    method: "Bank Transfer",
  },
  {
    id: 18,
    paymentRef: "PAY-2218",
    payCategory: "Add On",
    stand: "H03",
    amount: 75,
    status: "Pending",
    paymentDate: "12 May 2026",
    method: "Credit Card",
  },
  {
    id: 19,
    paymentRef: "PAY-2219",
    payCategory: "Booking",
    stand: "H05",
    amount: 500,
    status: "Overdue",
    paymentDate: "10 May 2026",
    method: "Credit Card",
  },
  {
    id: 20,
    paymentRef: "PAY-2220",
    payCategory: "Booking",
    stand: "I02",
    amount: 350,
    status: "Paid",
    paymentDate: "08 May 2026",
    method: "PayPal",
  },
  {
    id: 21,
    paymentRef: "PAY-2221",
    payCategory: "Add On",
    stand: "I04",
    amount: 110,
    status: "Paid",
    paymentDate: "06 May 2026",
    method: "Credit Card",
  },
  {
    id: 22,
    paymentRef: "PAY-2222",
    payCategory: "Booking",
    stand: "I06",
    amount: 700,
    status: "Pending",
    paymentDate: "04 May 2026",
    method: "Bank Transfer",
  },
  {
    id: 23,
    paymentRef: "PAY-2223",
    payCategory: "Booking",
    stand: "J01",
    amount: 250,
    status: "Paid",
    paymentDate: "02 May 2026",
    method: "Credit Card",
  },
  {
    id: 24,
    paymentRef: "PAY-2224",
    payCategory: "Add On",
    stand: "J03",
    amount: 95,
    status: "Overdue",
    paymentDate: "30 Apr 2026",
    method: "PayPal",
  },
  {
    id: 25,
    paymentRef: "PAY-2225",
    payCategory: "Booking",
    stand: "J05",
    amount: 800,
    status: "Paid",
    paymentDate: "28 Apr 2026",
    method: "Bank Transfer",
  },
];

const TransactionHistoryPage = () => {
  const [filters, setFilters] = useState({ currentPage: 1, perPageItem: 5 });

  const startIndex = (filters.currentPage - 1) * filters.perPageItem;
  const endIndex = startIndex + filters.perPageItem;
  const currentData = transactions.slice(startIndex, endIndex);
  const totalItems = transactions.length;
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

  const columns: Column<Transaction>[] = [
    {
      header: "Payment Ref",
      headerClassName:"text-left",
      accessor: "paymentRef",
      cellClassName: "px-4 py-3",
    },
    { header: "Category", accessor: "payCategory", cellClassName: "px-4 py-3" },
    { header: "Stand", accessor: "stand", cellClassName: "px-4 py-3" },
    {
      header: "Amount ($)",
      accessor: "amount",
      render: (value) => `$${value as number}`,
      cellClassName: "px-4 py-3",
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => {
        const status = value as string;
        const colorMap: Record<string, string> = {
          Paid: "bg-green-100 text-green-700",
          Pending: "bg-yellow-100 text-yellow-700",
          Overdue: "bg-red-100 text-red-700",
        };
        return (
          <p
            className={`px-2 py-1 rounded-md text-xs font-semibold ${colorMap[status] || ""} flex justify-center items-center w-fit`}
          ><GoDotFill />
            {status}
          </p>
        );
      },
      cellClassName: "px-4 py-3",
    },
    {
      header: "Payment Date",
      accessor: "paymentDate",
      cellClassName: "px-4 py-3",
    },
    { header: "Method", accessor: "method", cellClassName: "px-4 py-3" },
  ];

  return (
    <div className="bg-white p-4 rounded-xl">
      <h1 className="text-2xl md:text-3xl lg:text-[32px] text-primary font-semibold">
        Transaction History
      </h1>
      <p className="lg:text-lg text-accent mt-2 lg:mt-3 pb-6 border-b-2">
        All payment records for your bookings
      </p>
      <div id="user-table-container" className="mt-12">
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

export default TransactionHistoryPage;
