"use client";
import CustomTable from "@/components/ui/Table";
import { Column } from "@/types/table";
import { Transaction } from "@/types/transaction.types";
import { useGetUserTransactionsQuery } from "@/src/redux/api/payment/paymentApi";
import React, { useCallback, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { toast } from "sonner";
import { CheckCheck, Copy } from "lucide-react";

const ITEMS_PER_PAGE = 8;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatAmount = (amount: string | number) => {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  return Number.isNaN(value) ? "0.00" : value.toFixed(2);
};

const TransactionHistoryPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(ITEMS_PER_PAGE);
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  const { data, isLoading, isError } = useGetUserTransactionsQuery({
    page,
    limit,
  });
  const transactions = data?.data ?? [];
  const meta = data?.meta_data;

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleItemsPerPageChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const pagination = meta
    ? {
        currentPage: meta.currentPage,
        totalPages: meta.totalPages,
        totalItems: meta.totalItems,
        itemsPerPage: meta.itemsPerPage,
      }
    : undefined;

  const columns: Column<Transaction>[] = [
    {
      header: "Payment Ref",
      headerClassName: "text-left",
      accessor: "referenceNumber",
      render: (value) => {
        const ref = value as string;
        const MAX_LENGTH = 28;
        const isLong = ref.length > MAX_LENGTH;
        const display = isLong ? `${ref.slice(0, MAX_LENGTH)}...` : ref;

        const handleCopy = async () => {
          try {
            await navigator.clipboard.writeText(ref);
            setCopiedRef(ref);
            toast.success("Payment reference copied to clipboard");
            setTimeout(() => {
              setCopiedRef((prev) => (prev === ref ? null : prev));
            }, 2000);
          } catch {
            toast.error("Failed to copy payment reference");
          }
        };

        return (
          <span
            className="ct-text group inline-flex items-center gap-1.5 hover:text-primary transition-colors cursor-copy!"
            title={isLong ? ref : "Click to copy"}
            onClick={handleCopy}
          >
            <span className="ct-text">{display}</span>
            {copiedRef === ref ? (
              <CheckCheck className="size-3.5 text-green-500 shrink-0" />
            ) : (
              <Copy className="size-3.5 text-gray-400 group-hover:text-primary shrink-0" />
            )}
          </span>
        );
      },
      cellClassName: "px-4 py-3",
    },
    {
      header: "Stand",
      accessor: "standTitle",
      cellClassName: "px-4 py-3",
    },
    {
      header: "Amount (€)",
      accessor: "amount",
      render: (value) => `€${formatAmount(value as string)}`,
      cellClassName: "px-4 py-3",
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => {
        const status = value as string;
        const colorMap: Record<string, string> = {
          succeeded: "bg-[#e9faf7] border border-[#d3f4ef] text-[#22CAAD]",
          pending: "bg-[#fbf5eb] border border-[#edcebf] text-[#D79930]",
          refunded: "bg-[#fbe5eb] border border-[#f7b1b8] text-[#EB3D4D]",
        };
        return (
          <p
            className={`px-2 py-1 rounded-md text-xs font-medium ${colorMap[status] || ""} flex justify-center items-center w-fit capitalize`}
          >
            <GoDotFill />
            {status}
          </p>
        );
      },
      cellClassName: "px-4 py-3",
    },
    {
      header: "Date",
      accessor: "createdAt",
      render: (value) => formatDate(value as string),
      cellClassName: "px-4 py-3",
    },
  ];

  return (
    <div className="bg-white md:p-4 rounded-xl">
      <h1 className="text-2xl md:text-3xl lg:text-[32px] text-primary font-semibold">
        Transaction History
      </h1>
      <p className="lg:text-lg text-accent mt-2 lg:mt-3 pb-6 border-b-2">
        All payment records for your bookings
      </p>
      <div id="user-table-container" className="mt-12">
        {isError ? (
          <div className="p-5 bg-red-50 border border-red-200 rounded-lg text-red-600">
            Failed to load transactions. Please try again.
          </div>
        ) : (
          <CustomTable
            data={transactions}
            columns={columns}
            showIndex={false}
            indexLabel="SN"
            isLoading={isLoading}
            emptyMessage="No transactions found"
            pagination={pagination}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
