"use client";

import { Bell, PanelLeftOpen, User } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import DashboardBreadcrumb from "./DashboardBreadcrumb";
import NotificationDropdown from "@/components/ui/NotificationDropdown";
import customImageLoader from "@/lib/imageLoader";
import { useGetMeQuery } from "@/src/redux/api/auth/authApi";
import { useGetNotificationsQuery } from "@/src/redux/api/notification/notificationApi";
import { useAppSelector } from "@/src/redux/hooks";

type NavbarProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const user: {
  name: string;
  image: string;
  company: string;
  email: string;
  phone: string;
  company_address: string;
  password: string;
  document: string[];
} = {
  name: "Jacob Jones",
  image: "/logo.webp",
  company: "The Walt Disney Company",
  email: "jacob@gmail.com",
  phone: "1999999999",
  company_address: "3891 Ranchview Dr. Richardson, California 62639",
  password: "**********",
  document: ["/assets/ita.pdf"],
};

const Navbar = ({ setIsOpen }: NavbarProps) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useGetMeQuery();
  const user = data?.data;

  // Get unread notification count from the notification slice (real-time socket updates)
  const { socketNotifications } = useAppSelector((state) => state.notification);

  // Fetch API notifications to get the unreadCount from metadata
  // This runs always (no skip) so the badge shows the correct count
  const { data: notificationsData } = useGetNotificationsQuery(
    { page: 1, limit: 8 },
    { skip: false }
  );

  const apiNotifications = notificationsData?.data || [];
  const apiUnreadCount = notificationsData?.metaData?.unreadCount || 0;

  // Calculate socket unread count, excluding notifications already in API data (avoids double-counting)
  const apiNotificationIds = new Set(apiNotifications.map((n) => n.id));
  const socketUnreadCount = socketNotifications.filter(
    (n) => !n.readAt && !apiNotificationIds.has(n.id)
  ).length;

  // Total unread count = API unread count + socket unread count (excluding duplicates)
  const unreadCount = apiUnreadCount + socketUnreadCount;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationOpen]);

  return (
    <div className="h-18 border-b border-gray-300 px-4 lg:px-6 flex items-center justify-between z-501 bg-[#F9FAFB]">
      <div className="flex items-center gap-4 text-text-primary">
        <button onClick={() => setIsOpen(true)} className="lg:hidden">
          <PanelLeftOpen size={20} className="text-accent" />
        </button>

        <div className="font-medium">
          <DashboardBreadcrumb />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <div className="md:relative" ref={notificationRef}>
            <div
              className="relative size-8 border border-[#DFE1E7] rounded-full flex justify-center items-center"
            >
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="flex items-center justify-center w-full h-full cursor-pointer"
              >
                <Bell size={16} />
              </button>
              {unreadCount > 0 && (
                <div className="min-w-4 h-4 px-1 bg-[#DF1C41] rounded-full absolute -top-1 -right-1 flex items-center justify-center text-[10px] font-semibold text-white ring-2 ring-[#F9FAFB]">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </div>
              )}
            </div>
            <NotificationDropdown
              isOpen={isNotificationOpen}
              onClose={() => setIsNotificationOpen(false)}
            />
          </div>
          <div className="w-px bg-[#DFE1E7] h-6"></div>
          <div className="flex items-center gap-2 space-y-1 justify-center">
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                height={32}
                width={32}
                className="object-cover overflow-hidden rounded-full size-8 shrink-0 border"
                loader={customImageLoader}
              />
            ) : (
              <div className="size-8 rounded-full bg-gray-300 text-gray-600 flex justify-center items-center shrink-0">
                <User size={20} />
              </div>
            )}
            <div className="hidden md:flex flex-col justify-between">
              <p className="text-sm font-semibold text-text-primary">
                {user?.name?user?.name:"User Name"} 
              </p>
              <p className="text-sm text-muted-foreground">Admin Panel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
