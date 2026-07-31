"use client";
import StateCard2 from "@/components/dashboard/StateCard2";
import CustomTable from "@/components/ui/Table";
import { Column } from "@/types/table";
import React, { useCallback, useMemo, useState } from "react";
import { GoDotFill, GoCopy, GoCheck } from "react-icons/go";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetAllTransactionsQuery } from "@/src/redux/api/payment/paymentApi";
import { Transaction } from "@/types/transaction.types";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrencySymbol, cn } from "@/lib/utils";

const PaymentTrackingPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status") || "all";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const limitParam = parseInt(searchParams.get("limit") || "8", 10);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Error handled silently
    }
  };

  const { data, isLoading, isFetching } = useGetAllTransactionsQuery({
    status: statusParam,
    page: pageParam,
    limit: limitParam,
  });

  const transactions = data?.data || [];
  const metaData = data?.metaData;

  // Compute stats from actual data
  const stateData = useMemo(() => {
    if (!transactions.length) {
      return [
        { title: "Total Revenue", value: "$0" },
        { title: "Succeeded", value: "$0" },
        { title: "Pending", value: "$0" },
        { title: "Failed", value: "$0" },
        { title: "Refunded", value: "$0" },
      ];
    }

    const totalRevenue = transactions
      .filter((t) => t.status === "succeeded")
      .reduce((sum, t) => sum + parseFloat(t.paidAmount || t.amount), 0);

    const succeededTotal = transactions
      .filter((t) => t.status === "succeeded")
      .reduce((sum, t) => sum + parseFloat(t.paidAmount || t.amount), 0);

    const pendingTotal = transactions
      .filter((t) => t.status === "pending")
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const failedTotal = transactions
      .filter((t) => t.status === "failed" || t.status === "canceled")
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const refundedTotal = transactions
      .filter((t) => t.status === "refunded")
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    const currencySymbol = transactions[0]
      ? getCurrencySymbol(transactions[0].currency)
      : "$";

    return [
      {
        title: "Total Revenue",
        value: `${currencySymbol}${totalRevenue.toLocaleString()}`,
      },
      {
        title: "Succeeded",
        value: `${currencySymbol}${succeededTotal.toLocaleString()}`,
      },
      {
        title: "Pending",
        value: `${currencySymbol}${pendingTotal.toLocaleString()}`,
      },
      {
        title: "Failed",
        value: `${currencySymbol}${failedTotal.toLocaleString()}`,
      },
      {
        title: "Refunded",
        value: `${currencySymbol}${refundedTotal.toLocaleString()}`,
      },
    ];
  }, [transactions]);

  const pagination = metaData
    ? {
        currentPage: metaData.page,
        totalPages: Math.ceil(metaData.total / metaData.limit),
        totalItems: metaData.total,
        itemsPerPage: metaData.limit,
      }
    : {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: limitParam,
      };

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleItemsPerPageChange = useCallback(
    (newPerPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("limit", newPerPage.toString());
      params.set("page", "1");
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleStatusChange = useCallback(
    (status: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (status === "all") {
        params.delete("status");
      } else {
        params.set("status", status);
      }
      params.set("page", "1");
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const columns: Column<Transaction>[] = [
    {
      header: "Reference Number",
      headerClassName: "text-left",
      accessor: "referenceNumber",
      render: (value, row) => {
        const refNumber = value as string;
        const transaction = row as Transaction;
        const isCopied = copiedId === transaction.id;
        return (
          <div className="flex items-center gap-2">
            <span className="font-medium">{refNumber}</span>
            <button
              onClick={() => copyToClipboard(refNumber, transaction.id)}
              className="cursor-pointer hover:text-primary transition-colors"
              title="Copy reference number"
            >
              {isCopied ? (
                <GoCheck className="size-4 text-green-600" />
              ) : (
                <GoCopy className="size-4" />
              )}
            </button>
          </div>
        );
      },
      cellClassName: "px-3 py-5",
    },
    {
      header: "Provider",
      accessor: "provider",
      render: (value) => {
        const provider = value as string;
        return <span className="capitalize">{provider}</span>;
      },
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Amount",
      accessor: "amount",
      render: (value, row) => {
        const amount = value as string;
        const transaction = row as Transaction;
        const symbol = getCurrencySymbol(transaction.currency);
        return (
          <span className="font-medium">
            {symbol}
            {amount}
          </span>
        );
      },
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => {
        const status = value as string;
        const colorMap: Record<string, string> = {
          succeeded: "bg-[#E9FAF7] border border-[#D3F4EF] text-[#22CAAD]",
          pending: "bg-[#FBF5EB] border border-[#EDCEBF] text-[#D79930]",
          refunded: "bg-[#FBD8DB] border border-[#F7B1B8] text-[#EB3D4D]",
          failed: "bg-[#FBD8DB] border border-[#F7B1B8] text-[#EB3D4D]",
          canceled: "bg-[#DFDFE4] border border-[#CFCFD7] text-[#5E5F79]",
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
      header: "Paid Amount",
      accessor: "paidAmount",
      render: (value, row) => {
        const paidAmount = value as string | null;
        const transaction = row as Transaction;
        const symbol = paidAmount
          ? getCurrencySymbol(transaction.paidCurrency)
          : "";
        return (
          <span className={paidAmount ? "font-medium" : "text-gray-400"}>
            {paidAmount ? `${symbol}${paidAmount}` : "N/A"}
          </span>
        );
      },
      cellClassName: "px-3 py-5 text-center",
    },
    {
      header: "Created At",
      accessor: "createdAt",
      render: (value) => {
        const date = value as string;
        return new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
      cellClassName: "px-3 py-5 text-center whitespace-nowrap",
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
            Industry Expo 2027, Payment transactions overview
          </p>
        </div>
      </div>

      {/* state cards */}
      <div className="my-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
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
        <div className="flex flex-col justify-between items-center lg:items-start gap-4 mb-4">
          <p className="text-text-primary text-lg font-semibold">
            All Transactions
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: "Succeeded", value: "succeeded" },
              { label: "Pending", value: "pending" },
              { label: "Canceled", value: "canceled" },
              { label: "Refunded", value: "refunded" },
            ].map((status) => (
              <button
                key={status.value}
                onClick={() => handleStatusChange(status.value)}
                className={cn(
                  "px-4 py-2.25 rounded-lg border text-sm font-medium transition-all duration-200 cursor-pointer",
                  statusParam === status.value
                    ? "bg-primary border-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                )}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
        {/* table */}
        <CustomTable
          data={transactions}
          columns={columns}
          showIndex={false}
          indexLabel="SN"
          isLoading={isLoading || isFetching}
          emptyMessage="No transactions found"
          pagination={pagination}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default PaymentTrackingPageContent;
