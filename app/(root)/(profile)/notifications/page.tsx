"use client";
import CustomTable from "@/components/ui/Table";
import { Column } from "@/types/table";
import React, { useCallback, useState } from "react";

export interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  readStatus: "Read" | "Unread";
  type: "Booking" | "Payment" | "Reminder" | "Update";
}

export const notifications: Notification[] = [
  {
    id: 1,
    title: "Booking Confirmed",
    message: "Your booking for Stand B05 has been confirmed.",
    date: "20 Jun 2026",
    readStatus: "Read",
    type: "Booking",
  },
  {
    id: 2,
    title: "Payment Received",
    message: "Your payment of $400 has been received.",
    date: "18 Jun 2026",
    readStatus: "Unread",
    type: "Payment",
  },
  {
    id: 3,
    title: "Reminder: Upcoming Event",
    message: "The ITBA EXPO starts in 3 days.",
    date: "15 Jun 2026",
    readStatus: "Unread",
    type: "Reminder",
  },
  {
    id: 4,
    title: "Stand Update",
    message: "Your stand has been upgraded to Premium.",
    date: "13 Jun 2026",
    readStatus: "Read",
    type: "Update",
  },
  {
    id: 5,
    title: "Payment Overdue",
    message: "Your payment for Stand A03 is overdue.",
    date: "10 Jun 2026",
    readStatus: "Unread",
    type: "Payment",
  },
  {
    id: 6,
    title: "New Add-on Available",
    message: "Lead Capture Device is now available as an add-on.",
    date: "08 Jun 2026",
    readStatus: "Read",
    type: "Update",
  },
  {
    id: 7,
    title: "Booking Cancelled",
    message: "Your booking for Stand C05 has been cancelled.",
    date: "05 Jun 2026",
    readStatus: "Read",
    type: "Booking",
  },
  {
    id: 8,
    title: "Payment Successful",
    message: "Your payment of $500 was successful.",
    date: "02 Jun 2026",
    readStatus: "Read",
    type: "Payment",
  },
  {
    id: 9,
    title: "Event Reminder",
    message: "Don't forget to download the event app.",
    date: "30 May 2026",
    readStatus: "Unread",
    type: "Reminder",
  },
  {
    id: 10,
    title: "Profile Updated",
    message: "Your company profile has been updated.",
    date: "28 May 2026",
    readStatus: "Read",
    type: "Update",
  },
  {
    id: 11,
    title: "New Message",
    message: "You have a new message from the event organizer.",
    date: "25 May 2026",
    readStatus: "Unread",
    type: "Update",
  },
  {
    id: 12,
    title: "Payment Reminder",
    message: "Please complete your payment for Stand G02.",
    date: "22 May 2026",
    readStatus: "Unread",
    type: "Payment",
  },
  {
    id: 13,
    title: "Stand Change",
    message: "Your stand has been relocated to H05.",
    date: "20 May 2026",
    readStatus: "Read",
    type: "Update",
  },
  {
    id: 14,
    title: "Booking Extended",
    message: "Your booking duration has been extended.",
    date: "18 May 2026",
    readStatus: "Read",
    type: "Booking",
  },
  {
    id: 15,
    title: "New Feature",
    message: "You can now upload documents from the dashboard.",
    date: "15 May 2026",
    readStatus: "Read",
    type: "Update",
  },
];

const NotificationHistoryPage = () => {
  const [filters, setFilters] = useState({ currentPage: 1, perPageItem: 5 });

  const startIndex = (filters.currentPage - 1) * filters.perPageItem;
  const endIndex = startIndex + filters.perPageItem;
  const currentData = notifications.slice(startIndex, endIndex);
  const totalItems = notifications.length;
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

  const columns: Column<Notification>[] = [
    {
      header: "Title",
      headerClassName:"text-left",
      accessor: "title",
      cellClassName: "px-4 py-3 font-medium",
    },
    {
      header: "Message",
      accessor: "message",
      cellClassName: "px-4 py-3",
    },
    {
      header: "Date",
      accessor: "date",
      cellClassName: "px-4 py-3",
    },
    {
      header: "Status",
      accessor: "readStatus",
      render: (value) => {
        const status = value as string;
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              status === "Read"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {status}
          </span>
        );
      },
      cellClassName: "px-4 py-3",
    },
    {
      header: "Type",
      accessor: "type",
      render: (value) => {
        const type = value as string;
        const colorMap: Record<string, string> = {
          Booking: "bg-blue-100 text-blue-700",
          Payment: "bg-purple-100 text-purple-700",
          Reminder: "bg-orange-100 text-orange-700",
          Update: "bg-gray-100 text-gray-700",
        };
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${colorMap[type] || ""}`}
          >
            {type}
          </span>
        );
      },
      cellClassName: "px-4 py-3",
    },
  ];

  return (
    <div className="bg-white md:p-4 rounded-xl">
      <h1 className="text-2xl md:text-3xl lg:text-[32px] text-primary font-semibold">
        Notifications
      </h1>
      <p className="lg:text-lg text-accent mt-2 lg:mt-3 pb-6 border-b-2">
        All your notifications and updates
      </p>
      <div id="user-table-container" className="mt-12">
        <CustomTable
          data={currentData}
          columns={columns}
          showIndex={false}
          indexLabel="SN"
          isLoading={false}
          emptyMessage="No notifications found"
          pagination={pagination}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
};

export default NotificationHistoryPage;