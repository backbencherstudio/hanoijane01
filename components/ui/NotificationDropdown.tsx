"use client";

import { Bell, Trash, X, ChevronDown } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/src/redux/hooks";
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  useDeleteNotificationMutation,
  useClearAllNotificationsMutation,
} from "@/src/redux/api/notification/notificationApi";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { Notification } from "@/types/notification.types";

const NotificationDropdown = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [page, setPage] = useState(1);
  const limit = 8;

  // Get socket notifications from slice (real-time updates)
  const { socketNotifications } = useAppSelector((state) => state.notification);

  // RTK Query hooks
  const {
    data: notificationsData,
    isLoading,
    isFetching,
  } = useGetNotificationsQuery(
    { page, limit },
    {
      skip: !isOpen, // Only fetch when dropdown is open
    }
  );

  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [markAllAsRead] = useMarkAllNotificationsAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();
  const [clearAllNotifications] = useClearAllNotificationsMutation();

  // API notifications
  const apiNotifications = notificationsData?.data || [];
  const metaData = notificationsData?.metaData;

  // Merge socket notifications with API notifications
  // Socket notifications are shown first (most recent)
  const socketNotificationIds = new Set(socketNotifications.map((n) => n.id));
  const filteredApiNotifications = apiNotifications.filter(
    (n) => !socketNotificationIds.has(n.id)
  );
  const allNotifications = [...socketNotifications, ...filteredApiNotifications];

  // Use unreadCount from API metadata, plus any new socket notifications
  // Exclude socket notifications that are already in API data to avoid double-counting
  const apiUnreadCount = metaData?.unreadCount || 0;
  const apiNotificationIds = new Set(apiNotifications.map((n) => n.id));
  const socketUnreadCount = socketNotifications.filter(
    (n) => !n.readAt && !apiNotificationIds.has(n.id)
  ).length;
  const unreadCount = apiUnreadCount + socketUnreadCount;
  const hasMore = metaData ? metaData.currentPage < metaData.totalPages : false;

  const handleSeeMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleNotificationClick = (notificationId: string) => {
    markAsRead(notificationId);
  };

  const handleDelete = (e: React.MouseEvent, notificationId: string) => {
    e.stopPropagation();
    deleteNotification(notificationId);
  };

  const handleClearAll = () => {
    clearAllNotifications();
    toast.success("All notifications cleared");
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    toast.success("All notifications marked as read");
  };

  if (!isOpen) return null;

  return (
    <div className="w-full md:w-100 absolute top-14 right-0 md:top-8 md:right-4 px-4 md:px-0 z-50">
      {/* header */}
      <div className="bg-white rounded-2xl border shadow-lg">
        <div className="h-14 border-b flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-[#0F172A]">Notifications</p>
            {unreadCount > 0 && (
              <p className="rounded-2xl h-5 w-6 flex items-center justify-center font-semibold border border-primary text-primary bg-primary/10 text-xs">
                {unreadCount}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 cursor-pointer"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={handleClearAll}
              className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 cursor-pointer"
            >
              <Trash size={12} /> Clear all
            </button>
          </div>
        </div>

        {/* content */}
        <div className="max-h-100 overflow-y-auto">
          {isLoading && allNotifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">Loading notifications...</div>
          ) : allNotifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No notifications</div>
          ) : (
            allNotifications.map((notification: Notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id)}
                className={`p-4 flex gap-2 border-b cursor-pointer transition-colors hover:bg-gray-50 ${
                  !notification.readAt ? "bg-primary/3" : ""
                }`}
              >
                <div className="size-8 shrink-0 flex items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                  <Bell size={14} />
                </div>
                <div className="w-full">
                  <div className="w-full flex items-start justify-between">
                    <h6 className="text-sm md:text-base font-semibold text-[#1C1F23]">
                      {notification.title}
                    </h6>
                    <button
                      onClick={(e) => handleDelete(e, notification.id)}
                      className="text-xs hover:bg-gray-200 transition-all duration-200 active:scale-98 rounded-full justify-center h-5 w-5 shrink-0 text-[#5E5F79] flex items-center gap-1 cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <p className="text-xs md:text-sm text-[#64748B] mt-0.5">
                    {notification.description}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] md:text-xs text-accent mt-1">
                    <p className="size-1 rounded-full bg-primary shrink-0"></p>
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* footer */}
        {hasMore && (
          <div className="border-t h-10 flex items-center justify-center">
            <button
              onClick={handleSeeMore}
              disabled={isFetching}
              className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              {isFetching ? "Loading..." : "See More"}
              <ChevronDown size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;